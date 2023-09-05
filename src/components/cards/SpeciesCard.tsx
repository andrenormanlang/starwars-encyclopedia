import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { PageSpecies, Species } from "../../types";
import Button from "react-bootstrap/Button";

interface SpeciesCardProps {
  query: string | null;
  searchResult: PageSpecies;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ query, searchResult }) => {
  return (
    <>
      {query && (
        <p>
          Showing {searchResult.total} search results for the name or word "{query}" in Star Wars
        </p>
      )}
      <div id="search-result" className="card-grid">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {searchResult.data.map((species: Species) => (
            <div className="col mb-4" key={species.id}>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header className="card-header">
                  {species.name}
                </Card.Header>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item key="classification">
                      Classification: {species.classification}
                    </ListGroup.Item>
                    <ListGroup.Item key="language">
                      Language: {species.language}
                    </ListGroup.Item>
                    <ListGroup.Item key="homeworld">
                      Homeworld: {species.homeworld?.name || "Unknown"}{" "}
                    </ListGroup.Item>
                  </ListGroup>

                  <Link to={`/species/${species.id}`}>
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

export default SpeciesCard;