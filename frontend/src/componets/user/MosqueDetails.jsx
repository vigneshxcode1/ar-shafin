import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './mosque.css';
import mapimg from '../../images/google-maps.png';

const BASE_URL = 'http://localhost:3000';

const MosqueDetail = () => {
  const { id } = useParams();
  const [mosque, setMosque] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMosqueDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/mosque/detailsmosque/${id}`);
        setMosque(response.data.mosque);
        console.log(response.data.mosque);
      } catch (err) {
        console.error('Error fetching mosque details:', err);
        setError('Failed to load mosque details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMosqueDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading mosque details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  if (!mosque) {
    return (
      <div className="no-data">
        <p>No mosque data available</p>
      </div>
    );
  }

  // Function to handle map redirection
  const redirectToMap = () => {
    const { street, city, state, postalCode } = mosque || {};
    const formattedAddress = `${street}, ${city}, ${state}, ${postalCode}`;
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(formattedAddress)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="mosque-detail-container">
      <h1 className="heading">{mosque.name || 'Mosque Name'}</h1>

      <div className="mosque-image">
        {mosque.images && mosque.images.length > 0 ? (
          <img src={mosque.images[0]} alt={mosque.name} />
        ) : (
          <p>No images available</p>
        )}
      </div>

<br />
      <div className="timings">
        <h2 className="prayerh2">Prayer Timings:</h2>
        <p><strong>Fajr:</strong> {mosque.fajr?.azaan || 'Not Available'} (Azan), {mosque.fajr?.jamaat || 'Not Available'} (Jamaat)</p>
        <p><strong>Dhuhr:</strong> {mosque.dhuhr?.azaan || 'Not Available'} (Azan), {mosque.dhuhr?.jamaat || 'Not Available'} (Jamaat)</p>
        <p><strong>Asr:</strong> {mosque.asr?.azaan || 'Not Available'} (Azan), {mosque.asr?.jamaat || 'Not Available'} (Jamaat)</p>
        <p><strong>Maghrib:</strong> {mosque.maghrib?.azaan || 'Not Available'} (Azan), {mosque.maghrib?.jamaat || 'Not Available'} (Jamaat)</p>
        <p><strong>Isha:</strong> {mosque.isha?.azaan || 'Not Available'} (Azan), {mosque.isha?.jamaat || 'Not Available'} (Jamaat)</p>
        <p><strong>Jumma:</strong> {mosque.jumma?.azaan || 'Not Available'} (Azan), {mosque.jumma?.jamaat || 'Not Available'} (Jamaat), Qutba: {mosque.jumma?.qutba || 'Not Available'}</p>

        <p>Capacity: Regular - {mosque.regular || 'Not Available'}, Friday - {mosque.friday || 'Not Available'}</p>
      </div>

      <button className="waytomosque" onClick={redirectToMap}>
        Way to Map <img src={mapimg} className="mapimg" alt="Map Icon" />
      </button>

      <div className="mosque-address">
        <h2>Address</h2>
        <p>{mosque.street || 'Not Available'}</p>
        <p>{mosque.city}, {mosque.state} - {mosque.postalCode || 'Not Available'}</p>

        <h2>Contact Information</h2>
        <p>Phone: {mosque.phone || 'Not Available'}</p>
        <p>Email: {mosque.email || 'Not Available'}</p>
      </div>
    </div>
  );
};

export default MosqueDetail;
