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

//STARSHIPS
export type Starship = {
	id: number;
	name: string;
	model: string;
	starship_class: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	crew: string;
	passengers: string;
	max_atmosphering_speed: string;
	hyperdrive_rating: string;
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	pilots_count: number;
	films_count: number;
	pilots:[ {
		id: number;
		name: string;
	}];
	films:[{
		id: number;
		title: string;
	}];
};

export type PageStarships = {
	current_page: number;
	data: Starship[]
	last_page: number;
	next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

//VEHICLES
export type Vehicle = {
	id: number;
	name: string;
	model: string;
	vehicle_class: string;
	manufacturer: string;
	length: string;
	cost_in_credits: string;
	crew: string;
	passengers: string;
	max_atmosphering_speed: string;
	cargo_capacity: string;
	consumables: string;
	pilots_count: number;
	films_count: number;
	pilots:[ {
		id: number;
		name: string;
	}];
	films:[{
		id: number;
		title: string;
	}];
};

export type PageVehicles = {
	current_page: number;
	data: Vehicle[]
	last_page: number;
	next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}