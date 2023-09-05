import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { PageVehicles, Vehicle } from "../../types";
import Button from "react-bootstrap/Button";

interface VehicleCardProps {
  query: string | null;
  searchResult: PageVehicles;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ query, searchResult }) => {
  return (
    <>
      {query && (
        <p>
          Showing {searchResult.total} search results for the name or word "{query}" in Star Wars
        </p>
      )}
      <div id="search-result" className="card-grid">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {searchResult.data.map((vehicle: Vehicle) => (
            <div className="col mb-4" key={vehicle.id}>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header className="card-header">
                  {vehicle.name}
                </Card.Header>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item key="model">
                      Model: {vehicle.model}
                    </ListGroup.Item>
                    <ListGroup.Item key="class">
                      Class: {vehicle.vehicle_class}
                    </ListGroup.Item>
                    <ListGroup.Item key="manufacturer">
                      Manufacturer: {vehicle.manufacturer}
                    </ListGroup.Item>
                  </ListGroup>

                  <Link to={`/vehicles/${vehicle.id}`}>
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

export default VehicleCard;