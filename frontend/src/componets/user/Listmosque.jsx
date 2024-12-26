import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Listmosque.css';

const BASE_URL = 'https://ar-shafin-server.onrender.com';

// const BASE_URL="http://localhost:3000";

const Listmosque = () => {
  const [mosques, setMosques] = useState([]);
  const [filteredMosques, setFilteredMosques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMosques = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/mosque/getmosque`);
        const sortedMosques = res.data.mosques.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMosques(sortedMosques);
        setFilteredMosques(sortedMosques); // Initialize with all mosques
      } catch (err) {
        console.error('Error fetching mosques:', err);
        setError('Failed to load mosques. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMosques();
  }, []);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim(); // Remove trailing spaces
    const filtered = mosques.filter((mosque) =>
      mosque.name.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
      mosque.city.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
      mosque.street.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
      mosque.postalCode.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setFilteredMosques(filtered);
  };

  if (loading) {
    return (
      <div>
        <p className="loading">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="TOTAL">
      <h2 className="grid-title">تمام مسجد</h2>
      <div className="auth">
        <Link className="auth" to="/login">Login</Link>
        <Link className="auth" to="/register">Register</Link>
      </div>
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
          {filteredMosques.length > 0 ? (
            filteredMosques.map((mosque) => (
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
                  <p className="mosque-title">{mosque.street}</p>
                  <p className="mosque-title">{mosque.city}-{mosque.postalCode}</p>
                  <button
                    className="moremore"
                    onClick={() => navigate(`/detailsmosque/${mosque._id}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No mosques found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listmosque;
