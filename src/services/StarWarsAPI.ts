import axios, { AxiosResponse }  from 'axios';
import { Film, Character, PartialCharacter } from '../types';

const BASE_URL = 'https://swapi.thehiveresistance.com/api';

//  API functions
export const getFilm = async function fetchFilm(searchQuery: string): Promise<Film[]> {
	try {
        const responseFilm:  AxiosResponse<Film[]> = await axios.get(`${BASE_URL}/films?search=${searchQuery}`)
        return responseFilm.data as Film[]
    } catch (error) {
        console.log(error);
        return[]
	}
}

const getCharacter = async <Character>(endpoint: string) => {
	const response = await axios.get(`${BASE_URL}/people`)
	return response.data as Character
}

const get = async <T>(endpoint: string) => {
	const response = await axios.get(endpoint)
	return response.data as T
}

export const searchPeople = async (person:PartialCharacter ) => {
	return get<any>(`/?search=${person}`)
}
