import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { PageStarships, Starship } from "../../types";
import Button from "react-bootstrap/Button";

interface StarshipCardProps {
  query: string | null;
  searchResult: PageStarships;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ query, searchResult }) => {
  return (
    <>
      {query && (
        <p>
          Showing {searchResult.total} search results for the name or word "{query}" in Star Wars
        </p>
      )}
      <div id="search-result" className="card-grid">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {searchResult.data.map((starship: Starship) => (
            <div className="col mb-4" key={starship.id}>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header className="card-header">
                  {starship.name}
                </Card.Header>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item key="model">
                      Model: {starship.model}
                    </ListGroup.Item>
                    <ListGroup.Item key="class">
                      Class: {starship.starship_class}
                    </ListGroup.Item>
                    <ListGroup.Item key="manufacturer">
                      Manufacturer: {starship.manufacturer}
                    </ListGroup.Item>
                  </ListGroup>

                  <Link to={`/starships/${starship.id}`}>
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

export default StarshipCard;