import axios, { AxiosRequestConfig } from "axios";

export const getPokemons = (config?: AxiosRequestConfig): any =>
  axios.get("pokemon", config);

export const getPokemon = (url: string, config?: AxiosRequestConfig): any =>
  axios(url, config);
