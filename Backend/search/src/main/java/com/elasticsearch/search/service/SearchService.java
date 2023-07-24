package com.elasticsearch.search.service;

import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.core.search.TotalHits;
import com.elasticsearch.search.api.model.Result;
import com.elasticsearch.search.api.model.SearchResult;
import com.elasticsearch.search.domain.ESClient;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Service
public class SearchService {

    private final ESClient esClient;

    public SearchService(ESClient esClient) {
        this.esClient = esClient;
    }

    public List<Result> submitQuery(String query) {

        SearchResponse searchResponse = esClient.search(query);

        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();

        var resultsLists = hits.stream().map(h -> new Result()
                .abs(treatContent(h.highlight().get("content").get(0)))
                .title(h.source().get("title").asText())
                .url(h.source().get("url").asText())).collect(Collectors.toList());

        return resultsLists;
    }

    public SearchResult submitQueryPage(String query, Integer page, Integer pageSize, Integer filter, Boolean order, String initialDate, String finalDate, Integer minReadingTime, Integer maxReadingTime) {

        if (isNull(query) || query.isBlank()) {
            return null;
        }
        if (isNull(page) || page <= 0) {
            page = 1;
        }

        if (isNull(pageSize) || pageSize <= 0) {
            pageSize = 10;
        }

        if (isNull(filter)) {
            filter = 0;
        }

        if(isNull(order)){
            order = false;
        }

        if(isNull(initialDate)){
            initialDate = "0001-01-01";
        }

        if(isNull(finalDate)){
            finalDate = "3000-12-30";
        }

        if(isNull(minReadingTime)){
            minReadingTime = -1;
        }

        if(isNull(maxReadingTime)){
            maxReadingTime = 1000;
        }

        SearchResponse searchResponse = esClient.searchPage(query, page, pageSize, filter, order, initialDate, finalDate, minReadingTime, maxReadingTime);

        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();
        TotalHits totalResults = searchResponse.hits().total();


        var resultsLists = hits.stream().map(h -> new Result()
                        .abs(treatContent(h.highlight().get("content").get(0)))
                        .title(h.source().get("title").asText())
                        .url(h.source().get("url").asText())
                        .readingTime(h.source().get("reading_time").asInt())
                        .dtCreation(h.source().get("dt_creation").asText())).collect(Collectors.toList());

        SearchResult searchResult = new SearchResult();

        searchResult.results(resultsLists);
        searchResult.totalResults(Math.toIntExact(totalResults.value()));
        searchResult.searchTime(Math.toIntExact(searchResponse.took()));

        return searchResult;
    }

    private String treatContent(String content) {
        content = content.replaceAll("</?(som|math)\\d*>", " ");
        content = content.replaceAll("[^A-Za-z\\s</>]+", " ");
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");
        return content;
    }
}
