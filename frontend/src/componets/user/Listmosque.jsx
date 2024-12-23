import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loadingimg from '../../loading/loading1.gif';
import './Listmosque.css';

const BASE_URL = 'http://localhost:3000';

const Listmosque = () => {
  const [mosques, setmosque] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchmosques = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/mosque/getmosque`);
        console.log(res);
        const sortedmosques = res.data.mosque.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setmosque(sortedmosques);
      } catch (err) {
        console.error('Error fetching mosques:', err);
        setError('Failed to load mosques. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchmosques();
  }, []);

  const handleSearch = () => {
    setmosque((prevMosques) =>
      prevMosques.filter((mosque) =>
        mosque.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mosque.address.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  if (loading) {
    return (
      <>
        <img className="loading-image" src={loadingimg} alt="Loading..." />
        <p className="loading">Loading...</p>
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (mosques.length === 0) {
    return <p>No mosques available</p>;
  }

  return (
    <div className="TOTAL">
      <h2 className="grid-title">تمام مسجد</h2>
      <div className="input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your area or mosque name"
        />
        <button className="search" onClick={handleSearch}>
          Search
        </button>
      </div>
      <br />
      <br />
      <div className="containers">
        <div className="grid">
          {mosques.map((mosque) => (
            <div className="mosque-card" key={mosque._id}>
              {mosque.images && mosque.images.length > 0 ? (
                <img
                  className="mosque-image"
                  onClick={() => navigate(`/detailsmosque/${mosque._id}`)}
                  src={mosque.images[0]}
                  alt={`${mosque.name} first image`}
                />
              ) : (
                <p>No images available</p>
              )}
              <div className="mosque-details">
                <p className="mosque-title">{mosque.name}</p>
                <p className="mosque-title">{mosque.address.street}</p>
                <p className="mosque-title">{mosque.address.city}-{mosque.address.postalCode}</p>
                <button className='moremore' onClick={() => navigate(`/detailsmosque/${mosque._id}`)}>
                  More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listmosque;
