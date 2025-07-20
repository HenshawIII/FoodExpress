import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    profilePicture: user?.profilePicture || null
  });
  const [image,setImage] = useState(null);

  const navigate = useNavigate();

  // const imageURL = localStorage.getItem("imageURL");
  // const parsedImageURL = imageURL ? JSON.parse(imageURL) : null;

  const preview =(file) => {    
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData (prev => ({
          ...prev,
          profilePicture: reader.result
        }));
        console.log(formData.profilePicture)
      };
  }

  const handleNameChange = (e) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
     preview(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/update-profile`, {
        method: "POST",
        body: JSON.stringify({...formData, email: user.email}),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if(data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      toast.success(data.message);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      setUser(prev => ({
        ...prev,
        name: data.user.name,
        profilePicture: data.user.profilePicture
      }));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profile-picture"
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
                <p className="text-sm text-gray-500">
                  Upload a new profile picture. Recommended size: 400x400px
                </p>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                className="mt-1 block w-full rounded-md bg-white text-gray-900 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        {/* { parsedImageURL && <img src={parsedImageURL.image} alt="" />} */}
        </div>
      </div>
    </div>
  );
};

export default Profile; 