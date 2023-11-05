import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_4LFtrKZ60t1sSxyWQIMaxwmXv2zlodstUsaDoW06kaYtPaMPvYTC90vu15TR1WnN";

export function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => {
            // console.log(response.data);
            return response.data;  
        })
       .catch(error => {
    console.log(error);
  });
       
};

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(result => {
            return result;
        })
        .catch(error => {
            console.log(error);
        })
};
