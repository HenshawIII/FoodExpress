import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurant from './pages/Restaurant';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import { UserProvider } from './context/UserContext.jsx';
import { UserContext } from './context/UserContext.jsx';
import { useContext } from 'react';
import OAuthCallback from './pages/OAuthCallback';
import PasswordReset from './pages/PasswordReset';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: false,
      },
    },
  }
);

function App() {
  
  const {user} = useContext(UserContext);
  // console.log(user)
  return (
    <QueryClientProvider client={queryClient}>
      
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col w-[100vw]">
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> :  <Register />} />
            <Route path="/restaurants" element={user ? <Restaurant /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route path="/reset-password/:token" element={<PasswordReset />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
    
    </QueryClientProvider>
  );
}

export default App;
