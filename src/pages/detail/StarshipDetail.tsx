import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useParams } from "react-router-dom";
import { getStarship as getStarshipById } from "../../services/StarWarsAPI";
import { Starship } from "../../types";

const StarshipDetail = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [starship, setStarship] = useState<Starship | null>(null);
  const { id } = useParams();
  const starshipId = Number(id);

  // Get starship from API
  const fetchStarship = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const data = await getStarshipById(id);

      // Update starship state with data
      setStarship(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (typeof starshipId !== "number") {
      return;
    }

    fetchStarship(starshipId);
  }, [starshipId]);

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        <p>{error}</p>
        <Button variant="primary" onClick={() => fetchStarship(starshipId)}>
          TRY AGAIN!!!
        </Button>
      </Alert>
    );
  }

  if (loading || !starship) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col mb-4" key={starship.id}>
      <Card border="primary" style={{ width: "80%" }}>
        <Card.Header className="card-header">{starship.name}</Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item key="length">
              Length: {starship.length}
            </ListGroup.Item>
            <ListGroup.Item key="crew amount">
              Crew: {starship.crew}
            </ListGroup.Item>
            <ListGroup.Item key="max passengers">
              Passenger max: {starship.passengers}
            </ListGroup.Item>
            <ListGroup.Item key="max atmoshpering speed">
              Max atmosphering speed: {starship.max_atmosphering_speed}
            </ListGroup.Item>
            <ListGroup.Item key="hyperdrive rating">
              Hyperdrive rating: {starship.hyperdrive_rating}
            </ListGroup.Item>
            <ListGroup.Item key="cargo capacity">
              Cargo capacity: {starship.cargo_capacity}
            </ListGroup.Item>
            <ListGroup.Item key="pilots">
              Pilots:
              <ul>
                {starship.pilots?.map((pilot) => (
                  <li key={pilot.id}>{pilot.name}</li>
                ))}
              </ul>
            </ListGroup.Item>
            <ListGroup.Item key="movie appearance">
              Appeared in:
              <ul>
                {starship.films?.map((film) => (
                  <li key={film.id}>{film.title}</li>
                ))}
              </ul>
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/search-starships`}>
            <Button variant="primary">Back to Starships</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StarshipDetail;
