import styled from "styled-components";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";

import {
  ContentWrapper,
  SwitchTabs,
  Carousel,
} from "../../../components";

const TopRated = () => {
  const [media, setMedia] = useState("anime");

  const { data, loading } = useFetch(
    `/top/${media}?sfw=true&genres_exclude=9,49,12`
  );

  const onTabChange = (tab) => {
    setMedia(tab === "anime" ? "anime" : "manga");
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <span className="carousel-title">Top Rated</span>
        <SwitchTabs
          data={["anime", "manga"]}
          onTabChange={onTabChange}
        />
      </ContentWrapper>

      <Carousel
        data={data}
        loading={loading}
        mediaType={media}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;
  /* margin-top: 2rem; */

  .content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .carousel-title {
    font-size: 1.25rem;
    font-weight: 400;
  }
`;
export default TopRated;
