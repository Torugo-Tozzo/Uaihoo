import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import FooterResults from "./FooterResults";
import HeaderSearch from "./HeaderSearch";
import Filters from "./Filters/Filters";
import "../App.css";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const page = queryParams.get("page");
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1); // Valor inicial da página
  const [filterParams, setFilterParams] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/v1/search?query=${query}`
        );
        setSearchResults(response.data.results);
        setTotalResults(response.data.total_results);
        setSearchTime(response.data.search_time);
        setCurrentPage(1);
        setShowFilters(false); // Oculta a div de filtros
      } catch (error) {
        console.error("Erro na consulta de pesquisa:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/v1/search?query=${query}`
      );
      setSearchResults(response.data.results);
      setTotalResults(response.data.total_results);
      setSearchTime(response.data.search_time);
      setCurrentPage(1);
      setShowFilters(false); // Oculta a div de filtros

      // Redefine os parâmetros de filtro para null
      setFilterParams(null);

      // Atualiza a URL com a nova consulta
      const newSearchParams = new URLSearchParams();
      newSearchParams.append("query", query);
      newSearchParams.append("page", 1);
      navigate(`?${newSearchParams.toString()}`);
    } catch (error) {
      console.error("Erro na consulta de pesquisa:", error);
    }
  };

  const handleFilterSubmit = async (queryParams) => {
    try {
      const response = await axios.get("http://localhost:8080/v1/search", {
        params: { query, ...queryParams },
      });
      setSearchResults(response.data.results);
      setTotalResults(response.data.total_results);
      setSearchTime(response.data.search_time);
      setCurrentPage(1);
      setShowFilters(true); // Exibe a div de filtros

      // Salva os parâmetros de filtro
      setFilterParams(queryParams);

      // Atualiza a URL com os parâmetros de filtro
      const newSearchParams = new URLSearchParams();
      newSearchParams.append("query", query);
      newSearchParams.append("page", 1);
      Object.entries(queryParams).forEach(([key, value]) => {
        newSearchParams.append(key, value);
      });
      navigate(`?${newSearchParams.toString()}`);
    } catch (error) {
      console.error("Erro na consulta de pesquisa:", error);
    }
  };

  const fetchPaginatedResults = async (newPage) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/v1/search`,
        {
          params: {
            query,
            ...filterParams,
            page: newPage,
          },
        }
      );
      setSearchResults(response.data.results);
      setCurrentPage(newPage);

      // Atualiza a URL com a nova página
      const newSearchParams = new URLSearchParams();
      newSearchParams.append("query", query);
      newSearchParams.append("page", newPage);
      Object.entries(filterParams).forEach(([key, value]) => {
        newSearchParams.append(key, value);
      });
      navigate(`?${newSearchParams.toString()}`);
    } catch (error) {
      console.error("Erro na consulta de pesquisa:", error);
    }
  };

  const highlightKeywords = (text) => {
    const regex = /<em>(.*?)<\/em>/g;
    return text.replace(regex, '<strong>$1</strong>');
  };

  return (
    <div>
      <HeaderSearch query={query} onSearch={handleSearch} />
      <p className="resultadosms">
        Cerca de {totalResults} resultados de busca em {searchTime} milissegundos
      </p>
      <Filters
        query={query}
        onFilterSubmit={handleFilterSubmit}
        showFilters={showFilters}
      />
      <ul>
        {searchResults.map((result) => (
          <ol className="map" key={result.title}>
            <a className="link-url" href={result.url}>
              <p className="pairolito">{result.url}</p>
            </a>
            <a href={result.url}>
              <p
                className="tit-underline"
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(result.title),
                }}
              ></p>
            </a>
            <p className="pairolito">
              <span className="dt-creation">{result.dt_creation}</span> &middot;{" "}
              <span
                className="abs"
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(result.abs),
                }}
              ></span>
            </p>
            <p className="reading-time">
              reading time: {result.reading_time} min.
            </p>
            <br />
          </ol>
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalResults / 10)}
          onPageChange={fetchPaginatedResults}
        />
      </ul>

      <FooterResults />
    </div>
  );
};

export default SearchResults;
