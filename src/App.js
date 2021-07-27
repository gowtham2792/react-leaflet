import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {
  getBelmontCitydetails,
  getSmyrnaCitydetails
} from './app-store/actions';
import { useSelector, useDispatch } from 'react-redux';
import CityMap from './components/cityMap';
import smrynaImg from './images/smryna.jpg';
import bellmontImg from './images/bellmont.jpg';

export default function App() {
  const belmontCities = useSelector(state => state.citiesReducer.belmontCitydetails);
  const smyrnaCities = useSelector(state => state.citiesReducer.smyrnaCitydetails);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("smryna");

  useEffect(() => {    
    const getBelmontCityDetails = async () => {
      await axios
        .get('https://api.zippopotam.us/us/MA/Belmont')
        .then(response => {
          dispatch(getBelmontCitydetails(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    };
    // belmont city api call
    getBelmontCityDetails();
    const getSmyrnaCityDetails = async () => {
      await axios
        .get('https://api.zippopotam.us/us/GA/Smyrna')
        .then(response => {
          dispatch(getSmyrnaCitydetails(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    };
    // smyrna city api call
    getSmyrnaCityDetails();
  }, []);

  return (
    <div className="body-bg">
      <div className="width-25">
        <div className="width-100 cursor" onClick={() => setLocation("smryna")}>
          <div className={location === "belmont" ? "opacity smryna-label" : "no-opacity smryna-label"}>
            Smyrna GA
          </div>
          <div className="smryna-img">
            <img src={smrynaImg} width="280px" height="100%" />
          </div>
        </div>
        <hr />
        <div className={location === "belmont" ? "no-opacity width-100 cursor" : "opacity width-100 cursor"} onClick={() => setLocation("belmont")}>
          <div className="belmont-label">
            Belmont MA
          </div>
          <div className="belmont-img">
            <img src={bellmontImg} width="280px" height="100%" />
          </div>
        </div>
      </div>
      <div className="width-75">
        {location &&
          <CityMap
            locations={location === "belmont" ? belmontCities : smyrnaCities}
            cityName={location} />
        }
      </div>
    </div>
  );
}
