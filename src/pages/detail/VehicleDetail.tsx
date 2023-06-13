import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useParams } from "react-router-dom";
import { getVehicle as getVehicleById } from "../../services/StarWarsAPI";
import { Vehicle } from "../../types";

const VehicleDetail = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const { id } = useParams();
  const vehicleId = Number(id);

  // Get vehicle from API
  const fetchVehicle = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const data = await getVehicleById(id);

      // Update vehicle state with data
      setVehicle(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (typeof vehicleId !== "number") {
      return;
    }

    fetchVehicle(vehicleId);
  }, [vehicleId]);

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        <p>{error}</p>
        <Button variant="primary" onClick={() => fetchVehicle(vehicleId)}>
          TRY AGAIN!!!
        </Button>
      </Alert>
    );
  }

  if (loading || !vehicle) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col mb-4" key={vehicle.id}>
      <Card border="primary" style={{ width: "80%" }}>
        <Card.Header className="card-header">{vehicle.name}</Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item key="cost">
              Cost in credits: {vehicle.cost_in_credits}
            </ListGroup.Item>
            <ListGroup.Item key="length">
              Length: {vehicle.length}
            </ListGroup.Item>
            <ListGroup.Item key="crew amount">
              Crew: {vehicle.crew}
            </ListGroup.Item>
            <ListGroup.Item key="max passengers">
              Passenger max: {vehicle.passengers}
            </ListGroup.Item>
            <ListGroup.Item key="max atmoshpering speed">
              Max atmosphering speed: {vehicle.max_atmosphering_speed}
            </ListGroup.Item>
            <ListGroup.Item key="consumables">
              Consumables: {vehicle.consumables} 
            </ListGroup.Item>
            <ListGroup.Item key="cargo capacity">
              Cargo capacity: {vehicle.cargo_capacity}
            </ListGroup.Item>
            <ListGroup.Item key="pilots">
              Pilots:
              <ul>
                {vehicle.pilots?.map((pilot) => (
                  <li key={pilot.id}>{pilot.name}</li>
                ))}
              </ul>
            </ListGroup.Item>
            <ListGroup.Item key="movie appearance">
              Appeared in:
              <ul>
                {vehicle.films?.map((film) => (
                  <li key={film.id}>{film.title}</li>
                ))}
              </ul>
            </ListGroup.Item>
            {/* <ListGroup.Item key="films">
              Films:
              <ul>
                {person.films?.map((film) => (
                  <li key={film.id}>
                    <Link to={`/films/${film.id}`}>{film.title}</Link>
                  </li>
                ))}
              </ul>
            </ListGroup.Item> */}
          </ListGroup>
          <Link to={`/search-vehicles`}>
            <Button variant="primary">Back to Vehicles</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VehicleDetail;
