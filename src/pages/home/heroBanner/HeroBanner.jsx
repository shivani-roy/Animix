import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ContentWrapper, Img } from "../../../components";
import defaultImage from "../../../assets/defaultBg.png";
import axios from "axios";

const imageBaseUrl = "https://kitsu.io/api/edge";

const HeroBanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const fetchImgData = async () => {
    const check = localStorage.getItem("anime");

    if (check) {
      setData(JSON.parse(check));
    } else {
      setLoading(true);
      try {
        const response = await axios.get(
          `${imageBaseUrl}/trending/anime?limit=20`
        );
        const { data: result } = response.data;

        localStorage.setItem("anime", JSON.stringify(result));
        setData(result);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // console.log(data);
    fetchImgData();
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 20);
    const bgImg =
      data?.[randomIndex]?.attributes?.coverImage?.original || defaultImage;

    setBackgroundImg(bgImg);
    // console.log(randomIndex, bgImg);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    navigate("/search/" + query);
  };

  return (
    <Wrapper>
      {!loading && (
        <div className="img-container">
          <Img
            src={backgroundImg}
            className="img"
          />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="content">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Discover millions of anime and manga. <p>Explore now.</p>
          </span>

          <form
            className="search-input"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="search anime..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">search</button>
          </form>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 35rem;
  display: flex;
  align-items: center;
  position: relative;
  background: var(--black);

  @media screen and (min-width: 768px) {
    height: 45rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    letter-spacing: 1px;
    text-align: center;
    color: white;
    max-width: 800px;
    margin: 0 auto;
    /* border: 2px solid wheat; */

    .title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.15rem;
      margin-top: 2rem;

      @media screen and (min-width: 768px) {
        font-size: 4.5rem;
        margin-bottom: 0;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      font-weight: 400;
      margin-bottom: 2rem;

      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .search-input {
      display: flex;
      align-items: center;
      width: 100%;

      input {
        width: calc(100% - 6rem);
        height: 2.5rem;
        background: white;
        border: none;
        padding: 1rem;
        border-radius: 2rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        text-transform: capitalize;
        font-size: 1rem;
        outline: none;

        @media screen and (min-width: 768px) {
          height: 3.5rem;
          font-size: 1.25rem;
          padding: 0 2rem;
        }
      }

      button {
        width: 6rem;
        height: 2.5rem;
        text-transform: capitalize;
        /* padding: 0; */
        cursor: pointer;
        border: none;
        background: transparent;
        color: white;
        font-size: 1rem;
        border-top-right-radius: 2rem;
        border-bottom-right-radius: 2rem;

        /* background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%); */
        background-image: linear-gradient(-20deg, #c33764 0%, #ea8ed6 100%);

        @media screen and (min-width: 768px) {
          height: 3.5rem;
          width: 9rem;
          font-size: 1.25rem;
          font-size: 1.25rem;
        }
      }

      button:hover {
        background: #e690dc;
      }
    }
  }

  .img-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.4;
    overflow: hidden;

    .lazy-load-image-background {
      width: 100%;
      height: 100%;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  .opacity-layer {
    width: 100%;
    height: 15rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79%);
  }
`;
export default HeroBanner;
