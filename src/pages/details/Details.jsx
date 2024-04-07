import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./DetailsBanner";
import Character from "./Character";
import VideoSection from "./VideoSection";
import Recommendations from "./Recommendations";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data: characterData, loading } = useFetch(
    `/${mediaType}/${id}/characters`
  );
  const { data: videoData, loading: videoLoading } = useFetch(
    mediaType === "anime" ? `/${mediaType}/${id}/videos` : ""
  );

  return (
    <div>
      <DetailsBanner />
      {characterData && (
        <Character
          data={characterData.slice(0, 6)}
          loading={loading}
          mediaType={mediaType}
        />
      )}

      {mediaType === "anime" && (
        <VideoSection
          data={videoData}
          loading={videoLoading}
        />
      )}

      <Recommendations
        mediaType={mediaType}
        id={id}
      />
    </div>
  );
};
export default Details;
