import { FaFacebook, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";
import ContentWrapper from "./ContentWrapper";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <ul className="menu-items">
          <li className="menu-item">Terms of use</li>
          <li className="menu-item">private policy</li>
          <li className="menu-item">blog</li>
          <li className="menu-item">FAQ</li>
          <li className="menu-item">contact us</li>
        </ul>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aliquid
          quo deserunt pariatur quibusdam hic consequuntur, et vitae placeat
          explicabo aut necessitatibus magni, dolores iusto. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Magni provident, ut porro quod
          maxime exercitationem perferendis autem laudantium animi in velit
          repellendus fuga fugit nisi! Id iusto magni ad voluptates?
        </p>

        <div className="social-icons">
          <span className="icon">
            <FaFacebook />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaDiscord />
          </span>
        </div>
        <p>
          {" "}
          <span>&copy;</span> All rights Reserved{" "}
        </p>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  text-align: center;
  padding: 1rem;
  background: var(--black3);

  .menu-items {
    display: flex;
    list-style-type: none;
    text-transform: capitalize;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    font-size: 0.9rem;
    margin-top: 2rem;
    font-weight: 500;
    cursor: pointer;
    transition: all ease 0.3s;

    @media screen and (min-width: 768px) {
      font-size: 1rem;
      gap: 2rem;
    }

    :hover {
      color: #df5e74;
    }
  }

  p {
    padding: 1rem;
    margin: 0 auto;
    max-width: 45rem;
    color: #aeb0b4;
    font-size: 0.8rem;
  }

  .social-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    .icon {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: var(--black);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all ease 0.3s;
      color: white;
      
      &:hover {
        box-shadow: 0 0 0.625em #df5e74;
        color: #df5e74;
      }
    }
    /* font-size: 1rem; */
  }
`;

export default Footer;
