import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const UpdateMosque = () => {
  const [mosqueData, setMosqueData] = useState({
    name: "",
    slug: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    regular: 0,
    friday: 0,
    fajr: { azaan: "", jamaat: "" },
    dhuhr: { azaan: "", jamaat: "" },
    asr: { azaan: "", jamaat: "" },
    maghrib: { azaan: "", jamaat: "" },
    isha: { azaan: "", jamaat: "" },
    jumma: { azaan: "", jamaat: "", qutba: "" },
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch mosque data when the component mounts
  useEffect(() => {
    const fetchMosqueData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/mosque/detailsmosque/${id}`
        );
        setMosqueData(res.data.mosque);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch mosque data.");
        setLoading(false);
      }
    };

    fetchMosqueData();
  }, [id]);

  const handleChange = (e, field, prayer) => {
    if (prayer) {
      setMosqueData({
        ...mosqueData,
        [prayer]: { ...mosqueData[prayer], [field]: e.target.value },
      });
    } else {
      setMosqueData({
        ...mosqueData,
        [field]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const updatedData = { ...mosqueData };
      await axios.put(
        `${BASE_URL}/api/mosque/updatemosque/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/my-mosques");
    } catch (err) {
      setError("Failed to update mosque data.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h3 className="text-center">Update Mosque Details</h3>
      <form onSubmit={handleSubmit}>
        <h5>Mosque Information</h5>
        <div className="mb-3">
          <label>Mosque Name</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.name}
            onChange={(e) => handleChange(e, "name")}
          />
        </div>
        <div className="mb-3">
          <label>Slug</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.slug}
            onChange={(e) => handleChange(e, "slug")}
          />
        </div>
        <div className="mb-3">
          <label>Street</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.street}
            onChange={(e) => handleChange(e, "street")}
          />
        </div>
        <div className="mb-3">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.city}
            onChange={(e) => handleChange(e, "city")}
          />
        </div>
        <div className="mb-3">
          <label>State</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.state}
            onChange={(e) => handleChange(e, "state")}
          />
        </div>
        <div className="mb-3">
          <label>Postal Code</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.postalCode}
            onChange={(e) => handleChange(e, "postalCode")}
          />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.phone}
            onChange={(e) => handleChange(e, "phone")}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </div>
        <div className="mb-3">
          <label>Website</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.website}
            onChange={(e) => handleChange(e, "website")}
          />
        </div>
        <div className="mb-3">
          <label>Regular Capacity</label>
          <input
            type="number"
            className="form-control"
            value={mosqueData.regular}
            onChange={(e) => handleChange(e, "regular")}
          />
        </div>
        <div className="mb-3">
          <label>Friday Capacity</label>
          <input
            type="number"
            className="form-control"
            value={mosqueData.friday}
            onChange={(e) => handleChange(e, "friday")}
          />
        </div>

        <h5>Prayer Timings</h5>

        <div className="mb-3">
          <label>Fajr Azaan</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.fajr?.azaan || ""}
            onChange={(e) => handleChange(e, "azaan", "fajr")}
          />
          <label>Fajr Jamaat</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.fajr?.jamaat || ""}
            onChange={(e) => handleChange(e, "jamaat", "fajr")}
          />
        </div>

        <div className="mb-3">
          <label>Dhuhr Azaan</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.dhuhr?.azaan || ""}
            onChange={(e) => handleChange(e, "azaan", "dhuhr")}
          />
          <label>Dhuhr Jamaat</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.dhuhr?.jamaat || ""}
            onChange={(e) => handleChange(e, "jamaat", "dhuhr")}
          />
        </div>

        <div className="mb-3">
          <label>Asr Azaan</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.asr?.azaan || ""}
            onChange={(e) => handleChange(e, "azaan", "asr")}
          />
          <label>Asr Jamaat</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.asr?.jamaat || ""}
            onChange={(e) => handleChange(e, "jamaat", "asr")}
          />
        </div>

        <div className="mb-3">
          <label>Maghrib Azaan</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.maghrib?.azaan || ""}
            onChange={(e) => handleChange(e, "azaan", "maghrib")}
          />
          <label>Maghrib Jamaat</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.maghrib?.jamaat || ""}
            onChange={(e) => handleChange(e, "jamaat", "maghrib")}
          />
        </div>

        <div className="mb-3">
          <label>Isha Azaan</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.isha?.azaan || ""}
            onChange={(e) => handleChange(e, "azaan", "isha")}
          />
          <label>Isha Jamaat</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.isha?.jamaat || ""}
            onChange={(e) => handleChange(e, "jamaat", "isha")}
          />
        </div>

        <div className="mb-3">
          <label>Jumma Azaan</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.jumma?.azaan || ""}
            onChange={(e) => handleChange(e, "azaan", "jumma")}
          />
          <label>Jumma Jamaat</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.jumma?.jamaat || ""}
            onChange={(e) => handleChange(e, "jamaat", "jumma")}
          />
          <label>Jumma Qutba</label>
          <input
            type="text"
            className="form-control"
            value={mosqueData.jumma?.qutba || ""}
            onChange={(e) => handleChange(e, "qutba", "jumma")}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Update Mosque
        </button>
      </form>
    </div>
  );
};

export default UpdateMosque;
