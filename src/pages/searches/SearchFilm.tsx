import { useEffect, useState } from "react";
import "../../assets/scss/App.scss";
import { useSearchParams } from "react-router-dom";
import { getAllFilms, searchFilm } from "../../services/StarWarsAPI";
import { PageFilm } from "../../types";
import Search from "../../components/Search";
import FilmCard from "../../components/cards/FilmCard";

const SearchFilm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<PageFilm | null>(null);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const fetchAllFilms = async () => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await getAllFilms();
      setSearchResult(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const findFilm = async (searchQuery: string) => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await searchFilm(searchQuery);
      setSearchResult(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!query) {
      fetchAllFilms();
    } else {
      findFilm(query);
    }
  }, [query]);

  return (
    <>
      <h1></h1>

      <Search />

      <FilmCard error={error} loading={loading} query={query} searchResult={searchResult} />
    </>
  );
};

export default SearchFilm;
