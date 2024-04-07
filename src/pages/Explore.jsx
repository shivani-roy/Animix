import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import { nanoid } from "nanoid";

import useFetch from "../hooks/useFetch";
import { fetchData } from "../utils/fetchData";
import { ContentWrapper, Spinner, Card } from "../components";

let filters = {};

const sortByData = [
  { value: "popularity.asc", label: "Most Popular" },
  { value: "title.asc", label: "Name (A-Z)" },
  { value: "favorites.desc", label: "Most Favorites" },
  { value: "score.desc", label: "Best Score" },
  { value: "end_date.desc", label: "Recently Updated" },
  { value: "start_date.desc", label: "Release Date" },
];

const Explore = () => {
  const [exploreData, setExploreData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const { mediaType } = useParams();
  const { data: genreData } = useFetch(`/genres/${mediaType}`);

  // console.log(filters);

  const fetchExploreData = async () => {
    setLoading(true);

    try {
      const result = await fetchData(
        `/${mediaType}?sfw=true&page=1&genres_exclude=9,49,12`,
        filters
      );

      setExploreData(result);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchNextPageData = async () => {
    try {
      if (exploreData?.data) {
        const result = await fetchData(
          `/${mediaType}?sfw=true&page=${pageNum}&genres_exclude=9,49,12`,
          filters
        );

        setExploreData({
          ...exploreData,
          data: [...exploreData.data, ...result.data],
        });

        console.log(exploreData);
      } else {
        setData(result);
      }
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filters = {};
    setExploreData(null);
    setPageNum(1);
    setSortBy(null);
    setGenres(null);
    fetchExploreData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortBy") {
      setSortBy(selectedItems);

      if (action.action !== "clear") {
        const [order, sort] = selectedItems.value.split(".");
        console.log(order, sort);
        filters.order_by = order;
        filters.sort = sort;
      } else {
        delete filters.order_by;
        delete filters.sort;
      }
    }

    console.log(selectedItems);
    if (action.name === "genres") {
      setGenres(selectedItems);

      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.mal_id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.genres = genreId;
      } else {
        delete filters.genres;
      }
    }

    setPageNum(1);
    fetchExploreData();
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <div className="page-header">
          <div className="page-title">
            {mediaType === "anime" ? "Explore Anime" : "Explore Manga"}
          </div>

          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genres}
              closeMenuOnSelect={false}
              options={genreData}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.mal_id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />

            <Select
              name="sortBy"
              value={sortBy}
              options={sortByData}
              onChange={onChange}
              isClearable={true}
              // menuIsOpen={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {loading && <Spinner initial={true} />}

        {!loading && (
          <>
            {exploreData?.data?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={exploreData?.data?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= exploreData?.pagination?.last_visible_page}
                loader={<Spinner />}
              >
                {exploreData?.data?.map((item) => {
                  const id = nanoid();

                  return (
                    <Card
                      key={id}
                      data={item}
                      fromSearch={false}
                      mediaType={mediaType}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="result-not-found">
                Sorry, Results not Found!
              </span>
            )}
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 45rem;
  padding-top: 8rem;

  .result-not-found {
    font-size: 1.5rem;
    line-height: 34px;
    color: white;
    margin-bottom: 25px;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 2.5rem;

    @media screen and (min-width: 768px) {
      flex-direction: row;
    }
  }

  .page-title {
    font-size: 1.5rem;
    line-height: 2rem;
    color: white;
    margin-bottom: 1.25rem;

    @media screen and (min-width: 768px) {
      margin-bottom: 0;
    }
  }

  .filters {
    display: flex;
    gap: 0.85rem;
    flex-direction: column;

    @media screen and (min-width: 768px) {
      flex-direction: row;
    }

    .react-select-container {
      color: black;

      &.genresDD {
        width: 100%;

        @media screen and (min-width: 768px) {
          max-width: 30rem;
          min-width: 15rem;
        }
      }

      &.sortbyDD {
        width: 100%;
        flex-shrink: 0;

        @media screen and (min-width: 768px) {
          width: 15rem;
        }
      }

      .react-select__control {
        cursor: pointer;
        border: 0;
        outline: 0;
        box-shadow: none;
        background-color: #fcfafb;
        color: black;
        font-weight: 500;

        .react-select__value-container {
          .react-select__placeholder,
          .react-select__input-container {
            color: black;
            margin: 0 10px;
          }
        }

        .react-select__single-value {
          color: black;
        }
        .react-select__input {
          color: black;
        }
      }

      .react-select__menu {
        top: 40px;
        margin: 0;
        padding: 0;
        cursor: pointer;

        .react-select__option {
          cursor: pointer;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-flow: row wrap;
    gap: 1.25rem;
    margin-bottom: 50px;

    .card {
      .poster-block {
        margin-bottom: 20px;
      }
    }
  }
`;
export default Explore;
