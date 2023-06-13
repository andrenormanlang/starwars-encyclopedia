import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useParams } from "react-router-dom";
import { getPlanet as getPlanetById } from "../../services/StarWarsAPI";
import { Planet } from "../../types";

const PlanetDetail = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const { id } = useParams();
  const planetId = Number(id);

  // Get planet from API
  const fetchPlanet = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const data = await getPlanetById(id);

      // Update planet state with data
      setPlanet(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (typeof planetId !== "number") {
      return;
    }

    fetchPlanet(planetId);
  }, [planetId]);

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        <p>{error}</p>
        <Button variant="primary" onClick={() => fetchPlanet(planetId)}>
          TRY AGAIN!!!
        </Button>
      </Alert>
    );
  }

  if (loading || !planet) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col mb-4" key={planet.id}>
      <Card border="primary" style={{ width: "80%" }}>
        <Card.Header className="card-header">{planet.name}</Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item key="rotation">
              Rotation Period: {planet.rotation_period}
            </ListGroup.Item>
            <ListGroup.Item key="orbital">
              Orbital Period: {planet.orbital_period}
            </ListGroup.Item>
            <ListGroup.Item key="gravity">
              Gravity: {planet.gravity}
            </ListGroup.Item>
            <ListGroup.Item key="residents">
              Residents:
              <ul>
                {planet.residents?.map((residents) => (
                  <li key={residents.id}>{residents.name}</li>
                ))}
              </ul>
            </ListGroup.Item>
            <ListGroup.Item key="films">
              Appeared in the Films:
              <ul>
                {planet.films?.map((film) => (
                  <li key={film.id}>
                    <Link to={`/films/${film.id}`}>{film.title}</Link>
                  </li>
                ))}
              </ul>
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/search-planets`}>
            <Button variant="primary">Back to Planets</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlanetDetail;
