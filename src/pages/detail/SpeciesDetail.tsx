import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useParams } from "react-router-dom";
import { getSpecies as getSpeciesById } from "../../services/StarWarsAPI";
import { Species } from "../../types";


const SpeciesDetail = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState<Species | null>(null);
  const { id } = useParams();
  const speciesId = Number(id);

  // Get species from API
  const fetchSpecies = async (id: number) => {
    setError(null);
    setLoading(true);

    try {
      const data = await getSpeciesById(id);

      // Update species state with data
      setSpecies(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (typeof speciesId !== "number") {
      return;
    }

    fetchSpecies(speciesId);
  }, [speciesId]);

  if (error) {
    return (
      <Alert variant="warning">
        <h1>Something went wrong!</h1>
        <p>{error}</p>
        <Button variant="primary" onClick={() => fetchSpecies(speciesId)}>
          TRY AGAIN!!!
        </Button>
      </Alert>
    );
  }

  if (loading || !species) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col mb-4" key={species.id}>
      <Card border="primary" style={{ width: "80%" }}>
        <Card.Header className="card-header">{species.name}</Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item key="designation">
              Designation: {species.designation}
            </ListGroup.Item>
            <ListGroup.Item key="hair color">
              Hair Colors: {species.hair_colors}
            </ListGroup.Item>
            <ListGroup.Item key="skin color">
              Eye Colors: {species.eye_colors}
            </ListGroup.Item>
            <ListGroup.Item key="skin color">
              Skin Colors: {species.skin_colors}
            </ListGroup.Item>
            <ListGroup.Item key="height">
              Average Height: {species.average_height} cm
            </ListGroup.Item>
            <ListGroup.Item key="weight">
              Average Lifespan: {species.average_lifespan}
            </ListGroup.Item>
            <ListGroup.Item key="species">
              People:
              <ul>
                {species.people?.map((people) => (
                  <li key={people.id}>
                    <Link to={`/people/${people.id}`}>{people.name}</Link>
                  </li>
                ))}
              </ul>
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/search-species`}>
            <Button variant="primary">Back to Species</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SpeciesDetail;
