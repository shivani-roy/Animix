import styled from "styled-components";
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import ContentWrapper from "./ContentWrapper";
import logo from "../assets/logo.jpg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openShowSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    navigate("/search/" + query);
    setTimeout(() => {
      setShowSearch(false);
      setQuery("");
    }, 0);
  };

  return (
    <Wrapper className={`${mobileMenu ? "mobile-view" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img
            src={logo}
            alt="header-logo"
            onClick={() => navigate("/")}
          />
        </div>

        <ul className="menu-items">
          <li
            className="menu-item"
            onClick={() => {
              navigationHandler("anime");
            }}
          >
            Anime
          </li>
          <li
            className="menu-item"
            onClick={() => {
              navigationHandler("manga");
            }}
          >
            Manga
          </li>
          <li className="menu-item">
            <HiOutlineSearch onClick={openShowSearch} />
          </li>
        </ul>

        <div className="mobile-menu-items">
          <HiOutlineSearch onClick={openShowSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="search-bar">
          <ContentWrapper>
            <form
              className="search-input"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="search anime..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <VscChromeClose
                onClick={() => {
                  setShowSearch(false);
                  setQuery("");
                }}
              />
            </form>
          </ContentWrapper>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  transform: translateY(0);
  width: 100%;
  height: 6rem;
  z-index: 2;
  display: flex;
  align-items: center;
  transition: all ease 0.5s;

  &.top {
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(3.5px);
    -webkit-backdrop-filter: blur(3.5px);
  }

  &.show {
    background: var(--black3);
  }

  &.hide {
    transform: translateY(-6rem);
  }

  //to target ContentWrapper
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    cursor: pointer;
    margin: 1rem;
    position: relative;
    img {
      height: 3rem;
      border-radius: 50%;
      position: relative;
    }
  }

  .logo::before {
    content: "";
    width: 120%;
    height: 120%;
    position: absolute;
    top: -4px;
    left: -4px;
    z-index: -1;
    box-sizing: border-box;
    background: white;
    border-radius: 50%;
  }

  .menu-items {
    list-style-type: none;
    display: none;

    @media screen and (min-width: 768px) {
      display: flex;
      align-items: center;
    }

    .menu-item {
      height: 6rem;
      display: flex;
      align-items: center;
      margin: 0 15px;
      color: white;
      font-weight: 500;
      position: relative;

      cursor: pointer;
      &:hover {
        color: #df5e74;
      }
    }
  }

  svg {
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    margin: 0;
    &:hover {
      color: #df5e74;
    }
  }

  .mobile-menu-items {
    display: flex;
    gap: 1rem;
    align-items: center;

    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  &.mobile-view {
    background: var(--background-color);

    .menu-items {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 6rem;
      left: 0;
      width: 100%;
      padding: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      animation: mobileMenu 0.3s ease forwards;
      background: var(--background-color);

      .menu-item {
        font-size: 1.2rem;
        width: 100%;
        height: 4rem;
        padding: 0.25rem 0.7rem;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &:last-child {
          display: none;
        }
      }
    }
  }

  .search-bar {
    width: 100%;
    height: 4rem;
    position: absolute;
    top: 6rem;
    animation: mobileMenu 0.3s ease forwards;
    left: 0;

    .search-input {
      display: flex;
      background: white;
      align-items: center;
      /* justify-content: space-between; */
      width: 100%;

      input {
        width: 100%;
        height: 3rem;
        padding: 1.25rem;
        text-transform: capitalize;
        font-size: 1rem;
        /* font-weight: 600; */
        border: none;
        outline: none;

        @media screen and (min-width: 768px) {
          padding: 1.5rem;
        }
      }

      svg {
        font-size: 1.45rem;
        flex-shrink: 0;
        color: black;
        margin-right: 1rem;

        &:hover {
          color: #df5e74;
        }
      }
    }
  }

  @keyframes mobileMenu {
    0% {
      transform: translateY(-130%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default Header;
