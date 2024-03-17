import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is correctly imported
import { verifyToken } from '../network/ApiAxios';

// Define the HOC
export function Auth(WrappedComponent) {
    // Return a functional component from the HOC
    return function WithAuthentication(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const navigate = useNavigate(); // Use the hook at the top level of the functional component

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            } else {
                verifyToken(token).then(response => {
                    if (response.success) {
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem('token'); // Token is invalid, remove it
                        navigate('/login'); // Redirect to login
                    }
                }).catch(() => {
                    // Handle verification failure, e.g., redirect to login
                    localStorage.removeItem('token');
                    navigate('/login');
                });
            }
        }, [navigate]); // Correct dependency array

        if (!isAuthenticated) {
            // Optionally, show a loading indicator or message here
            return <div>Verifying token...</div>;
        }

        // Pass all props to the wrapped component
        return <WrappedComponent {...props} />;
    };
}
