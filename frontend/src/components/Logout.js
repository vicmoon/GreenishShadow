// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Logout() {
//   const navigate = useNavigate();

//   // Function to handle logout
//   const handleLogout = async () => {
//     try {
//       // Send the logout request to the backend
//       const response = await fetch('http://localhost:9000/api/users/logout', {
//         method: 'GET',
//         credentials: 'include', // Include cookies for session handling
//       });

//       if (response.ok) {
//         // If logout is successful, redirect the user to the homepage or login page
//         window.location.href = '/';
//       } else {
//         console.error('Failed to log out');
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   // useEffect to handle logout as soon as the component loads
//   useEffect(() => {
//     handleLogout();
//   }, []); // Empty dependency array ensures this runs only once when the component is mounted

//   return (
//     <div>
//       <p>Logging out...</p>
//     </div>
//   );
// }

// export default Logout;
