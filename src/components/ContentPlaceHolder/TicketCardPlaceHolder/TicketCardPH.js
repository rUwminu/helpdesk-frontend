import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const TicketCardPH = () => {
  return (
    <CardContainer>
      <div className="card-top">
        <div className="card-logo animated-bg">&nbsp;</div>
        <div className="card-title">
          <div className="card-title animated-bg animated-bg-text">&nbsp;</div>
          <div className="user-loc animated-bg animated-bg-text">&nbsp;</div>
        </div>
      </div>
      <div className="card-bottom">
        <div className="card-detail">
          <div className="card-date animated-bg animated-bg-text">&nbsp;</div>
          <div className="card-user animated-bg animated-bg-text">&nbsp;</div>
        </div>
        <div className="card-check animated-bg animated-bg-text">&nbsp;</div>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  ${tw`
    relative
    p-6
    mb-5
    flex
    flex-col
    items-start
    justify-start
    h-full
    w-full
    max-h-[50rem]
    max-w-[26.5rem]
    bg-gray-800
    rounded-md
  `}

  .card-top {
    ${tw`
        mb-8
        w-full
        flex
        items-center
        justify-start
    `}

    .card-logo {
      ${tw`
        mr-3
        w-10
        h-10
        rounded-md
      `}
    }

    .card-title {
      ${tw`
        flex
        flex-col
        items-start
        justify-start
      `}

      .card-title {
        ${tw`
            w-44
            py-2
            mb-1
        `}
      }

      .user-loc {
        ${tw`
            w-16
        `}
      }
    }
  }

  .card-bottom {
    ${tw`
        w-full
        flex
        items-center
        justify-between
    `}

    .card-detail {
      ${tw`
        flex
        flex-col
        items-start
        justify-start
        w-full
      `}

      .card-date {
        ${tw`
            mb-2
            py-2
            w-36
        `}
      }

      .card-user {
        ${tw`
            w-12
        `}
      }
    }

    .card-check {
      ${tw`
        py-2
        w-28
      `}
    }
  }

  .animated-bg-text {
    border-radius: 50px;
    display: inline-block;
    width: 100%;
    margin: 0;
    height: 10px;
  }

  .animated-bg {
    background-image: linear-gradient(
      to right,
      rgba(55, 65, 81, 1) 10%,
      rgba(107, 114, 128, 1) 20%,
      rgba(55, 65, 81, 1) 30%,
      rgba(55, 65, 81, 1) 100%
    );
    background-size: 200% 100%;
    animation: animate1 1s linear infinite;
  }

  @keyframes animate1 {
    0% {
      background-position: 50% 0;
    }
    100% {
      background-position: -150% 0;
    }
  }
`;

export default TicketCardPH;
