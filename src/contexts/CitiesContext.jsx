import React, { useState, useEffect, useReducer } from 'react';
import { createContext } from 'react';

const BASE_URL = 'http://localhost:3000';

const CitiesContext = createContext();
const initialState = {
  cities: [],
  loading: true,
  currentCity: {},
  error: '',
};
function reducer(state, action) {
switch (action.type) {
  case 'loading' :return{...state, loading : true}



  case 'cities/loaded' :return{
...state, loading : false, cities: action.payload
  }
  case 'cities/created' :
    
  case 'cities/deleted' :

  case 'rejected' :return{
      ...state,loading:false ,error:action.payload
    }
  default :throw new Error('Unknown action type');
}}
function CitiesProvider({ children }) {
  //
  // const [cities, setCities] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [currentCity, setCurrentCity] = useState({});
  //
  const {{cities,loading,currentCity}, dispatch } = useReducer(reducer, initialState);

  useEffect(function () {
    dispatch({ type: 'loading' });
    async function fetchCities() {
      try {
    
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'There was an error loading data...4' });
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setCities(prevCities => [...prevCities, data]);
      console.log(data);
    } catch (error) {
      console.error('Error creating city:');
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      const data = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      console.log(data);
      setCities(cities.filter(city => city.id !== data.id));
    } catch (error) {
      console.error('Error deleting city:');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        setCurrentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = React.useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}

export { CitiesProvider, useCities };
