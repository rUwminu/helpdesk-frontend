import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const TicketDetailPH = () => {
  return (
    <Container>
      <div className="title-container">
        <div className="title-info">
          <div className="card-title cto animated-bg animated-bg-text">
            &nbsp;
          </div>
          <div className="card-base animated-bg animated-bg-text">&nbsp;</div>
        </div>
        <div className="title-info">
          <div className="card-title animated-bg animated-bg-text">&nbsp;</div>
          <div className="card-base animated-bg animated-bg-text">&nbsp;</div>
        </div>
      </div>
      <div className="desc-container">
        <div className="card-title animated-bg animated-bg-text">&nbsp;</div>
        <div className="card-info long animated-bg animated-bg-text">
          &nbsp;
        </div>
        <div className="card-info long animated-bg animated-bg-text">
          &nbsp;
        </div>
        <div className="card-info short animated-bg animated-bg-text">
          &nbsp;
        </div>
      </div>
      <div className="img animated-bg">&nbsp;</div>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
    flex
    flex-col
    items-start
    justify-start
    w-full
    bg-gray-800
    rounded-md
  `}

  .title-container {
    ${tw`
      w-full
      flex
      items-center
      justify-between
    `}

    .title-info {
      ${tw`
        flex
        flex-col
        items-start
        justify-center
      `}

      .card-title {
        ${tw`
          w-40
          py-2
          mb-2
        `}
      }

      .cto {
        ${tw`
          w-48
        `}
      }

      .card-base {
        ${tw`
          w-20
          py-2
        `}
      }
    }
  }

  .desc-container {
    ${tw`
      my-8
      flex
      flex-col
      items-start
      justify-start
      w-full
    `}

    .card-title {
      ${tw`
        w-40
        py-2
        mb-4
      `}
    }

    .card-info {
      ${tw`
        mb-2
      `}
    }

    .card-info.long {
      ${tw`
        w-full
      `}
    }

    .card-info.short {
      ${tw`
        w-1/2
      `}
    }
  }

  .img {
    ${tw`
      w-40
      h-40
      rounded-md
    `}
  }

  .animated-bg-text {
    border-radius: 50px;
    display: inline-block;
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

export default TicketDetailPH;
