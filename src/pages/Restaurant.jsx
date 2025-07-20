import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSuspenseQuery} from "@tanstack/react-query";
import Fallback from '../components/fallback.jsx';

const Restaurant = () => {
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    zipcode: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [restaurantz,setRestau] = useState([])
  const [loading,setLoading] = useState(true)
  const navigate = useNavigate()

  // Calculate total pages based on totalNumRestaurants
  const calculateTotalPages = (totalNumRestaurants) => {
    const restaurantsPerPage = 10; // Assuming 10 restaurants per page, adjust as needed
    return Math.ceil(totalNumRestaurants / restaurantsPerPage);
  };

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BACKEND_URL}/restaurants/?name=${filters.search}&cuisine=${filters.cuisine}&zipcode=${filters.zipcode}&page=${currentPage}`,{
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        }).then(res => res.json()).
        then(data=>{
          if(data.error){
           sessionStorage.removeItem("token")
           sessionStorage.removeItem("user")
            navigate('/login')
            throw new Error(data.error)
          }
          console.log(data)
          setRestau(data)
          // Calculate total pages from totalNumRestaurants
          if (data.totalNumRestaurants) {
            setTotalPages(calculateTotalPages(data.totalNumRestaurants));
          }
          setLoading(false)
        })
        .catch(e=>{
          console.log(e)
          navigate('/login')
        })
      },[currentPage])
  // const {data: restaurants, isLoading, error} = useSuspenseQuery({
  //   queryKey: ["restaurants"],
  //   queryFn: () => fetch(`http://localhost:6200/restaurants`,{
  //     headers: {
  //       "Authorization": `Bearer ${sessionStorage.getItem("token")}`
  //     }
  //   }).then(res => res.json()).
  //   then(data=>{
  //     if(data.error){
  //       throw new Error(data.error)
  //     }
  //   })
  //   .catch(e=>{
  //     console.log(e)
  //     // navigate('/login')
  //   })
  // })

  const cuisines = [
    
    'Italian',
    'Chinese',
    'Japanese',
    'Indian',
    'Mexican',
    'American',
    'Thai',
    'Mediterranean',
    'Fast Food'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    // Reset to first page when searching
    fetch(`${import.meta.env.VITE_BACKEND_URL}/restaurants/?name=${filters.search}&cuisine=${filters.cuisine}&zipcode=${filters.zipcode}&page=1`,{
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    }).then(res => res.json()).
    then(data=>{
      if(data.error){
       sessionStorage.removeItem("token")
       sessionStorage.removeItem("user")
        navigate('/login')
        throw new Error(data.error)
      }
      setRestau(data)
      // Calculate total pages from totalNumRestaurants
      if (data.totalNumRestaurants) {
        setTotalPages(calculateTotalPages(data.totalNumRestaurants));
      }
      setLoading(false)
    })
    .catch(e=>{
      console.log("e")
      // navigate('/login')
    })
   
    // TODO: Implement API call with filters
    console.log('Filters:', filters);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // TODO: Implement API call with new page number
    console.log('Page changed to:', page);
  };

  // Generate page numbers to display - show first 5 pages and last page (max 20)
  const getPageNumbers = () => {
    const pages = [];
    const maxLastPage = 20;
    const actualLastPage = Math.min(totalPages, maxLastPage);
    
    if (actualLastPage <= 6) {
      // If total pages is 6 or less, show all pages
      for (let i = 1; i <= actualLastPage; i++) {
        pages.push(i);
      }
    } else {
      // Show first 5 pages and the last page with dots
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      
      // Add dots if there's a gap
      if (actualLastPage > 6) {
        pages.push('...');
      }
      
      // Add the last page (capped at 20)
      if (actualLastPage > 5) {
        pages.push(actualLastPage);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search Restaurants
              </label>
              <input
                type="text"
                name="search"
                id="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search by name..."
                className="mt-1 block w-full rounded-md text-black bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Cuisine Dropdown */}
            <div>
              <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                Cuisine Type
              </label>
              <select
                id="cuisine"
                name="cuisine"
                value={filters.cuisine}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md text-gray-700 bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Cuisines</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Zipcode Input */}
            <div>
              <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                Zipcode
              </label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                value={filters.zipcode}
                onChange={handleChange}
                placeholder="Enter zipcode..."
                className="mt-1 block w-full rounded-md text-black bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Restaurant Cards Grid */}
        {loading && <p className='text-black'>Loading...</p>}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Sample Restaurant Cards - Replace with actual data */}
          {restaurantz && restaurantz?.restaurantsList?.length>0 ? restaurantz?.restaurantsList?.map((restaurant) => {
            const address = `${restaurant.address.building} ${restaurant.address.street},${restaurant.address.zipcode}`;
            return (
            
            <div key={restaurant._id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Restaurant"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
                  4.5 ★
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                <p className="text-sm text-gray-500">{restaurant.cuisine} • $$ • 2.5 miles</p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-500">30-45 min</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{`${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode} `}</span>
                </div>
                <div className="mt-4">
                 <a href={`https://www.google.com/maps/place/${address}`} target='_blank' rel='noreferrer'> <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    View
                  </button></a>
                </div>
              </div>
            </div>
          )}): <p className='text-black'>No restaurants found</p>}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center">
          <nav className="flex items-center space-x-2" aria-label="Pagination">
            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Restaurant; 