import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { PagePlanets, Planet } from "../../types";
import Button from "react-bootstrap/Button";

interface PlanetCardProps {
  query: string | null;
  searchResult: PagePlanets;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ query, searchResult }) => {
  return (
    <>
      {query && (
        <p>
          Showing {searchResult.total} search results for the name or word "{query}" in Star Wars
        </p>
      )}
      <div id="search-result" className="card-grid">
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
      </div>
    </>
  );
};

export default PlanetCard;