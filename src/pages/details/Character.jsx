import { ContentWrapper, Img } from "../../components/index";
import styled from "styled-components";

const Character = ({ data, loading, mediaType }) => {
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>

        <div>
          <div className="row skeleton"></div>
          <div className="row2 skeleton"></div>
        </div>
      </div>
    );
  };

  const findVa = (voice_actors) => {
    const jva = voice_actors?.find((va) => va?.language === "Japanese");

    let va_image, va_name, language;

    if (jva) {
      va_image = jva?.person?.images?.jpg?.image_url;
      va_name = jva?.person?.name;
      language = "Japanese";
    } else {
      va_image = voice_actors?.[0]?.person?.images?.jpg?.image_url;
      va_name = voice_actors?.[0]?.person?.name;
      language = voice_actors?.[0]?.language;
    }

    return { va_image, va_name, language };
  };

  if (data?.length === 0) {
    return;
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <div className="section-heading">
          {mediaType === "anime" ? "Characters and Voice Actors" : "Characters"}
        </div>

        {!loading ? (
          <div
            className={`list-items ${
              mediaType === "manga" ? "manga-list-items" : ""
            }`}
          >
            {data?.map(({ character, role, voice_actors }) => {
              const { mal_id: id, name } = character;
              const { image_url } = character?.images?.jpg;

              const { va_image, va_name, language } = findVa(voice_actors);

              return (
                <div
                  key={id}
                  className="list-item"
                >
                  <div className="character">
                    <Img src={image_url} />
                    <div className="character-detail">
                      <h4>{name}</h4>
                      <span>{role}</span>
                    </div>
                  </div>

                  <div className="voice-actor">
                    <div className="va-detail">
                      <h4>{va_name}</h4>
                      <span>{language}</span>
                    </div>
                    <Img src={va_image} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cast-skeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 3rem;
  margin-top: 2rem;

  .section-heading {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1.5rem;
  }

  .list-items {
    /* display: flex; */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.25rem;
    overflow-y: hidden;
    margin-right: -1.25rem;
    margin-left: -1.25rem;
    padding: 0 1.25rem;

    @media screen and (min-width: 768px) {
      margin: 0;
      padding: 0;
    }

    .list-item {
      color: white;
      display: flex;
      gap: 2rem;
      justify-content: space-between;
      align-items: center;
      min-height: 90px;
      height: auto;
      padding: 1rem;
      overflow: hidden;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);

      .character {
        display: flex;
        gap: 0.5rem;

        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          overflow: hidden;
        }

        .character-detail {
          text-align: left;

          h4 {
            font-size: 15px;
            line-height: 1.3em;
            font-weight: 500;
            overflow: hidden;
          }

          span {
            opacity: 0.6;
            font-size: 13px;
          }
        }
      }

      .voice-actor {
        display: flex;
        gap: 0.5rem;

        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          overflow: hidden;
        }

        .va-detail {
          text-align: right;

          h4 {
            font-size: 15px;
            line-height: 1.3em;
            font-weight: 500;
            overflow: hidden;
          }

          span {
            opacity: 0.6;
            font-size: 13px;
          }
        }
      }
    }
  }

  .manga-list-items {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* display: flex;
    flex-flow: wrap; */
    gap: 2rem;

    .list-item {
      min-width: 10rem;
      background: none;

      .character {
        width: 100%;
        display: flex;
        align-items: center;
        /* justify-content: center; */
        /* border: 2px solid white; */
      }

      .voice-actor {
        display: none;

        .va-detail {
          display: none;
        }
      }
    }
  }

  .cast-skeleton {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.25rem;
    overflow-y: hidden;
    margin-right: -1.25rem;
    margin-left: -1.25rem;
    padding: 0 1.25rem;

    @media screen and (min-width: 768px) {
      margin: 0;
      padding: 0;
    }

    .skItem {
      display: flex;
      gap: 1rem;
      align-items: center;
      min-height: 90px;
      height: auto;

      .circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }

      div {
        width: 75%;
        display: flex;
        flex-direction: column;
        /* align-items: flex-end; */
        /* border: 2px solid white; */

        .row {
          width: 75%;
          height: 10px;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .row2 {
          width: 50%;
          height: 10px;
          border-radius: 10px;
          margin: 0;
        }
      }
    }
  }
`;
export default Character;
