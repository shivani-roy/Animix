import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Rating = ({ score }) => {
  if (!score) return;

  return (
    <Wrapper className="circle-rating">
      <CircularProgressbar
        value={score}
        maxValue={10}
        text={score}
        styles={buildStyles({
          pathColor: score < 5 ? "red" : score < 7 ? "orange" : "green",
        })}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--black);
  padding: 2px;
  border-radius: 50%;

  .CircularProgressbar-text {
    font-size: 2rem;
    font-weight: 700;
    fill: white;
  }
  .CircularProgressbar-trail {
    stroke: transparent;
  }
`;
export default Rating;
