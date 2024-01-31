import React from 'react';

const Card = ({ startingLocation, destinationLocation, timeTakenInMin, potHoles, animal, onClick }) => {
    return (
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-md rounded-md p-6 mb-6">
            <h2 className="text-3xl font-extrabold mb-4">{destinationLocation}</h2>
            <div className="flex flex-col text-lg">
                <p>
                    <span className="font-bold text-gray-300">Starting Location:</span> {startingLocation}
                </p>
                <p>
                    <span className="font-bold text-gray-300">Time Taken:</span> {timeTakenInMin + " mins"}
                </p>
                <p>
                    <span className="font-bold text-gray-300">Number of Portholes: </span> {potHoles}
                </p>
                <p>
                    <span className="font-bold text-gray-300">Number of Animals: </span> {animal}
                </p>
            </div>
            <button
                onClick={onClick}
                className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-pink"
            >
                View Details
            </button>
        </div>
    );
};

export default Card;
