import { useEffect, useState } from "react";
import "../../assets/scss/App.scss";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSearchParams, Link } from "react-router-dom";
import { getAllFilms, searchFilm } from "../../services/StarWarsAPI";
import { PageFilm } from "../../types";

const SearchFilm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<PageFilm | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      return;
    }

    setSearchParams({ query: searchInput });
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

      {searchResult && (
        <div id="search-result" className="card-grid">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {searchResult.data.map((data) => (
              <div className="col mb-4" key={data.id}>
                <Card border="primary" style={{ width: "18rem" }}>
                  <Card.Header className="card-header">
                    {data.title}
                  </Card.Header>
                  <Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item key="episode">
                        Episode {data.episode_id}
                      </ListGroup.Item>
                      <ListGroup.Item key="release_date">
                        Release Date {data.release_date}
                      </ListGroup.Item>
                      <ListGroup.Item key="total_characters">
                        Total Characters {data.characters_count}
                      </ListGroup.Item>
                    </ListGroup>

                    <Link to={`/films/${data.id}`}>
                      <Button variant="primary">Read More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchFilm;
