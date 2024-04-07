import styled from "styled-components";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import { ContentWrapper, Img, Rating, Genres } from "./index";
import defaultImg from "../assets/no-image.png";

const Carousel = ({ data, loading, title, mediaType }) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();

  if (data?.length === 0) {
    return;
  }

  carouselContainer.current?.scrollTo({
    left: 0,
    behavior: "smooth",
  });

  const slideTo = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth - 30
        : container.scrollLeft + container.offsetWidth + 30;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeleton-item">
        <div className="poster-block skeleton"></div>
        <div className="text-block">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <ContentWrapper>
        {title && <div className="carousel-title">{title}</div>}
        {data?.length >= 5 && (
          <>
            <BsArrowLeftCircleFill
              className="carousel-left-nav arrow"
              onClick={() => slideTo("left")}
            />
            <BsArrowRightCircleFill
              className="carousel-right-nav arrow"
              onClick={() => slideTo("right")}
            />
          </>
        )}

        {!loading ? (
          <div
            className="carousel-items"
            ref={carouselContainer}
          >
            {data?.map((media) => {
              const {
                mal_id: id,
                title,
                images,
                score,
                genres,
              } = media?.entry || media;

              const src = images?.jpg?.large_image_url || defaultImg;
              const date = media?.aired?.string || media?.published?.string;

              const ind =
                date?.indexOf("to") >= 0 ? date?.indexOf("to") : date?.length;

              return (
                <div
                  key={id}
                  className="carousel-item"
                  onClick={() => navigate(`/${mediaType}/${id}`)}
                >
                  <div className="poster-block">
                    <Img src={src} />
                    {score && <Rating score={score} />}
                    <Genres data={genres?.slice(0, 2)} />
                  </div>

                  <div className="text-block">
                    <span className="title">{title}</span>
                    <span className="date">{date?.slice(0, ind)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loading-skeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 4rem;
  margin-top: 2rem;

  .carousel-title {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1.5rem;
    font-weight: normal;
  }

  .content-wrapper {
    position: relative;
  }

  .arrow {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    font-size: 1.75rem;
    cursor: pointer;
    z-index: 1;
    opacity: 0.6;
    display: none;

    @media screen and (min-width: 768px) {
      display: block;
    }
    &:hover {
      opacity: 1;
    }
  }

  .carousel-left-nav {
    left: -0.25rem;
  }
  .carousel-right-nav {
    right: -0.25rem;
  }

  .loading-skeleton {
    display: flex;
    gap: 10px;
    overflow-y: hidden;
    margin-right: -1rem;
    margin-left: -1rem;
    padding: 0 20px;

    @media screen and (min-width: 768px) {
      gap: 1.5rem;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }

    .skeleton-item {
      width: 125px;
      flex-shrink: 0;
      @media screen and (min-width: 768px) {
        width: 180px;
      }
      @media screen and (min-width: 900px) {
        width: 195px;
      }

      .poster-block {
        border-radius: 12px;
        width: 100%;
        aspect-ratio: 1 / 1.5;
        margin-bottom: 1rem;
      }

      .text-block {
        display: flex;
        flex-direction: column;
        .title {
          width: 100%;
          height: 20px;
          margin-bottom: 0.45rem;
        }
        .date {
          width: 75%;
          height: 20px;
        }
      }
    }
  }

  .carousel-items {
    display: flex;
    gap: 10px;
    overflow-y: hidden;
    margin-left: -1rem;
    margin-right: -1rem;
    padding: 0 20px;

    @media screen and (min-width: 768px) {
      gap: 1.5rem;
      overflow: hidden;
      padding: 0;
      margin: 0;
    }

    .carousel-item {
      width: 125px;
      cursor: pointer;
      flex-shrink: 0;

      @media screen and (min-width: 768px) {
        width: calc(25% - 15px);
      }
      @media screen and (min-width: 900px) {
        width: calc(20% - 16px);
      }

      .poster-block {
        width: 100%;
        position: relative;
        aspect-ratio: 1 / 1.5;
        background-size: cover;
        background-position: center;
        margin-bottom: 1rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 0.75rem;

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
        margin-top: 1.5rem;

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
    }
  }
`;
export default Carousel;
