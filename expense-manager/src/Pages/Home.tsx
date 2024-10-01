import React from "react";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Application!</h1>
                <p className="text-lg text-gray-600">
                    This is the home page. Explore our features and services!
                </p>
                <a href="/about" className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Learn More
                </a>
            </div>
        </div>
    );
};

export default Home;
