import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";

import logo from "../assets/logo.jpg";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";

export const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const [btnState, setBtnState] = useState("Login");
  const [login, setLogin] = useState(true);
  const onlineStatus = useOnlineStatus();

  // If dependency array is not provided then useEffect will be called on every render
  // If dependency array is empty then useEffect will be called only once
  // If dependency array is not empty then useEffect will be called only when state of that component is changed
  useEffect(() => {}, [btnState]);

  const handleClick = () => {
    login ? setBtnState("Logout") : setBtnState("Login");

    setLogin(!login);
  };

  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  return (
    <nav className="flex items-center justify-between border-black">
      <div>
        <Link to={"/"}>
          <img src={logo} width={200} alt="" />
        </Link>
      </div>
      <div className="nav-items">
        <ul className="flex items-center list-none font-base pr-4 cursor-pointer">
          <ListItem>Online Status {onlineStatus ? "🟢" : "🔴"}</ListItem>
          <ListItem>
            <Link to={"/"}>Home</Link>
          </ListItem>
          <ListItem>
            <Link to={"/about"}>About Us</Link>
          </ListItem>
          <ListItem>
            <Link to={"/contact-us"}>Contact us</Link>
          </ListItem>
          <ListItem>
            <Link to={"/cart"}>
              <div className="relative text-right">
                <AiOutlineShoppingCart size={25} />
                <StyledP>{cartItems.length}</StyledP>
              </div>
            </Link>
          </ListItem>
          <ListItem>
            <Link to={"/grocery"}>Grocery</Link>
          </ListItem>
          <ListItem>
            <button
              className="text-white rounded-md text-center w-14 bg-orange-300"
              onClick={handleClick}
            >
              {btnState}
            </button>
          </ListItem>
          <ListItem>{loggedInUser}</ListItem>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

const ListItem = styled.li`
  padding: 20px;
  margin-left: 10px;
`;

const StyledP = styled.p`
  background-color: red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: absolute;
  top: -15px;
  left: 80%;
  padding: 3px 8px;
`;
