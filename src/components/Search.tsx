import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {

    const [searchInput, setSearchInput] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setSearchParams] = useSearchParams();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!searchInput.trim().length) {
          return;
        }
    
        setSearchParams({ query: searchInput });
      };

  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="searchQuery">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter your search query"
            required
            type="text"
            value={searchInput}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            type="submit"
            disabled={!searchInput.trim().length}
          >
            Search
          </Button>
        </div>
    </Form>
  )
}

export default Search