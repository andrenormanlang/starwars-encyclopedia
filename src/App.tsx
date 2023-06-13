import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import "./assets/scss/App.scss";
import SearchFilm from "./pages/searches/SearchFilm";
import FilmDetail from "./pages/detail/FilmDetail";
import SearchPeople from "./pages/searches/SearchPeople";
import PersonDetail from "./pages/detail/PersonDetail";
import SearchSpecies from "./pages/searches/SearchSpecies";
import SpeciesDetail from "./pages/detail/SpeciesDetail";
import SearchPlanets from "./pages/searches/SearchPlanets";
import PlanetDetail from "./pages/detail/PlanetDetail";
import SearchStarships from "./pages/searches/SearchStarships";
import StarshipDetail from "./pages/detail/StarshipDetail";
import SearchVehicles from "./pages/searches/SearchVehicles";
import VehicleDetail from "./pages/detail/VehicleDetail";


const App = () => {
  return (
    <div id="App">
      <Navigation />

      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />

			<Route path="/search-films" element={<SearchFilm />} />
			<Route path="/films/:id" element={<FilmDetail />} />

			<Route path="/search-people" element={<SearchPeople />} />
			<Route path="/people/:id" element={<PersonDetail />} />

			<Route path="/search-species" element={<SearchSpecies />} />
			<Route path="/species/:id" element={<SpeciesDetail />} />

			<Route path="/search-planets" element={<SearchPlanets />} />
			<Route path="/planets/:id" element={<PlanetDetail />} />

			<Route path="/search-starships" element={<SearchStarships />} />
			<Route path="/starships/:id" element={<StarshipDetail />} />

			<Route path="/search-vehicles" element={<SearchVehicles />} />
			<Route path="/vehicles/:id" element={<VehicleDetail />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
      </Container>
    </div>
  );
};

export default App;
