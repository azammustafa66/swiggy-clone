import Placeholder from "react-bootstrap/Placeholder";
import styled from "styled-components";

const MenuShimmer = () => {
  return (
    <Wrapper className="border-b-[10px] border-gray-300">
      <div className="text-center">
        <Placeholder as="h3" animation="glow">
          <Placeholder xs={2} />
        </Placeholder>
        <Placeholder as="h3" animation="glow">
          <Placeholder xs={5} />
        </Placeholder>
        <Placeholder as="h3" animation="glow">
          <Placeholder xs={5} />
        </Placeholder>
        <Placeholder as="h3" animation="glow">
          <Placeholder xs={1} />
        </Placeholder>
      </div>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
      <Placeholder as="p" animation="wave">
        <Placeholder xs={12} />
      </Placeholder>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  margin: 1.75rem auto;
  padding: 5px;
  cursor: pointer;
`;

export default MenuShimmer;
