import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";

//Icon class
import {
  LocationOnOutlined,
  CheckCircle,
  CheckCircleOutline,
} from "@mui/icons-material";

import { data } from "../../assets/dumpData/Data";

const JobCard = () => {
  return (
    <Container>
      {data.map((job) => {
        const { id, logo, title, tag, verify, country, location } = job;

        return (
          <Link to={`/${id}`}>
            <Card key={id}>
              <div className="card-top">
                <img className="logo" src={logo} alt="logo" />
                <div className="card-title">
                  <h2>{title}</h2>
                  <p>
                    <LocationOnOutlined className="icons" />
                    {country}, {location}
                  </p>
                </div>
              </div>
              <div className="card-bottom">
                <div className="card-tag">
                  {tag.map((x, index) => (
                    <div key={index} className="tag-item">
                      {x}
                    </div>
                  ))}
                </div>
                {verify ? (
                  <div className="verify">
                    <CheckCircle className="valid icon" />
                    Payment Verified
                  </div>
                ) : (
                  <div className="verify">
                    <CheckCircleOutline className="invalid icon" />
                    Payment Unverified
                  </div>
                )}
              </div>
            </Card>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  ${tw`
    mt-12
    pb-10
    h-full
    w-full
    max-h-[100vh]
    max-w-[26.8rem]
    overflow-y-scroll
    scrollbar-hide
  `}
`;

const Card = styled.div`
  ${tw`
    mb-5
    p-6
    w-full
    bg-gray-800
    rounded-md
    cursor-pointer
    hover:bg-gray-700
    transition
    duration-300
    ease-in-out
  `}

  .card-top {
    ${tw`
      flex
      items-center
      justify-start
    `}

    .logo {
      ${tw`
        w-10
        h-10
        object-cover
        rounded-md
      `}
    }

    .card-title {
      ${tw`
        ml-3
      `}

      h2 {
        ${tw`
          text-[16.5px]
          font-semibold
          text-gray-200
        `}
      }

      p {
        ${tw`
          flex
          items-center
          text-gray-400
        `}

        .icons {
          ${tw`
            text-[20px]
          `}
        }
      }
    }
  }

  .card-bottom {
    ${tw`
      mt-6
      flex
      items-center
      justify-between
    `}

    .card-tag {
      ${tw`
        flex
        items-center
        justify-start
      `}

      .tag-item {
        ${tw`
          mr-2
          py-2
          px-3
          text-gray-200
          bg-gray-900
          rounded-sm
        `}
      }
    }

    .verify {
      ${tw`
        flex
        items-center
        justify-start
        font-semibold
        text-gray-200
      `}

      .icon {
        ${tw`
          mr-2
        `}
      }

      .valid {
        ${tw`
          text-blue-600
        `}
      }

      .invalid {
        ${tw`
          text-gray-500
        `}
      }
    }
  }
`;

export default JobCard;
