import styled from "styled-components";

const Genres = ({ data }) => {
  return (
    <Wrapper className="genres">
      {data?.map(({ mal_id: id, name }) => {
        return (
          <div
            className="genre"
            key={id}
          >
            {name}
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  
  .genre {
    background: #da2f68;
    padding: 3px 5px;
    font-size: 12px;
    border-radius: 4px;
    color: white;
    white-space: nowrap;
  }
`;
export default Genres;
