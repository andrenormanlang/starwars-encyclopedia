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
}

export  type Character = {
	id: number;
	name: string;
	birth_year: string;
	eye_color: string;
	hair_color: string;
	height: string;
	mass: string;
	skin_color: string;
	created: string;
	edited: string;
	homeworld: [{
		id: number;
		name: string;
	}];
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

export type PartialCharacter = Partial<Character>


export  type Species = {
	id: number;
	name: string;
	classification: string;
	designation: string;
	average_height: string;
	average_lifespan: string;
	eye_colors: string;
	hair_colors: string;
	skin_colors: string;
	language: string;
	created: string;
	edited: string;
	people:[{
		id: number;
		name: string;
	}];
	homeworld: {
		id: number;
		name: string;
	};
	films:[ {
		id: number;
		title: string;
	}];
  }