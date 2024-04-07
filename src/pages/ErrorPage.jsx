import styled from "styled-components";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/404.svg";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img
            src={img}
            alt="not found"
          />
          <h3>Ohh!</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link
            to="/"
            className="btn"
          >
            Back Home
          </Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <section>
        <h3>something went wrong! please try again later.</h3>
        <Link
          to="/"
          className="btn"
        >
          back home
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  background: white;
  color: black;

  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }

  .btn {
    text-transform: uppercase;
    background: linear-gradient(35deg, #494949, #364480);
    color: white;
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--spacing);
    display: inline-block;
    font-weight: 400;
    transition: var(--transition);
    font-size: 0.875rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius);
    border-color: transparent;
    text-decoration: none;
  }
  .btn:hover {
    color: #f7f2f2;
    background: #566f8a;
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    opacity: 0.6;
    font-weight: 600;
  }

  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
`;
export default ErrorPage;
