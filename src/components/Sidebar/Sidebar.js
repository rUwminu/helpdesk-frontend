import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";

const Sidebar = () => {
  const [isVerify, setIsVerify] = useState();

  return (
    <Container>
      <div className="items-list">
        <h2>Location</h2>
        <label className="cb-container">
          <input type="checkbox" value="remote" />
          <span className="check"></span>
          Remote
        </label>
        <label className="cb-container">
          <input type="checkbox" name="remote" />
          <span className="check"></span>
          India
        </label>
        <label className="cb-container">
          <input type="checkbox" name="remote" />
          <span className="check"></span>
          Australia
        </label>
        <label className="cb-container">
          <input type="checkbox" name="remote" />
          <span className="check"></span>
          Poland
        </label>
        <label className="cb-container">
          <input type="checkbox" name="remote" />
          <span className="check"></span>
          Canada
        </label>
      </div>
      <div className="items-list">
        <h2>Payment</h2>
        <label className="cb-container">
          <input
            onClick={() => setIsVerify(true)}
            type="checkbox"
            checked={isVerify ? true : false}
            value="verify"
          />
          <span className="check"></span>
          Verified
        </label>
        <label className="cb-container">
          <input
            onClick={() => setIsVerify(false)}
            type="checkbox"
            checked={!isVerify ? true : false}
            name="unverify"
          />
          <span className="check"></span>
          Unverified
        </label>
      </div>
      <div className="items-list">
        <h2>Level</h2>
        <label className="cb-container">
          <input type="checkbox" value="entry" />
          <span className="check"></span>
          Entry
        </label>
        <label className="cb-container">
          <input type="checkbox" value="inter" />
          <span className="check"></span>
          Intermediate
        </label>
        <label className="cb-container">
          <input type="checkbox" value="experts" />
          <span className="check"></span>
          Experts
        </label>
      </div>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
    h-full
    w-full
    max-w-[10rem]
    flex
    flex-col
    items-start
    justify-start
    overflow-y-scroll
    scrollbar-hide
  `}

  .items-list {
    ${tw`
      pt-10
    `}

    h2 {
      ${tw`
        mb-4
        text-xl
        text-gray-200
        font-bold
      `}
    }

    .cb-container {
      ${tw`
        flex
        items-center
        justify-start

        mb-4
        text-lg
        text-gray-400
        font-semibold
    `}

      input {
        appearance: none;
      }

      span {
        ${tw`
        relative
        inline-block
        w-[15px]
        h-[15px]
        mr-4
        bg-gray-900
        transition
        duration-500
        ease-in-out
      `}

        :before {
          content: "";
          box-shadow: 0 -13.5px 0 rgba(249, 250, 251, 1);

          ${tw`
            absolute
            bottom-0
            left-0
            w-full
            h-[1.5px]
            bg-gray-100
            transition
            duration-500
        `}
        }

        :after {
          content: "";
          box-shadow: 13.5px 0 0 rgba(249, 250, 251, 1);

          ${tw`
            absolute
            bottom-0
            left-0
            w-[1.5px]
            h-full
            bg-gray-100
            transition
            duration-500
        `}
        }
      }

      input:checked ~ .check::before {
        ${tw`
        bg-green-500
      `}
        box-shadow: 0 0 0 transparent;
      }

      input:checked ~ .check::after {
        ${tw`
        h-1/2
        bg-green-500
      `}
        box-shadow: 0 0 0 transparent;
      }

      input:checked ~ .check {
        transform: rotate(-45deg) translate(2px, -6px);
      }
    }
  }
`;

export default Sidebar;
