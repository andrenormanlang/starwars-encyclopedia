/**
 * SWAPI API service
 *
 *
 */

import axios from "axios";
import {
  Character,
  Film,
  PageFilm,
  PagePeople,
  Species,
  PageSpecies,
  PagePlanets,
  Planet,
  PageStarships,
  Starship,
  PageVehicles,
  Vehicle
} from "../types/index";

// Create a new axios instance
const instance = axios.create({
  baseURL: "https://swapi.thehiveresistance.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise
 */
const get = async <T>(endpoint: string) => {
  const response = await instance.get(endpoint);
  return response.data as T;
};

/**
 * Film
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchFilm = async (searchQuery: string) => {
  return get<PageFilm>(`/films?search=${searchQuery}`);
};

export const getAllFilms = async () => {
  return get<PageFilm>(`/films`);
};

export const getFilm = async (id: number) => {
  return get<Film>(`/films/${id}`);
};

/**
 * People
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */

export const searchPerson = async (
  searchQuery: string,
  page = 0,
  per_page = 9
) => {
  return get<PagePeople>(
    `/people?search=${searchQuery}&page=${page}&per_page=${per_page}`
  );
};

export const getAllPeople = async (page = 0, per_page = 9) => {
  return get<PagePeople>(`/people?page=${page}&per_page=${per_page}`);
};

export const getPagePeople = async (pageUrl: string) => {
  return get<PagePeople>(pageUrl);
};

export const getPerson = async (id: number) => {
  return get<Character>(`/people/${id}`);
};

/**
 * Species
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */

export const searchSpecies = async (
  searchQuery: string,
  page = 0,
  per_page = 9
) => {
  return get<PageSpecies>(
    `/species?search=${searchQuery}&page=${page}&per_page=${per_page}`
  );
};

export const getAllSpecies = async (page = 0, per_page = 9) => {
  return get<PageSpecies>(`/species?page=${page}&per_page=${per_page}`);
};

export const getPageSpecies = async (pageUrl: string) => {
  return get<PageSpecies>(pageUrl);
};

export const getSpecies = async (id: number) => {
  return get<Species>(`/species/${id}`);
};

/**
 * Planets
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */

export const searchPlanets = async (
  searchQuery: string,
  page = 0,
  per_page = 9
) => {
  return get<PagePlanets>(
    `/planets?search=${searchQuery}&page=${page}&per_page=${per_page}`
  );
};

export const getAllPlanets = async (page = 0, per_page = 9) => {
  return get<PagePlanets>(`/planets?page=${page}&per_page=${per_page}`);
};

export const getPagePlanets = async (pageUrl: string) => {
  return get<PagePlanets>(pageUrl);
};

export const getPlanet = async (id: number) => {
  return get<Planet>(`/planets/${id}`);
};

/**
 * Starships
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */

export const searchStarships = async (
  searchQuery: string,
  page = 0,
  per_page = 9
) => {
  return get<PageStarships>(
    `/starships?search=${searchQuery}&page=${page}&per_page=${per_page}`
  );
};

export const getAllStarships = async (page = 0, per_page = 9) => {
  return get<PageStarships>(`/starships?page=${page}&per_page=${per_page}`);
};

export const getPageStarships= async (pageUrl: string) => {
  return get<PageStarships>(pageUrl);
};

export const getStarship = async (id: number) => {
  return get<Starship>(`/starships/${id}`);
};


/**
 * Vehicles
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */

export const searchVehicles = async (
  searchQuery: string,
  page = 0,
  per_page = 9
) => {
  return get<PageVehicles>(
    `/vehicles?search=${searchQuery}&page=${page}&per_page=${per_page}`
  );
};

export const getAllVehicles = async (page = 0, per_page = 9) => {
  return get<PageVehicles>(`/vehicles?page=${page}&per_page=${per_page}`);
};

export const getPageVehicles= async (pageUrl: string) => {
  return get<PageVehicles>(pageUrl);
};

export const getVehicle = async (id: number) => {
  return get<Vehicle>(`/vehicles/${id}`);
};
