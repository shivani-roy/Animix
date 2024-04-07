import { Carousel } from "../../components";
import useFetch from "../../hooks/useFetch";

const Recommendations = ({ mediaType, id }) => {
  const { data, loading } = useFetch(
    `/${mediaType}/${id}/recommendations?sfw=true&genres_exclude=9,49,12`
  );

  // console.log(data);
  const title =
    mediaType === "anime" ? "Recommended Anime" : "Recommended Manga";

  if (!data) return;

  return (
    <Carousel
      data={data?.slice(0, 25)}
      loading={loading}
      title={title}
      mediaType={mediaType}
    />
  );
};
export default Recommendations;
