import axios, { AxiosRequestConfig } from "axios";

export const getPokemons = (config?: AxiosRequestConfig): any =>
  axios.get("pokemon", config);

export const getPokemon = (url: string, config?: AxiosRequestConfig): any =>
  axios(url, config);

export const getPokemonByName = (name: string): any =>
  axios.get(`pokemon/${name}`);

export const getPokemonOldAudioUri = (id: string) =>
  `https://pokemoncries.com/cries-old/${id}.mp3`;

export const getPokemonNewAudioUri = (id: string) =>
  `https://pokemoncries.com/cries/${id}.mp3`;
