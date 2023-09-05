import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { PagePeople, Character } from "../../types";
import Button from "react-bootstrap/Button";

interface PeopleCardProps {
  query: string | null;
  searchResult: PagePeople;
}

const PeopleCard: React.FC<PeopleCardProps> = ({ query, searchResult }) => {
  return (
    <>
      {query && (
        <p>
          Showing {searchResult.total} search results for the name or word "{query}" in Star Wars
        </p>
      )}
      <div id="search-result" className="card-grid">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {searchResult.data.map((character: Character) => (
            <div className="col mb-4" key={character.id}>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header className="card-header">
                  {character.name}
                </Card.Header>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item key="D.O.B.">
                      Year of Birth: {character.birth_year}
                    </ListGroup.Item>
                    <ListGroup.Item key="Total Appearances">
                      Appeared in how many episodes: {character.films_count}
                    </ListGroup.Item>
                    <ListGroup.Item key="HomeWorld">
                      Homeworld: {character.homeworld.name}{" "}
                    </ListGroup.Item>
                  </ListGroup>

                  <Link to={`/people/${character.id}`}>
                    <Button variant="primary">Read More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PeopleCard;