/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useSearchParams } from "react-router-dom";
import {
  searchPlanets,
  getAllPlanets,
  getPagePlanets,
} from "../../services/StarWarsAPI";
import { PagePlanets } from "../../types";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import PlanetCard from "../../components/cards/PlanetCard";

const SearchPlanets = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchInput] = useState("");
  const [searchResult, setSearchResult] = useState<PagePlanets | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const page = Number(searchParams.get("page"));
  const perPage = Number(searchParams.get("per_page"));

  const fetchAllPlanets = async () => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await getAllPlanets(page, perPage);
      setSearchResult(res);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const fetchPage = async (pageUrl: string) => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await getPagePlanets(pageUrl);
      setSearchResult(res);
      setSearchParams({ query: searchInput, page: String(res.current_page) });
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const findPlanets = async (searchQuery: string, searchPage = 0) => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await searchPlanets(searchQuery, searchPage);
      setSearchResult(res);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!query) {
      fetchAllPlanets();
    } else {
      findPlanets(query);
    }
  }, [ query]);

  return (
    <>
      <h1></h1>

      <Search/>

      {error && <Alert variant="warning">{error}</Alert>}

      {loading && <p>🤔 Loading...</p>}

      {!query && searchResult && (
        <p>
          There are a total of {searchResult.total} planets in Star Wars
          episodes 1 to 6. Use the force and do a search in the query above.
        </p>
      )}

      {searchResult && (
          <>
          <PlanetCard query={query} searchResult={searchResult} />

          <Pagination
            page={searchResult.current_page}
            totalPages={searchResult.last_page}
            hasPreviousPage={searchResult.prev_page_url != null}
            hasNextPage={searchResult.next_page_url != null}
            onPreviousPage={() => {
              fetchPage(searchResult.prev_page_url!);
            }}
            onNextPage={() => {
              fetchPage(searchResult.next_page_url!);
            }}
          />
        </>
      )}
    </>
  );
};

export default SearchPlanets;
