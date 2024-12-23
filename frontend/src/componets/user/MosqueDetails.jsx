import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import loadingimg from '../../loading/loading1.gif'; 
import './mosque.css'

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
      <div>
        <img src={loadingimg} alt="Loading..." />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!mosque) {
    return <p>No mosque data available</p>;
  }

  // Function to handle map redirection
  const redirectToMap = () => {
    const { street, city, state, postalCode } = mosque.address;
    const formattedAddress = `${street}, ${city}, ${state}, ${postalCode}`;
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(formattedAddress)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="mosque-detail-container">

      <h1 className='heading'>{mosque.name}</h1>

      <div className="mosque-image">
        {mosque.images && mosque.images.length > 0 ? (
          <img src={mosque.images[0]} alt={mosque.name} />
        ) : (
          <p>No images available</p>
        )}
      </div>
      <br />
    
      <div className="timings">
        <h2 className='prayerh2'>Prayer Timings:</h2>
        <p className='p1'><strong>Fajr:</strong> {mosque.timings.fajr.azaan} (Azan), {mosque.timings.fajr.jamaat} (Jamaat)</p>
        <p className='p1'><strong>Dhuhr:</strong> {mosque.timings.dhuhr.azaan} (Azan), {mosque.timings.dhuhr.jamaat} (Jamaat)</p>
        <p className='p1'><strong>Asr:</strong> {mosque.timings.asr.azaan} (Azan), {mosque.timings.asr.jamaat} (Jamaat)</p>
        <p className='p1'><strong>Maghrib:</strong> {mosque.timings.maghrib.azaan} (Azan), {mosque.timings.maghrib.jamaat} (Jamaat)</p>
        <p className='p1'> <strong>Isha:</strong> {mosque.timings.isha.azaan} (Azan), {mosque.timings.isha.jamaat} (Jamaat)</p>
        <p className='p1'><strong>Jumma:</strong> {mosque.timings.jumma.azaan} (Azan), {mosque.timings.jumma.jamaat} (Jamaat), Qutba: {mosque.timings.jumma.qutba}</p>
        <p className='p1'>Capacity: Regular - {mosque.aboutInfo.capacity.regular}, Friday - {mosque.aboutInfo.capacity.friday}</p>
      </div>
     
      <br />
      
      {/* Way to Map button */}
      <button className='waytomosque' onClick={redirectToMap}>Way to Map</button>
      <br />
      <br />

      <div className="mosque-address">
        <h2>Address</h2>
        <p>{mosque.address.street}</p>
        <p>{mosque.address.city}, {mosque.address.state}- {mosque.address.postalCode}</p>

        <h2>Contact Information</h2>
        <p>Phone: {mosque.contactInfo.phone}</p>
        <p>Email: {mosque.contactInfo.email}</p>

        <h2>About</h2>
        <p>Established: {new Date(mosque.aboutInfo.established).toLocaleDateString()}</p>

        <h2>Active Status</h2>
        <p>{mosque.active ? 'This mosque is active' : 'This mosque is inactive'}</p>
      </div>
    </div>
  );
};

export default MosqueDetail;
