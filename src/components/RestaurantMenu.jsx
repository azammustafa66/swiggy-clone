import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useRestaurantMenu from "../utils/useRestaurantMenu";
import MenuCategory from "./MenuCategory";
import MenuShimmer from "./Shimmer/MenuShimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [showIndex, setShowIndex] = useState(0);

  const restaurantInfo = useRestaurantMenu(resId);

  const { name, cuisines, costForTwoMessage, avgRating } =
    restaurantInfo?.cards[0]?.card?.card?.info || {};

  const categories =
    restaurantInfo?.cards[2].groupedCard.cardGroupMap.REGULAR.cards.filter(
      (card) =>
        card.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || {};

  // console.log(categories);

  return restaurantInfo === null ? (
    <MenuShimmer />
  ) : (
    <div className="text-center">
      <h1 className="font-bold my-6 text-3xl">{name}</h1>
      <Styledh3>{cuisines.join(", ")}</Styledh3>
      <Styledh3>{costForTwoMessage}</Styledh3>
      <Styledh3>{avgRating}</Styledh3>

      <div>
        {categories.map((category, index) => (
          <MenuCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            isExpanded={index === showIndex && true}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;

const Styledh3 = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;
