import React from "react";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { PageFilm } from "../../types";
import Button from "react-bootstrap/Button";

interface FilmCardProps {
  error: string | null;
  loading: boolean;
  query: string | null;
  searchResult: PageFilm | null;
}

const FilmCard: React.FC<FilmCardProps> = ({ error, loading, query, searchResult }) => {
  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}

      {loading && <p>🤔 Loading...</p>}

      {!query && searchResult && (
        <p>
          There are a total of {searchResult.total} films in Star Wars episodes 1 to 6. If you're smart, you don't need the force since this is only 1 page! 🤪
        </p>
      )}

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

export default FilmCard;