import api from "./api";
import { SearchResult } from '../models';

export const search = (query: string): Promise<SearchResult[]> => {
  return api
      .get(`api/v1/search?text=${query}`)
      .then(res => res.data);
}