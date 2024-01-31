import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './card'

const Home = () => {
  const [user, setUser] = useState(null);
  const [userRides, setUserRides] = useState([]);
  const [allRidesOfType, setAllRidesOfType] = useState([]);
  const [selectedRideType, setSelectedRideType] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'
      } else {
        try {
          const { data } = await axios.get('https://ardino-server-production.up.railway.app/home', {
            headers: {
              authorization: `${token}`,
            },
          })
          if (!data.success) {
            window.location.href = '/login'
          } else {
            setUser({
              name: data.name,
              email: data.email,
              numberOfRides: data.numberOfRides
            });
          }
        } catch (error) {
          console.log(error);
          window.location.href = '/login';
        }
        try {
          const { data } = await axios.get('https://ardino-server-production.up.railway.app/userRides', {
            headers: {
              authorization: `${token}`,
            },
          })
          setUserRides(data.rides)
        } catch (error) {
          console.log(error);
        }
      }
    }
    checkToken();
  }, []);

  const fetchAllRidesOfType = async (rideID) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`https://ardino-server-production.up.railway.app/allRides`, 
      {rideID: rideID},
      {
        headers: {
          authorization: `${token}`,
        },
      });
      setAllRidesOfType(response.data.rides);
    } catch (error) {
      console.error('Error fetching rides of the same type:', error);
    }
  };

  const handleCardClick = (rideType) => {
    setSelectedRideType(rideType);
    fetchAllRidesOfType(rideType);
  };


  return (
    <div className="container mx-auto mt-10">
      {user ? (
        <header className="text-black py-8 text-center mb-5">
          <h1 className="text-4xl font-bold">Hi {user.name}</h1>
          <p className="text-lg mt-4">Welcome to our platform </p>
        </header>
      ) : (
        <div>
          <p className="text-xl mb-4">Please login or sign up to access the home page.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => window.location.href = '/signup'}
          >
            Sign Up
          </button>
        </div>
      )}
      <div>
        {user && userRides.length > 0 ? (
          <div>
            {userRides.map((ride) => (
              <Card
                key={ride._id}
                startingLocation={ride.startingLocation}
                destinationLocation={ride.destinationLocation}
                timeTakenInMin={ride.timeTakenInMin}
                potHoles={ride.potHoles}
                animal={ride.animal}
                onClick={() => handleCardClick(ride._id)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            {!user && <p className="text-gray-600">Loading user data...</p>}
            {user && userRides.length === 0 && (
              <p className="text-red-500 font-bold">No rides found for the user.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
