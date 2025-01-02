import React, { useState } from 'react';
import axios from 'axios';
import './CreateMosques.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://ar-shafin-server.onrender.com';

const CreateMosque = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    state: '',
    city: '',
    street: '',
    postalCode: '',
    phone: '',
    email: '',
    website: '',
    regular: 0,
    friday: 0,
    fajr: { azaan: '', jamaat: '' },
    dhuhr: { azaan: '', jamaat: '' },
    asr: { azaan: '', jamaat: '' },
    maghrib: { azaan: '', jamaat: '' },
    isha: { azaan: '', jamaat: '' },
    jumma: { azaan: '', jamaat: '', qutba: '' },
    images: '', // Single image URL
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      // Handle nested fields like prayer times
      const [field, subField] = name.split('.');
      setFormData({
        ...formData,
        [field]: { ...formData[field], [subField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminId = localStorage.getItem('admin-id'); // Get admin-id from localStorage

    if (!adminId) {
      setError('Admin ID not found in localStorage. Please log in.');
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await axios.post(`${BASE_URL}/api/mosque/createmosque`, formData, {
        headers: {
          "Content-Type":'application/json',
          'admin-id': adminId, // Use the admin-id from localStorage
        },
      });

      if (response.data.success) {
        setSuccess('Mosque created successfully!');
        setFormData({
          name: '',
          slug: '',
          state: '',
          city: '',
          street: '',
          postalCode: '',
          phone: '',
          email: '',
          website: '',
          regular: 0,
          friday: 0,
          fajr: { azaan: '', jamaat: '' },
          dhuhr: { azaan: '', jamaat: '' },
          asr: { azaan: '', jamaat: '' },
          maghrib: { azaan: '', jamaat: '' },
          isha: { azaan: '', jamaat: '' },
          jumma: { azaan: '', jamaat: '', qutba: '' },
          images: '',
        });
        navigate("/my-mosques")
      }
    } catch (error) {
      setError('Failed to create mosque. Please try again.');
    }
  };

  return (
    <div className="create-mosque">
      <h2>Create Mosque</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <label>Slug:</label>
        <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} />
        <label>State:</label>
        <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
        <label>Street:</label>
        <input type="text" name="street" value={formData.street} onChange={handleInputChange} required />
        <label>Postal Code:</label>
        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange}  />
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange}  />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        <label>Website:</label>
        <input type="text" name="website" value={formData.website} onChange={handleInputChange} />
        <label>Capacity (Regular):</label>
        <input type="number" name="regular" value={formData.regular} onChange={handleInputChange} />
        <label>Capacity (Friday):</label>
        <input type="number" name="friday" value={formData.friday} onChange={handleInputChange} />
        <h3>Prayer Timings:</h3>
        {['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'jumma'].map((prayer) => (
          <div key={prayer}>
            <label>{`${prayer.charAt(0).toUpperCase() + prayer.slice(1)} Azaan:`}</label>
            <input
              type="text"
              name={`${prayer}.azaan`}
              value={formData[prayer].azaan}
              onChange={handleInputChange}
              required
            />
            <label>{`${prayer.charAt(0).toUpperCase() + prayer.slice(1)} Jamaat:`}</label>
            <input
              type="text"
              name={`${prayer}.jamaat`}
              value={formData[prayer].jamaat}
              onChange={handleInputChange}
              required
            />
            {prayer === 'jumma' && (
              <>
                <label>Jumma Qutba:</label>
                <input
                  type="text"
                  name="jumma.qutba"
                  value={formData.jumma.qutba}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}
          </div>
        ))}
        <h3>Image:</h3>
        <label>Image URL:</label>
        <input
          type="text"
          name="images"
          value={formData.images}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Mosque</button>
      </form>
    </div>
  );
};

export default CreateMosque;
