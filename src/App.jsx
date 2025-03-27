import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';

// import AppLayout from './pages/AppLayout';
const BASE_URL = 'http://localhost:3000';
function App() {
  // eslint-disable-next-line no-unused-vars
  const [cities, setCities] = useState([]);
  // const [countries, setCountries] = useState([]);
  // const [form, setForm] = useState({});
  //
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={loading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={loading} />}
          />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  );
}

export default App;
