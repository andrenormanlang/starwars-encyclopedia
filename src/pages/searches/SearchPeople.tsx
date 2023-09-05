/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "../../assets/scss/App.scss";
import { useSearchParams } from "react-router-dom";
import { getAllPeople, getPagePeople, searchPerson } from "../../services/StarWarsAPI";
import { PagePeople } from "../../types";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { Alert } from "react-bootstrap";
import PeopleCard from "../../components/cards/PeopleCard";


const SearchPeople = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchInput] = useState("");
  const [searchResult, setSearchResult] = useState<PagePeople | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page"));
  const perPage = Number(searchParams.get("per_page"));
  
  const fetchAllPeople = async () => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await getAllPeople(page, perPage);
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
      const res = await getPagePeople(pageUrl);
      setSearchResult(res);
      setSearchParams({ query: searchInput, page: String(res.current_page) });
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const findPerson = async (searchQuery: string, searchPage = 0) => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await searchPerson(searchQuery, searchPage);
      setSearchResult(res);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };



  useEffect(() => {
    if (!query) {
      fetchAllPeople();
      
    } else {
      findPerson(query);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <h1></h1>

      <Search />

      {error && <Alert variant="warning">{error}</Alert>}

      {loading && <p>🤔 Loading...</p>}

      {!query && searchResult && (
        <p>
          There are a total of {searchResult.total} people in Star Wars episodes 1 to 6. Use the force and do a search in the query above.
        </p>
      )}

      {searchResult && (
        <>
          <PeopleCard query={query} searchResult={searchResult} />
          
          <Pagination
            page={searchResult.current_page}
            totalPages={searchResult.last_page}
            hasPreviousPage={searchResult.prev_page_url != null}
            hasNextPage={searchResult.next_page_url != null}
            onPreviousPage={() => {
              fetchPage(searchResult.prev_page_url!);
            } }
            onNextPage={() => {
              fetchPage(searchResult.next_page_url!);
            } } 
          />
        </>
      )}
    </>
  );
};

export default SearchPeople;
