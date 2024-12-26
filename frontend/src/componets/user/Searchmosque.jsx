import React from 'react'


const BASE_URL = 'https://ar-shafin-server.onrender.com';

const Searchmosque = () => {
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchmosques = async () => {
          try {
            const res = await axios.get(`${BASE_URL}/api/mosque/getmosque`);
            console.log(res.data.mosques);
            const sortedMosques = res.data.mosques.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setmosque(sortedMosques);
            console.log(sortedMosques)
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
            mosque.city.toLowerCase().includes(searchQuery.toLowerCase()) // Removed 'address.'
          )
        );
      };


  return (
   <>
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
   
   </>
  )
}

export default Searchmosque