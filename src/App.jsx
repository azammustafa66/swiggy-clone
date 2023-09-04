import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import UserContext from "./utils/userContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

/**
 *
 * Header
 *    - Logo
 *    - Nav-items
 * Body
 *    - Search
 *    - Restaurants finder
 *       - IMG
 *       - Name of the Res, Star Rating, Cuisine, delivery time
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact
 *
 **/

const App = () => {
  // auth code written
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // auth api call and send user name and necessary info
    const data = {
      name: "Azam Mustufa",
    };
    setUserName(data.name);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="flex flex-col h-screen gap-6">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default App;
