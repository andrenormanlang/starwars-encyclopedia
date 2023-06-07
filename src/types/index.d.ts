//FILM
export type Film = {
	id: number;
	title: string;
	episode_id: string;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	created: string;
	edited: string;
	characters_count: number;
	characters?: Character[];
}

export type PageFilm = {
	data: Film[]
	next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

//PEOPLE
export type Character = {
	id: number;
	name: string;
	birth_year: string;
	eye_color: string;
	hair_color: string;
	height: string;
	mass: string;
	skin_color: string;
	films_count: number;
	created: string;
	edited: string;
	homeworld: {
		id: number;
		name: string;
	};
	films:[ {
		id: number;
		title: string;
	}];
	species: [{
		id: number;
        name: string;
	}]; 
	starships:[ {
		id: number;
		name: string;
	}];
	vehicles: [{
		id: number;
		name: string;
	}];
};

export type PagePeople = {
	current_page: number;
	data: Character[]
	last_page: number;
	next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

//SPECIES
export type Species = {
	id: number;
	name: string;
	classification: string;
	designation: string;
	average_height: string;
	average_lifespan: string;
	eye_colors: string;
	hair_colors: string;
	skin_colors: number;
	language: string;
	homeworld: {
		id: number;
        name: string;
	}; 
	people:[ {
		id: number;
		name: string;
	}];
	films:[ {
		id: number;
		name: string;
	}];
};

export type PageSpecies = {
	current_page: number;
	data: Species[]
	last_page: number;
	next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

//PLANETS
export type Planet = {
	id: number;
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	population: string;
	residents:[ {
		id: number;
		name: string;
	}];
	films:[{
		id: number;
		title: string;
	}];
};

export type PagePlanets = {
	current_page: number;
	data: Planet[]
	last_page: number;
	next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}