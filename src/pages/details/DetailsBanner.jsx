import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

import {
  ContentWrapper,
  Genres,
  Rating,
  Img,
  VideoPopup,
} from "../../components";
import defaultImg from "../../assets/no-image.png";
import { PlayIcon } from "./PlayIcon";

const DetailsBanner = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // console.log(data?.synopsis.split('\n').join('<br/>'))
  // const newdata = data?.synopsis
  //   .split("\n")
  //   .map((item) => {
  //     if (item === "") return "\n";
  //     return item;
  //   })
  //   .join("\n");
  // console.log(newdata);

  return (
    <Wrapper>
      {!loading ? (
        <>
          {!!data && (
            <>
              <div>
                <div className="background-img">
                  <Img src={data.images?.jpg?.large_image_url} />
                </div>

                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      <Img
                        src={data.images?.jpg?.large_image_url || defaultImg}
                        className="poster-img"
                      />
                    </div>

                    <div className="right">
                      <div className="title">
                        {`${data.title} ${data.year ? `(${data.year})` : ""}`}
                      </div>

                      <div className="subtitle">{data.title_japanese}</div>

                      <Genres data={data.genres} />
                      <div className="row">
                        <Rating score={data.score} />

                        {data.trailer?.youtube_id ? (
                          <div
                            className="play-btn"
                            onClick={() => {
                              setShow(true);
                              setVideoId(data.trailer?.youtube_id);
                            }}
                          >
                            <PlayIcon />
                            <span className="text">Watch Trailer</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="overview">
                        {data?.synopsis && (
                          <div className="heading">Overview</div>
                        )}
                        <div className="description">
                          {data?.synopsis?.split("\n").map((item, ind) => {
                            if (item === "") return <br key={ind} />;
                            if (item === "[Written by MAL Rewrite]") return;
                            return <p key={ind}>{item}</p>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info">
                    {data.title_japanese && (
                      <div className="info-item">
                        <span className="text bold">Japanese: </span>
                        <span className="text"> {data.title_japanese}</span>
                      </div>
                    )}

                    {data.title_synonyms?.length > 0 && (
                      <div className="info-item">
                        <span className="text bold">Synonyms: </span>
                        <span className="text">
                          {" "}
                          {data.title_synonyms.map((item, ind) => {
                            return (
                              <span key={item}>
                                {ind === data.title_synonyms.length - 1
                                  ? item
                                  : `${item}, `}{" "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}

                    {data.aired?.string && (
                      <div className="info-item">
                        <span className="text bold">Aired: </span>
                        <span className="text"> {data.aired.string}</span>
                      </div>
                    )}

                    {data.published?.string && (
                      <div className="info-item">
                        <span className="text bold">Published: </span>
                        <span className="text"> {data.published.string}</span>
                      </div>
                    )}

                    {data.status && (
                      <div className="info-item">
                        <span className="text bold">Status: </span>
                        <span className="text"> {data.status}</span>
                      </div>
                    )}

                    {data.duration && (
                      <div className="info-item">
                        <span className="text bold">Duration: </span>
                        <span className="text"> {data.duration}</span>
                      </div>
                    )}

                    {data.studios?.length > 0 && (
                      <div className="info-item">
                        <span className="text bold">Studios: </span>
                        <span className="text">
                          {" "}
                          {data.studios.map(({ mal_id: id, name }, ind) => {
                            return (
                              <span key={id}>
                                {ind === data.studios.length - 1
                                  ? name
                                  : `${name}, `}{" "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}

                    {data.authors?.length > 0 && (
                      <div className="info-item">
                        <span className="text bold">Authors: </span>
                        <span className="text">
                          {" "}
                          {data.authors.map(({ mal_id: id, name }, ind) => {
                            return (
                              <span key={id}>
                                {ind === data.authors.length - 1
                                  ? name
                                  : `${name}, `}{" "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}

                    {data.demographics?.length > 0 && (
                      <div className="info-item">
                        <span className="text bold">Demographics: </span>
                        <span className="text">
                          {" "}
                          {data.demographics.map(
                            ({ mal_id: id, name }, ind) => {
                              return (
                                <span key={id}>
                                  {ind === data.demographics.length - 1
                                    ? name
                                    : `${name}, `}{" "}
                                </span>
                              );
                            }
                          )}
                        </span>
                      </div>
                    )}

                    {data.producers?.length > 0 && (
                      <div className="info-item">
                        <span className="text bold">Producers: </span>
                        <span className="text">
                          {" "}
                          {data.producers
                            .slice(0, 4)
                            .map(({ mal_id: id, name }, ind) => {
                              return (
                                <span key={id}>
                                  {ind === data.producers.length - 1 ||
                                  ind === 3
                                    ? name
                                    : `${name}, `}{" "}
                                </span>
                              );
                            })}
                        </span>
                      </div>
                    )}
                  </div>

                  <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
                </ContentWrapper>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="details-banner-skeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding-top: 8rem;
  margin-bottom: 3rem;
  background: rgba(96, 95, 95, 0.1);
  position: relative;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    padding-top: 9rem;
    min-height: 45rem;
  }

  .background-img {
    /* width: 100%;
    height: 100%; */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.1;
    overflow: hidden;
    filter: blur(15px);

    .lazy-load-image-background {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 25px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    @media screen and (min-width: 768px) {
      gap: 50px;
      flex-direction: row;
    }

    .left {
      flex-shrink: 0;

      .poster-img {
        width: 100%;
        display: block;
        border-radius: 12px;

        @media screen and (min-width: 768px) {
          max-width: 24rem;
        }
      }
    }

    .right {
      color: white;

      .title {
        font-size: 1.75rem;
        line-height: 2.5rem;
        margin-bottom: 5px;

        @media screen and (min-width: 768px) {
          font-size: 2rem;
          line-height: 2.85rem;
        }
      }

      .subtitle {
        font-size: 1rem;
        line-height: 1.25rem;
        margin-bottom: 1.2rem;
        opacity: 0.5;

        @media screen and (min-width: 768px) {
          font-size: 1.1rem;
          line-height: 1.5rem;
        }
      }

      .genres {
        margin-bottom: 1.5rem;
        flex-flow: wrap;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        margin-bottom: 1.75rem;
      }

      .overview {
        margin-bottom: 1.5rem;

        .heading {
          font-size: 1.5rem;
          margin-bottom: 0.7rem;
        }

        .description {
          opacity: 0.8;
          @media screen and (min-width: 768px) {
            padding-right: 3rem;
          }
        }
      }

      .circle-rating {
        max-width: 60px;
        background: var(--black2);

        @media screen and (min-width: 768px) {
          max-width: 70px;
        }

        .CircularProgressbar-text {
          fill: white;
        }
      }

      .play-btn {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;

        svg {
          width: 60px;
        }

        .text {
          font-size: 18px;
          transition: all 0.7s ease-in-out;
        }

        .triangle {
          stroke-dasharray: 240;
          stroke-dashoffset: 480;
          stroke: white;
          transform: translateY(0);
          transition: all 0.7s ease-in-out;
        }

        .circle {
          stroke: white;
          stroke-dasharray: 650;
          stroke-dashoffset: 1300;
          transition: all 0.5s ease-in-out;
        }

        &:hover {
          .text {
            color: var(--pink);
          }

          .triangle {
            stroke-dashoffset: 0;
            opacity: 1;
            stroke: var(--pink);
            animation: trailorPlay 0.7s ease-in-out;
          }

          .circle {
            stroke-dashoffset: 0;
            stroke: var(--pink);
          }
        }
      }
    }
  }

  .info {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    /* padding-bottom: 4rem; */
    .info-item {
      margin-bottom: 5px;
      display: flex;
    }

    .text {
      margin-right: 10px;
      opacity: 0.7;

      &.bold {
        font-weight: 600;
        opacity: 1;
      }
    }
  }

  .details-banner-skeleton {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 25px;

    @media screen and (min-width: 768px) {
      gap: 50px;
      flex-direction: row;
    }

    .content-wrapper {
      display: flex;
      gap: 50px;
    }

    .left {
      flex-shrink: 0;
      width: 100%;
      display: block;
      border-radius: 12px;
      aspect-ratio: 1/1.5;

      @media screen and (min-width: 768px) {
        max-width: 350px;
      }
    }

    .right {
      width: 100%;
      .row {
        width: 100%;
        height: 25px;
        margin-bottom: 20px;
        border-radius: 50px;

        &:nth-child(2) {
          width: 75%;
          margin-bottom: 50px;
        }
        &:nth-child(6) {
          width: 50%;
          margin-bottom: 50px;
        }
      }
    }
  }
`;
export default DetailsBanner;
