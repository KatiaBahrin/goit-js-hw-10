import axios from "axios";

axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = "live_beQu7zT9FlJAeGDcxNQrMt8Ub9SDInW4f0n000GBTOIOTZsxKZ9c7uNJyIOn0ykD";

export function fetchBreeds() {
  return axios.get('breeds')
  .then(response => response.data)
}

export function fetchCatByBreed(id) {
  return axios.get(`images/search?breed_ids=${id}`)
  .then(response => response.data)
}