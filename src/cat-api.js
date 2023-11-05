import axios from "axios";

axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = "live_pLFsKr3BoHrT6i9dasqBQMO6tOhQcD76K2Vhyy0hO26KVmnqZHxcrfVnIPjU7tfX";

export function fetchBreeds() {
  return axios.get('breeds')
  .then(response => response.data)
}

export function fetchCatByBreed(id) {
  return axios.get(`images/search?breed_ids=${id}`)
  .then(response => response.data)
}