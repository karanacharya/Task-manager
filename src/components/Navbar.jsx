import React, { useEffect, useState } from "react"; // Import React
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuth } from '../context/AuthContext';



const Navbar = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const { logout,isAuthenticated,setisAuthenticated } = useAuth();
    const navigate = useNavigate();

    

    const handleLogout = async (e) => {
      e.preventDefault();
      await logout();
  
     navigate("/login");
     setisAuthenticated(false);
   // Trigger the effect manually after logout
    
   
  };

  // New function to check user authentication
  // const checkUserAuthentication = () => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;

  //   if (user) {
  //     console.log("User Present");
  //     setisAuthenticated(true);
  //   } else {
  //     console.log("User Absent");
  //     setisAuthenticated(false);
  //   }
  // };
    
    

    const toggleMenu= ()=>{
        !isMenuOpen?setisMenuOpen(true):setisMenuOpen(false);
    //    setisMenuOpen(true);
    }
    
  return (
    <nav className="bg-gray-800 p-4">
      {" "}
      {/* Navbar background and padding */}
      <div className="flex justify-between items-center">
        {" "}
        {/* Flex container for layout */}
        <div className="text-white text-lg">MyApp</div> {/* App name */}

        
        {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >
                Login
              </Link>
            </>
          )}




        <div className="md:hidden">
          {" "}
          {/* Hamburger menu for smaller screens */}
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>
      {/* Dropdown for mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >
                Login
              </Link>
            </>
          )}

          
        
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
