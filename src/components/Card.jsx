import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Img, Rating, Genres } from "./index";
import defaultImg from "../assets/no-image.png";

const Card = ({ data, fromSearch, mediaType }) => {
  const navigate = useNavigate();
  const src = data.images?.jpg?.large_image_url || defaultImg;
  const date = data.aired?.string || data.published?.string;
  const ind = date?.indexOf("to") >= 0 ? date?.indexOf("to") : date?.length;

  let media;
  if (mediaType === "manga" || mediaType === "Manga") {
    media = "manga";
  } else {
    media = "anime";
  }

  return (
    <Wrapper
      onClick={() => navigate(`/${media}/${data.mal_id}`)}
      className="card"
    >
      <div className="poster-block">
        <Img
          className="poster-img"
          src={src}
        />

        {!fromSearch && (
          <>
            <Rating score={data.score} />
            <Genres data={data.genres?.slice(0, 2)} />
          </>
        )}
      </div>

      <div className="text-block">
        <span className="title">{data.title} </span>
        <span className="date">{date?.slice(0, ind)}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(50% - 15px);
  margin-bottom: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;

  @media screen and (min-width: 768px) {
    width: calc(25% - 15px);
  }

  @media screen and (min-width: 992px) {
    width: calc(20% - 16px);
  }

  .poster-block {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1.5;
    background-size: cover;
    background-position: center;
    margin-bottom: 2rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0.75rem;
    transition: all ease 0.5s;

    .lazy-load-image-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .circle-rating {
      width: 40px;
      height: 40px;
      position: relative;
      bottom: 0;
      left: -5px;
      flex-shrink: 0;

      @media screen and (min-width: 768px) {
        width: 50px;
        height: 50px;
      }
    }

    .genres {
      display: none;
      position: relative;

      @media screen and (min-width: 768px) {
        display: flex;
        flex-flow: wrap;
        justify-content: flex-end;
      }
    }
  }

  .text-block {
    color: white;
    display: flex;
    flex-direction: column;
    /* margin-top: 1.5rem; */

    .title {
      font-size: 1rem;
      margin-bottom: 0.45rem;
      line-height: 1.3rem;
    }

    .date {
      font-size: 0.75rem;
      opacity: 0.5;
    }
  }

  &:hover {
    .poster-block {
      opacity: 0.5;
    }
  }
`;
export default Card;
