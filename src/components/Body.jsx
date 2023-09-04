import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import RestaurantCard, { isPromoted } from "./RestaurantCard";
import useOnlineStatus from "../utils/useOnlineStatus";
import CardShimmer from "./Shimmer/CardShimmer";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const RestaurantCardPromoted = isPromoted(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9970483&lng=77.61440759999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    console.log(json.data.cards[2]);

    setRestaurantList(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // console.log(
    //   json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>Looks like you are offline!! Please check your status</h1>;
  }

  const topRatedRestaurants = () => {
    const filteredList = filteredRestaurant.filter(
      (restaurant) => restaurant.info.avgRating >= 4.2
    );

    setFilteredRestaurants(filteredList);
  };

  const changeHandler = (searchTermInput) => {
    setSearchTerm(searchTermInput);
    searchFilter();
  };

  const searchFilter = () => {
    const filteredResults = restaurantList.filter(
      (restaurant) =>
        restaurant.info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.info.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    setFilteredRestaurants(filteredResults);
  };

  const sortLowToHigh = () => {
    const sortedData = [...filteredRestaurant].sort(
      (a, b) =>
        parseInt(a.info.costForTwo.match(/\d+/)[0]) -
        parseInt(b.info.costForTwo.match(/\d+/)[0])
    );

    setFilteredRestaurants(sortedData);
  };

  const sortHighToLow = () => {
    const sortedData = [...filteredRestaurant].sort(
      (a, b) =>
        parseInt(b.info.costForTwo.match(/\d+/)[0]) -
        parseInt(a.info.costForTwo.match(/\d+/)[0])
    );

    setFilteredRestaurants(sortedData);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="">
          <input
            type="text"
            className="search-box w-full h-8 px-3 border-2 border-gray-500 rounded-lg outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => changeHandler(event.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button onClick={topRatedRestaurants}>Top rated</Button>
          <Button onClick={sortLowToHigh}>Sort Low to High</Button>
          <Button onClick={sortHighToLow}>Sort High to Low</Button>
        </div>
      </div>
      {filteredRestaurant?.length === 0 ? (
        <div className="flex flex-1 flex-wrap items-center justify-center gap-6">
          <CardShimmer />
        </div>
      ) : (
        <div className="flex flex-1 flex-wrap items-center justify-center gap-6">
          {filteredRestaurant?.map((restaurant) => (
            <StyledLink
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              {restaurant.info.promoted ? (
                <RestaurantCardPromoted {...restaurant.info} />
              ) : (
                <RestaurantCard {...restaurant.info} />
              )}
            </StyledLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;

const Button = styled.button`
  all: unset;
  padding: 10px;
  border-radius: 8px;
  background-color: #ffb23e;
  color: #fff;

  &:hover {
    background-color: #d5ad80;
    cursor: pointer;
  }
`;

export const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  border-radius: 5px;
  width: 300px;
  transition: background-color 0.2s ease;
  color: inherit;
`;
