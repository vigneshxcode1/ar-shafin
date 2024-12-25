import React, { useEffect, useState } from 'react';
import './showmymosque.css'; 
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:3000"

const ShowMyMosques = () => {
    const [mosques, setMosques] = useState([]);
    const [error, setError] = useState('');
const navigate = useNavigate()
    useEffect(() => {
        const adminId = localStorage.getItem('admin-id');

        if (!adminId) {
            setError('Admin ID not found. Please log in.');
            return;
        }

        const fetchMosques = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/mosque/my-mosques`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'admin-id': adminId, 
                    },
                });

                const data = await response.json();
                if (data.success) {
                    setMosques(data.mosques);
                    console.log(data.mosques)
                } else {
                    setError(data.message || 'Failed to fetch mosques.');
                }
            } catch (err) {
                setError('Error fetching mosques. Please try again.');
            }
        };

        fetchMosques();
    }, []);

    const handleDelete = async (id) => {
        if (!id) {
            console.error('Invalid ID for deletion:', id);
            setError('Unable to delete mosque. Invalid ID.');
            return;
        }
    
        const confirmDelete = window.confirm('Are you sure you want to delete?');
        if (!confirmDelete) return;
    
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${BASE_URL}/api/mosque/deletemosque/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            setMosques(mosques.filter((mosque) => mosque._id !== id));
        } catch (err) {
            console.error('Error deleting mosque:', err);
            setError('Failed to delete the mosque. Please try again.');
        }
    };
    



    // Function to format the date into a readable format
    const formatTime = (time) => {
        const date = new Date(time);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="show-my-mosques-container">
            <h2 className="show-my-mosques-title" id="title">My Mosques</h2>
            {error && <p className="error-message" id="error-message">{error}</p>}
            {mosques.length === 0 && !error && <p className="no-mosques-message" id="no-mosques-message">No mosques found for this admin.</p>}
            <ul className="mosques-list" id="mosques-list">
                {mosques.map((mosque) => (
                    <li key={mosque._id} className="mosque-item" id={`mosque-${mosque._id}`}>
                        <h3 className="mosque-name" id={`mosque-name-${mosque._id}`}>{mosque.name}</h3>

                        {/* Display Mosque Address */}
                        <p className="mosque-address" id={`mosque-address-${mosque._id}`}>
                            <strong>Address:</strong> {mosque.street}, {mosque.city}, {mosque.state}, {mosque.postalCode}
                        </p>

                        {/* Display Mosque Contact Details */}
                        <p className="mosque-phone" id={`mosque-phone-${mosque._id}`}>
                            <strong>Phone:</strong> {mosque.phone}
                        </p>
                        <p className="mosque-email" id={`mosque-email-${mosque._id}`}>
                            <strong>Email:</strong> {mosque.email}
                        </p>
                        <p className="mosque-website" id={`mosque-website-${mosque._id}`}>
                            <strong>Website:</strong> {mosque.website || 'Not available'}
                        </p>

                        {/* Display Prayer Times */}
                        <div className="prayer-times" id={`prayer-times-${mosque._id}`}>
                            <h4>Prayer Times:</h4>
                            <p><strong>Fajr:</strong> Azaan: {mosque.fajr.azaan}, Jamaat: {mosque.fajr.jamaat}</p>
                            <p><strong>Dhuhr:</strong> Azaan: {mosque.dhuhr.azaan}, Jamaat: {mosque.dhuhr.jamaat}</p>
                            <p><strong>Asr:</strong> Azaan: {mosque.asr.azaan}, Jamaat: {mosque.asr.jamaat}</p>
                            <p><strong>Maghrib:</strong> Azaan: {mosque.maghrib.azaan}, Jamaat: {mosque.maghrib.jamaat}</p>
                            <p><strong>Isha:</strong> Azaan: {mosque.isha.azaan}, Jamaat: {mosque.isha.jamaat}</p>
                            <p><strong>Jumma:</strong> Azaan: {mosque.jumma.azaan}, Jamaat: {mosque.jumma.jamaat}, Qutba: {mosque.jumma.qutba}</p>
                        </div>

                        {/* Display Regular and Friday Capacity */}
                        <p className="mosque-capacity" id={`mosque-capacity-${mosque._id}`}>
                            <strong>Regular Capacity:</strong> {mosque.regular || 'Not specified'}
                        </p>
                        <p className="mosque-friday-capacity" id={`mosque-friday-capacity-${mosque._id}`}>
                            <strong>Friday Capacity:</strong> {mosque.friday || 'Not specified'}
                        </p>

                        {/* Display Player Time (createdAt) */}
                        {mosque.createdAt && (
                            <p className="mosque-player-time" id={`mosque-player-time-${mosque._id}`}>
                                <strong>Player Time:</strong> {formatTime(mosque.createdAt)}
                            </p>
                        )}

            <button className="delete-button" onClick={() => handleDelete(mosque._id)}>Delete</button>
            <button className="update-button" onClick={() => navigate(`/mosques/update/${mosque._id}`)}>Update</button>

                        {/* Display Images */}
                        {mosque.images && mosque.images.length > 0 ? (
                            <div className="mosque-images" id={`mosque-images-${mosque._id}`}>
                                <h4 className="mosque-images-title" id={`mosque-images-title-${mosque._id}`}>Images</h4>
                                {mosque.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Mosque ${mosque.name} Image ${index + 1}`}
                                        className="mosque-image"
                                        id={`mosque-image-${mosque._id}-${index}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="no-images-message" id={`no-images-message-${mosque._id}`}>No images available</p>
                        )}
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default ShowMyMosques;
