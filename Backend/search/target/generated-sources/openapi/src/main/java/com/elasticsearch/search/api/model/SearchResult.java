package com.elasticsearch.search.api.model;

import java.util.Objects;
import com.elasticsearch.search.api.model.Result;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * SearchResult
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2023-07-10T13:32:38.067665521-03:00[America/Sao_Paulo]")

public class SearchResult  implements Serializable {
  private static final long serialVersionUID = 1L;

  @JsonProperty("results")
  @Valid
  private List<Result> results = null;

  @JsonProperty("total_results")
  private Integer totalResults;

  @JsonProperty("search_time")
  private Integer searchTime;

  public SearchResult results(List<Result> results) {
    this.results = results;
    return this;
  }

  public SearchResult addResultsItem(Result resultsItem) {
    if (this.results == null) {
      this.results = new ArrayList<>();
    }
    this.results.add(resultsItem);
    return this;
  }

  /**
   * Get results
   * @return results
  */
  @ApiModelProperty(value = "")

  @Valid

  public List<Result> getResults() {
    return results;
  }

  public void setResults(List<Result> results) {
    this.results = results;
  }

  public SearchResult totalResults(Integer totalResults) {
    this.totalResults = totalResults;
    return this;
  }

  /**
   * Get totalResults
   * @return totalResults
  */
  @ApiModelProperty(value = "")


  public Integer getTotalResults() {
    return totalResults;
  }

  public void setTotalResults(Integer totalResults) {
    this.totalResults = totalResults;
  }

  public SearchResult searchTime(Integer searchTime) {
    this.searchTime = searchTime;
    return this;
  }

  /**
   * Get searchTime
   * @return searchTime
  */
  @ApiModelProperty(value = "")


  public Integer getSearchTime() {
    return searchTime;
  }

  public void setSearchTime(Integer searchTime) {
    this.searchTime = searchTime;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchResult searchResult = (SearchResult) o;
    return Objects.equals(this.results, searchResult.results) &&
        Objects.equals(this.totalResults, searchResult.totalResults) &&
        Objects.equals(this.searchTime, searchResult.searchTime);
  }

  @Override
  public int hashCode() {
    return Objects.hash(results, totalResults, searchTime);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchResult {\n");
    
    sb.append("    results: ").append(toIndentedString(results)).append("\n");
    sb.append("    totalResults: ").append(toIndentedString(totalResults)).append("\n");
    sb.append("    searchTime: ").append(toIndentedString(searchTime)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

