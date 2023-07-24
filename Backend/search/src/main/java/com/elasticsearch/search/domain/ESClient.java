package com.elasticsearch.search.domain;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.RangeQuery;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Highlight;
import co.elastic.clients.elasticsearch.core.search.HighlightField;
import co.elastic.clients.elasticsearch.core.search.HighlighterType;
import co.elastic.clients.json.JsonData;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.altindag.ssl.SSLFactory;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Component
public class ESClient {

    private String user;
    private String password;

    private ElasticsearchClient elasticsearchClient;

    public ESClient(@Value("${elasticsearch.connection.username}") String user, @Value("${elasticsearch.connection.password}") String password) {
        this.user = user;
        this.password = password;
        createConnection();
    }

    private void createConnection() {

        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();

        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(user, password));

        SSLFactory sslFactory = SSLFactory.builder().withUnsafeTrustMaterial().withUnsafeHostnameVerifier().build();

        RestClient restClient = RestClient.builder(
                        new HttpHost("localhost", 9200, "https"))
                .setHttpClientConfigCallback((HttpAsyncClientBuilder httpClientBuilder) -> httpClientBuilder
                        .setDefaultCredentialsProvider(credentialsProvider)
                        .setSSLContext(sslFactory.getSslContext())
                        .setSSLHostnameVerifier(sslFactory.getHostnameVerifier())
                ).build();

        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());

        elasticsearchClient = new ElasticsearchClient(transport);
    }

    public SearchResponse search(String query) {

        Query matchQuery = MatchQuery.of(
                q -> q.field("content").query(query)
        )._toQuery();
        SearchResponse<ObjectNode> response;
        try {
            response = elasticsearchClient.search(s -> s.index("wikipedia_new").from(0).size(10).query(matchQuery), ObjectNode.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return response;
    }

    public SearchResponse searchPage(String query, int page, Integer pageSize, Integer filter, Boolean order, String initialDate, String finalDate, Integer minReadingTime, Integer maxReadingTime) {

        //Highlight
        Map<String, HighlightField> map = new HashMap<>();
        map.put("content", HighlightField.of(hf -> hf.numberOfFragments(1).fragmentSize(300)));
        Highlight highlight = Highlight.of(
                h -> h.type(HighlighterType.Unified)
                        .fields(map)
        );

        List<Query> queriesWithinQuote = new ArrayList<>();
        List<Query> queriesOutsideQuote = new ArrayList<>();

        Pattern pattern = Pattern.compile("\\Q\"\\E(.*?)\\Q\"\\E", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(query);

        while (matcher.find()) {
            queriesWithinQuote.add(MatchQuery.of(q -> q.field("content").query(matcher.group(1)))._toQuery());
        }
        queriesOutsideQuote.add(
                MatchQuery.of(
                        q -> q.field("content").query(matcher.replaceAll(" ").replaceAll("\\s+", " ").trim())
                )._toQuery()
        );

        SearchResponse<ObjectNode> response;

        SortOrder sortOrder;

        //Definindo o metodo de ordenacao
        sortOrder = order ? SortOrder.Desc : SortOrder.Asc;

        Query dateQuery = RangeQuery.of(
                r -> r.field("dt_creation").gte(JsonData.of(initialDate)).lte(JsonData.of(finalDate))
        )._toQuery();

        Query readTimeQuery = RangeQuery.of(
                r -> r.field("reading_time").gte(JsonData.of(minReadingTime)).lte(JsonData.of(maxReadingTime))
        )._toQuery();


        try {
            response = elasticsearchClient.search(s -> s.index("wikipedia_new")
                    .from((page * pageSize) - pageSize)
                    .size(pageSize)
                    .query(q -> q
                            .bool(b -> {
                                if (!queriesWithinQuote.isEmpty()) return b
                                        .must(queriesWithinQuote)
                                        .should(queriesOutsideQuote)
                                        .must(dateQuery)
                                        .must(readTimeQuery);
                                else {
                                    return b
                                            .must(queriesOutsideQuote)
                                            .must(dateQuery)
                                            .must(readTimeQuery);
                                }
                            }))
                    .highlight(highlight)
                    .sort(rt -> rt.field(
                            f1 -> {
                                if (filter == 1) return f1.field("reading_time").order(sortOrder);
                                else if (filter == 2) return f1.field("dt_creation").order(sortOrder);
                                else return f1.field("_score").order(SortOrder.Desc);
                            })), ObjectNode.class);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return response;
    }
}
