/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useSearchParams } from "react-router-dom";
import {
  searchPlanets,
  getAllPlanets,
  getPagePlanets,
} from "../../services/StarWarsAPI";
import { PagePlanets, Planet } from "../../types";
import Pagination from "../../components/Pagination";

const SearchPlanets = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<PagePlanets | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");

  const fetchAllPlanets = async (searchPage = 0) => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await getAllPlanets(searchPage);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      return;
    }

    setSearchParams({ query: searchInput });
  };

  useEffect(() => {
    if (!query) {
      fetchAllPlanets();
    } else {
      findPlanets(query);
    }
  }, [query]);

  return (
    <>
      <h1></h1>

      <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="searchQuery">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter your search query"
            required
            type="text"
            value={searchInput}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            type="submit"
            disabled={!searchInput.trim().length}
          >
            Search
          </Button>
        </div>
      </Form>

      {error && <Alert variant="warning">{error}</Alert>}

      {loading && <p>🤔 Loading...</p>}

      {!query && searchResult && (
        <p>
          There are a total of {searchResult.total} planets in Star Wars
          episodes 1 to 6. Use the force and do a search in the query above.
        </p>
      )}

      {searchResult && (
        <div id="search-result" className="card-grid">
          {query && (
            <p>
              Showing {searchResult.total} search results for the name or word "
              {query}" in Star Wars
            </p>
          )}
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {searchResult.data.map((planet: Planet) => (
              <div className="col mb-4" key={planet.id}>
                <Card border="primary" style={{ width: "18rem" }}>
                  <Card.Header className="card-header">
                    {planet.name}
                  </Card.Header>
                  <Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item key="climate">
                        Climate: {planet.climate}
                      </ListGroup.Item>
                      <ListGroup.Item key="terrain">
                        Terrain: {planet.terrain}
                      </ListGroup.Item>
                      <ListGroup.Item key="diameter">
                        Diameter: {planet.diameter}
                      </ListGroup.Item>
                      <ListGroup.Item key="surface water">
                        Surface Water: {planet.surface_water}
                      </ListGroup.Item>
                    </ListGroup>

                    <Link to={`/planets/${planet.id}`}>
                      <Button variant="primary">Read More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
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
        </div>
      )}
    </>
  );
};

export default SearchPlanets;