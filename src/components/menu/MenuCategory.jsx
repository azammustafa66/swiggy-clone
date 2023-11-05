import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";

import ItemList from "./ItemList";

const MenuCategory = ({ data, isExpanded, setShowIndex }) => {
  const [showItems, setShowItems] = useState(false);
  // console.log(data);
  const handleClick = function () {
    setShowIndex();
    setShowItems(!showItems);
  };

  return (
    <Wrapper className="border-b-[10px] border-gray-300" onClick={handleClick}>
      <Header>
        <p className="font-bold">
          {data?.title} ({data?.itemCards.length})
        </p>
        <p>
          {isExpanded && showItems ? <PiCaretUpBold /> : <PiCaretDownBold />}
        </p>
      </Header>
      <div>
        {isExpanded && showItems && <ItemList items={data?.itemCards} />}
      </div>
    </Wrapper>
  );
};

MenuCategory.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    itemCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  setShowIndex: PropTypes.func.isRequired,
};

export default MenuCategory;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  gap: 12px;
  background-color: #fff;
  margin: 1.75rem auto;
  padding: 5px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
`;
