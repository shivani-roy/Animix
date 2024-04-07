import styled from "styled-components";

const ContentWrapper = ({ children }) => {
  return <Wrapper className="content-wrapper">{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.2rem;
`;
export default ContentWrapper;
