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
        { rideID: rideID },
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
          <p className="text-lg mt-4">DRIVE SAFE  ARRIVE ALIVE </p>
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
          onClick={() => window.location.href = '/new'}
          >
            Add a Ride
          </button>
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
            {selectedRideType ? (
              <div>
                {allRidesOfType.map((ride, index) => (
                  <React.Fragment key={ride._id}>
                    <Card
                      startingLocation={ride.startingLocation}
                      destinationLocation={ride.destinationLocation}
                      timeTakenInMin={ride.timeTakenInMin}
                      potHoles={ride.potHoles}
                      animal={ride.animal}
                      onClick={() => handleCardClick(ride._id)}
                    />
                    {index === 0 && (
                      <div>
                        <img
                          src="https://i.stack.imgur.com/HILmr.png"
                          alt="Google map"
                          className="rounded-md shadow-md mt-5 mb-5 mx-auto"
                        />
                        <p className="text-lg font-bold mt-4">Other rides of similar destination</p>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
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
            )}
            {selectedRideType && (
              <table className="mt-4 border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Starting Location</th>
                    <th className="border border-gray-400 px-4 py-2">Destination Location</th>
                    <th className="border border-gray-400 px-4 py-2">Time Taken</th>
                    <th className="border border-gray-400 px-4 py-2">Number of Potholes</th>
                    <th className="border border-gray-400 px-4 py-2">Number of Animals</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRideType ? (
                    allRidesOfType.map((ride) => (
                      <tr key={ride._id}>
                        <td className="border border-gray-400 px-4 py-2">{ride.startingLocation}</td>
                        <td className="border border-gray-400 px-4 py-2">{ride.destinationLocation}</td>
                        <td className="border border-gray-400 px-4 py-2">{ride.timeTakenInMin} mins</td>
                        <td className="border border-gray-400 px-4 py-2">{ride.potHoles}</td>
                        <td className="border border-gray-400 px-4 py-2">{ride.animal}</td>
                      </tr>
                    ))
                  ) : (
                    userRides.map((ride) => (
                      <tr key={ride._id}>
                        <td className="border border-gray-400 px-4 py-2">{ride.startingLocation}</td>
                        <td className="border border-gray-400 px-4 py-2">{ride.destinationLocation}</td>
                        <td className="border border-gray-400 px-4 py-2">{ride.timeTakenInMin} mins</td>
                        <td className="border border-gray-400 px-4 py-2">{ride.potHoles}</td>
                        <td className="border border-gray-400 px-4 py-2">{ride.animal}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

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
