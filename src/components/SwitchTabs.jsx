import { useState } from "react";
import styled from "styled-components";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);

    onTabChange(tab);
  };

  return (
    <Wrapper>
      <div className="tab-items">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              className={`tab-item ${selectedTab === index ? "active" : ""}`}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span
          className="moving-bg"
          style={{ left }}
        ></span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: white;
  border-radius: 20px;
  height: 34px;
  padding: 2px;

  .tab-items {
    display: flex;
    align-items: center;
    height: 30px;
    position: relative;

    .tab-item {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--black);
      width: 100px;
      text-transform: capitalize;
      font-size: 1rem;
      position: relative;
      z-index: 1;
      cursor: pointer;
      transition: color ease 0.3s;
      &.active {
        color: white;
      }
    }

    .moving-bg {
      height: 30px;
      width: 100px;
      border-radius: 15px;
      background-image: linear-gradient(-20deg, #c33764 0%, #ea8ed6 100%);
      position: absolute;
      left: 0;
      transition: left cubic-bezier(0.88, -0.35, 0.565, 1.35) 0.4s;
    }
  }
`;
export default SwitchTabs;
