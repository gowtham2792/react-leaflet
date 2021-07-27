import { GET_BELMONT_CITIES, GET_SMYRNA_CITIES } from './action-types';

const initialState = {
  belmontCitydetails: [],
  smyrnaCitydetails: []
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BELMONT_CITIES: 
      return { ...state, belmontCitydetails: action.payload };    
    case GET_SMYRNA_CITIES: 
      return { ...state, smyrnaCitydetails: action.payload };    
    default:
      return state;
  }
}

export default citiesReducer;
