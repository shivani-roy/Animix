import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/fetchData";
import InfiniteScroll from "react-infinite-scroll-component";
import { nanoid } from "nanoid";
import styled from "styled-components";

import { ContentWrapper, Spinner, Card } from "../components";

const SearchResult = () => {
  const [searchdata, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  // const page = useRef(1);

  const { query } = useParams();

  const fetchSearchData = async () => {
    setLoading(true);

    try {
      const result = await fetchData(
        `/anime?q=${query}&sfw=true&genres_exclude=9,49,12`
      );

      setSearchData(result);
      // page.current = page.current + 1;
      setPageNum((prev) => prev + 1);
      setLoading(false);
      console.log(result);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchNextPageData = async () => {
    try {
      // const result = await fetchData(
      //   `/anime?q=${query}&sfw=true&page=${page.current}`
      // );

      const result = await fetchData(
        `/anime?q=${query}&sfw=true&page=${pageNum}&genres_exclude=9,49,12`
      );

      if (searchdata?.data) {
        setSearchData({
          ...searchdata,
          data: [...searchdata.data, ...result.data],
        });
        console.log(searchdata);
      } else {
        setSearchData(result);
      }

      // page.current = page.current + 1;
      setPageNum((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // page.current = 1;
    // console.log(page.current);
    setPageNum(1);
    fetchSearchData();
  }, [query]);

  return (
    <Wrapper>
      {loading && <Spinner initial={true} />}

      {!loading && (
        <ContentWrapper>
          {searchdata?.data?.length > 0 ? (
            <>
              <div className="page-title">
                {`Search ${
                  searchdata?.data?.length > 1 ? "results" : "result"
                } for - ${query}`}
              </div>

              <InfiniteScroll
                className="content"
                dataLength={searchdata?.data?.length || []}
                next={fetchNextPageData}
                hasMore={
                  // page.current <= searchdata?.pagination?.last_visible_page
                  pageNum <= searchdata?.pagination?.last_visible_page
                }
                loader={<Spinner />}
              >
                {searchdata?.data?.map((item) => {
                  const id = nanoid();

                  return (
                    <Card
                      key={id}
                      data={item}
                      fromSearch={true}
                      mediaType={item.type}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="result-not-found">Sorry, Results not Found!</span>
          )}
        </ContentWrapper>
      )}
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

  .page-title {
    font-size: 1.5rem;
    line-height: 2rem;
    color: white;
    margin-bottom: 2.5rem;
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
export default SearchResult;
