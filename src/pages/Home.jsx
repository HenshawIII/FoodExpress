import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Subscribe from '../components/Subscribe';
import Features from '../components/Features';
import CircularGallery from '../components/CircularGallery';
import sushi from "../assets/sushi.png";
import pizza from "../assets/pizza.png";
import burger from "../assets/burger.png";
import pasta from "../assets/pasta.png";
import salad from "../assets/salad.png";
import dessert from "../assets/desserts.png";
import drinks from "../assets/drinks.png";
import lunch from "../assets/lunch.webp";
import buffet from "../assets/buffet.png";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative h-screen">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0">
          {/* <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Food spread"
          /> */}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Delicious Food Delivered To Your Doorstep
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-100 max-w-2xl">
            Order from your favorite restaurants and get your food delivered in minutes. 
            Enjoy the best food delivery experience with us.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get started
                </Link>
                <Link to="/login" className="text-sm font-semibold leading-6 text-white hover:text-gray-300 hover:bg-blue-700 rounded-md px-3.5 py-2.5">
                  Sign in <span aria-hidden="true">→</span>
                </Link>
              </>
            ) : (
              <div className="mt-3 flex flex-nowrap  min-w-[30vw] sm:mt-0 sm:ml-3">
                <Link
                  to="/restaurants"
                  className="w-[100%] flex items-center flex-nowrap justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
                >
                  Explore Restaurants
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Features />
      {/* Rest of the content */}
      <div style={{ height: '600px', position: 'relative' }} className='hidden md:block'>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.005}/>
      </div>
      <div className='md:hidden flex overflow-x-auto space-x-4 px-4 py-4 max-h-[220px] scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100'>
        <img src={sushi} alt="sushi" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
        <img src={pizza} alt="pizza" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
        <img src={burger} alt="burger" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
        <img src={pasta} alt="pasta" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
        <img src={salad} alt="salad" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
        <img src={dessert} alt="dessert" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
        <img src={drinks} alt="drinks" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
        <img src={lunch} alt="lunch" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
        <img src={buffet} alt="buffet" className='h-40 w-40 min-w-[10rem] object-cover rounded-xl shadow-md transition-transform duration-200 hover:scale-105' />
      </div>
      <Subscribe />
     
    </div>
  );
};

export default Home; 