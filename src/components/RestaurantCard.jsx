import styled from "styled-components";
import PropTypes from "prop-types";

import { IMG_URL } from "../utils/url";
import { Card } from "react-bootstrap";

const RestaurantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  avgRating,
  costForTwo,
}) => {
  function truncateString(string, maxLength) {
    return string.length > maxLength
      ? string.slice(0, maxLength) + "..."
      : string;
  }

  const truncatedCuisines = truncateString(cuisines.join(", "), 25);
  const truncatedName = truncateString(name, 20);

  return (
    <StyledDiv>
      <Card className="p-2">
        <Card.Img
          variant="top"
          src={IMG_URL + cloudinaryImageId}
          className="rounded-lg w-72 h-44"
        />
        <Card.Body>
          <Card.Title>{truncatedName}</Card.Title>
          <Card.Text>{truncatedCuisines}</Card.Text>
          <Card.Text>Rating: {avgRating}</Card.Text>
          <Card.Text>{costForTwo}</Card.Text>
        </Card.Body>
      </Card>
    </StyledDiv>
  );
};

RestaurantCard.propTypes = {
  name: PropTypes.string.isRequired,
  cuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  cloudinaryImageId: PropTypes.string.isRequired,
  avgRating: PropTypes.number.isRequired,
  costForTwo: PropTypes.string.isRequired,
};

export default RestaurantCard;

export const isPromoted = (RestaurantCard) => {
  (props) => (
    <div>
      <label>Promoted</label>
      <RestaurantCard {...props} />
    </div>
  );
};

const StyledDiv = styled.div`
  width: 18rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  transition: all 0.2s ease;
  gap: 5px;

  &:hover {
    transform: scale(0.9);
    transition: all 0.2 ease-in;
  }
`;
