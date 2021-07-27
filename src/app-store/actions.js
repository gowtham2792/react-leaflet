import { GET_BELMONT_CITIES, GET_SMYRNA_CITIES } from './action-types';

export const getBelmontCitydetails = data => {
  return {
    type: GET_BELMONT_CITIES,
    payload: data
  };
};

export const getSmyrnaCitydetails = data => {
  return {
    type: GET_SMYRNA_CITIES,
    payload: data
  };
};
