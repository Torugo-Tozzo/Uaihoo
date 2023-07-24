package com.elasticsearch.search.controller;

import com.elasticsearch.search.api.facade.SearchApi;
import com.elasticsearch.search.api.model.SearchResult;
import com.elasticsearch.search.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class SearchController implements SearchApi {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }


    @Override
    public CompletableFuture<ResponseEntity<SearchResult>> search(String query, Integer page, Integer pageSize, Integer filter, Boolean order, String initialDate, String finalDate, Integer minReadingTime, Integer maxReadingTime) {
        var result = searchService.submitQueryPage(query, page, pageSize, filter, order, initialDate, finalDate, minReadingTime, maxReadingTime);
        return CompletableFuture.supplyAsync(() -> ResponseEntity.ok(result));
    }


}
