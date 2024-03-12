import React, { useState } from "react";
import axios from "axios";

function AddRide() {
    const token = localStorage.getItem("token");
    if(!token) window.location.href = "/login";
    const [formData, setFormData] = useState({
        startingLocation: "",
        destinationLocation: "",
        timeTakenInMin: "",
        potHoles: "",
        animal: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://ardino-server-production-2582.up.railway.app/admin/create", formData, {
                headers: {
                    authorization: `${token}`,
                },
            });
            setFormData({
                startingLocation: "",
                destinationLocation: "",
                timeTakenInMin: "",
                potHoles: "",
                animal: "",
            });
            setMessage("Ride added successfully!");
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Add Ride</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="startingLocation" className="block text-sm font-medium text-gray-600">
                            Starting Location
                        </label>
                        <input
                            type="text"
                            id="startingLocation"
                            name="startingLocation"
                            value={formData.startingLocation}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="destinationLocation" className="block text-sm font-medium text-gray-600">
                            Destination Location
                        </label>
                        <input
                            type="text"
                            id="destinationLocation"
                            name="destinationLocation"
                            value={formData.destinationLocation}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="timeTakenInMin" className="block text-sm font-medium text-gray-600">
                            Time Taken (in minutes)
                        </label>
                        <input
                            type="number"
                            id="timeTakenInMin"
                            name="timeTakenInMin"
                            value={formData.timeTakenInMin}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="potHoles" className="block text-sm font-medium text-gray-600">
                            Pot Holes
                        </label>
                        <input
                            type="number"
                            id="potHoles"
                            name="potHoles"
                            value={formData.potHoles}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="animal" className="block text-sm font-medium text-gray-600">
                            Animal
                        </label>
                        <input
                            type="text"
                            id="animal"
                            name="animal"
                            value={formData.animal}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Add Ride
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 text-sm ${message.includes("error") ? "text-red-600" : "text-green-600"}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddRide;
