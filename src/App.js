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
          console.log(response.data);
          dispatch(getBelmontCitydetails(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    };
    getBelmontCityDetails();
    const getSmyrnaCityDetails = async () => {
      await axios
        .get('https://api.zippopotam.us/us/GA/Smyrna')
        .then(response => {
          console.log(response.data);
          dispatch(getSmyrnaCitydetails(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    };
    getSmyrnaCityDetails();
  }, []);

  return (
    <div style={{
      backgroundColor: "#D84041",
      width: "100%",
      float: "left",
    }}>
      <div style={{ width: "25%", float: "left" }}>
        <div style={{ width: "100%", float: "left", cursor: "pointer" }} onClick={() => setLocation("smryna")}>
          <div className={location === "belmont" ? "opacity" : "no-opacity"} style={{ color: "#FFF", fontSize: "18px", textAlign: "center", paddingTop: "30px" }}>
            Smyrna GA
          </div>
          <div style={{ textAlign: "center", paddingTop: "60px", paddingBottom: "40px" }}>
            <img src={smrynaImg} width="280px" height="100%" />
          </div>
        </div>
        <hr />
        <div className={location === "belmont" ? "no-opacity" : "opacity"} style={{ width: "100%", float: "left", cursor: "pointer" }} onClick={() => setLocation("belmont")}>
          <div style={{ width: "100%", float: "left", color: "#FFF", fontSize: "18px", textAlign: "center", paddingTop: "30px" }}>
            Belmont MA
          </div>
          <div style={{ width: "100%", float: "left", textAlign: "center", paddingTop: "60px" }}>
            <img src={bellmontImg} width="280px" height="100%" />
          </div>
        </div>
      </div>
      <div style={{ width: "75%", float: "left" }}>
        {location &&
          <CityMap
            locations={location === "belmont" ? belmontCities : smyrnaCities}
            cityName={location} />
        }

      </div>
    </div>
  );
}
