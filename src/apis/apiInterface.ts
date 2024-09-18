import axios from 'axios';
import END_POINT from './endpoint';
import { fetchErrorHandler, handleNonNegativeInteger } from '../utils/errorHandlers';

export enum Entity {
  POKEMON = 'pokemon',
  MOVE = 'move',
}

const activeBaseURL = `${END_POINT.BASE_URL}/${END_POINT.V2}`;

interface NamedAPIResource {
  name: string;
  url: string;
}

interface ListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function getEntityName(index: number, entity: Entity): Promise<string> {
  handleNonNegativeInteger(index);
  const URL = `${activeBaseURL}/${entity}/?offset=${index}&limit=1`;
  try {
    const response = await axios.get<ListResponse<NamedAPIResource>>(URL);
    const results = response.data.results;
    if (!results || results.length === 0) {
      throw new Error(`${entity} not found`);
    }
    return results[0].name;
  } catch (error) {
    fetchErrorHandler(error);
  }
}

export async function getEntityProperties<T>(name: string, entity: Entity): Promise<T> {
  const URL = `${activeBaseURL}/${entity}/${name}`;
  try {
    const response = await axios.get<T>(URL);
    return response.data;
  } catch (error) {
    fetchErrorHandler(error);
  }
}

export async function getEntityCount(entity: Entity): Promise<number> {
  const URL = `${activeBaseURL}/${entity}?limit=1`;
  try {
    const response = await axios.get<ListResponse<NamedAPIResource>>(URL);
    return response.data.count;
  } catch (error) {
    fetchErrorHandler(error);
  }
}