import styled from "styled-components";
import { useState } from "react";
import { ContentWrapper, VideoPopup, Img } from "../../components";
import { PlayIcon } from "./PlayIcon";

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  if (data?.promo?.length === 0 && data?.music_videos?.length === 0) {
    return;
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <div className="section-heading">Official Videos</div>

        {!loading ? (
          <div className="videos">
            {data?.promo?.map(({ title, trailer }) => {
              const videoKey = trailer?.youtube_id;
              const image_url = trailer?.images?.large_image_url;

              if (videoKey === null) return;

              return (
                <div
                  key={videoKey}
                  className="video-item"
                  onClick={() => {
                    setShow(true);
                    setVideoId(videoKey);
                  }}
                >
                  <div className="video-thumbnail">
                    <Img
                      src={
                        image_url ||
                        `https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`
                      }
                    />

                    <PlayIcon />
                  </div>

                  <div className="video-title">{title}</div>

                  {/* <iframe
                    width="560"
                    height="315"
                    src={trailer.embed_url}
                    frameborder="0"
                    allowfullscreen
                  ></iframe> */}
                </div>
              );
            })}

            {data?.music_videos?.map(({ title, video }) => {
              const videoKey = video?.youtube_id;
              const image_url = video?.images?.large_image_url;

              if (videoKey === null) return;

              return (
                <div
                  key={videoKey}
                  className="video-item"
                  onClick={() => {
                    setShow(true);
                    setVideoId(videoKey);
                  }}
                >
                  <div className="video-thumbnail">
                    <Img
                      src={
                        image_url ||
                        `https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`
                      }
                    />

                    <PlayIcon />
                  </div>

                  <div className="video-title">{title}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="video-skeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;

  .section-heading {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1.5rem;
  }

  .videos {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    margin-left: -1.5px;
    margin-right: -1.5px;
    padding: 0 1.5px;

    @media screen and (min-width: 768px) {
      margin: 0;
      padding: 0;
      gap: 1.25rem;
    }

    .video-item {
      width: 10rem;
      flex-shrink: 0;
      cursor: pointer;

      @media screen and (min-width: 768px) {
        /* width: 25%; */
        width: 15rem;
      }

      .video-thumbnail {
        margin-bottom: 1rem;
        position: relative;
        /* border: 2px solid white; */

        img {
          display: block;
          width: 100%;
          min-height: 175px;
          border-radius: 12px;
          margin: 0 auto;
          /* border: 2px solid white; */
          transition: all 0.7s ease-in-out;
        }

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
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
          img {
            opacity: 0.5;
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

      .video-title {
        color: white;
        font-size: 15px;
        line-height: 20px;
        margin-top: -0.5rem;
        text-align: center;

        @media screen and (min-width: 768px) {
          font-size: 1rem;
          line-height: 24px;
        }
      }
    }
  }

  .video-skeleton {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    margin-left: -1.5px;
    margin-right: -1.5px;
    padding: 0 1.5px;

    @media screen and (min-width: 768px) {
      margin: 0;
      padding: 0;
      gap: 1.25rem;
    }

    .skItem {
      width: 12rem;
      flex-shrink: 0;

      @media screen and (min-width: 768px) {
        width: 25%;
      }

      .thumb {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 12px;
        margin-bottom: 10px;
      }

      .row {
        height: 20px;
        width: 100%;
        border-radius: 10px;
        margin-bottom: 10px;
      }

      .row2 {
        height: 20px;
        width: 75%;
        border-radius: 10px;
      }
    }
  }
`;
export default VideoSection;
