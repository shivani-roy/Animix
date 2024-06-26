import styled from "styled-components";
import ReactPlayer from "react-player";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  return (
    <Wrapper className={`video-popup ${show ? "visible" : ""}`}>
      <div
        className="opacity-layer"
        onClick={hidePopup}
      ></div>

      <div className="video-player">
        <span
          className="close-btn"
          onClick={hidePopup}
        >
          Close
        </span>

        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  z-index: 9;

  .opacity-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(3.5px);
    -webkit-backdrop-filter: blur(3.5px);
    opacity: 0;
    transition: opacity 400ms;
  }

  .video-player {
    position: relative;
    width: 800px;
    aspect-ratio: 16 / 9;
    background-color: white;
    transform: scale(0.2);
    transition: transform 250ms;

    .close-btn {
      position: absolute;
      top: -30px;
      right: 0;
      color: white;
      cursor: pointer;
    }
  }

  &.visible {
    opacity: 1;
    visibility: visible;

    .opacity-layer {
      opacity: 1;
    }

    .video-player {
      transform: scale(1);
    }
  }
`;
export default VideoPopup;
