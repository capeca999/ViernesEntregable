import React from 'react';
//Aqui se deberian enseñar todas las tareas que tiene el usuario
const Taskmanager = ({ data }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            {data && (
                <div>
                    <p>Username: {data.username}</p>
                    <p>Email: {data.email}</p>
                </div>
            )}
            {!data && <p>No data available</p>}
        </div>
    );
};

export default Taskmanager;