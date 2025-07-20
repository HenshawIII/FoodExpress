import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import toast from 'react-hot-toast';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');
    const error = params.get('error');

    if (error) {
      toast.error(decodeURIComponent(error));
      navigate('/login');
      return;
    }

    if (token) {
      sessionStorage.setItem('token', token);
    }
    if (user) {
      try {
        const userObj = JSON.parse(decodeURIComponent(user));
        setUser(userObj);
        sessionStorage.setItem('user', JSON.stringify(userObj));
      } catch (e) {
        toast.error('Failed to parse user info.');
      }
    }
    // Redirect to home or wherever you want
    navigate('/');
  }, [navigate, setUser]);

  return <div>Signing you in...</div>;
};

export default OAuthCallback;