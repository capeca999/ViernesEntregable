import React from 'react';
import { useLocation } from 'react-router-dom';

const Taskmanager = () => {
    const location = useLocation();
    const { data } = location.state || {};

    return (
        <div>
            <h1>Dashboard</h1>
            {data ? (
                <div>
                    <p>Username: {data.username}</p>
                    <p>Email: {data.email}</p>
                    {/* Render other data as needed */}
                </div>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default Taskmanager;