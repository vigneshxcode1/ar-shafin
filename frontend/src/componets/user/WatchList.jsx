import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Listmosque.css';


const watchlist= () => {
  const [mosques, setMosques] = useState([]);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMosques = async () => {
      try {
        const existingWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setMosques(existingWatchlist);
       
      } catch (err) {
        console.error('Error fetching mosques:', err);
        setError('Failed to load mosques. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMosques();
  }, []);

 

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
        <Link className="auth" to="/">Home</Link>
        <Link className="auth" to="/listmosque">list mosque</Link>
      </div>
      <h2 className="grid-title">WatchL</h2>
      <br />
      <br />
      <div className="containers">
        <div className="grid">
          {mosques.length > 0 ? (
            mosques.map((mosque) => (
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
                  <br />
                 
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

export default watchlist;
