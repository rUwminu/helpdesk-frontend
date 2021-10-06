import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

//Icon class
import {
  LocationOnOutlined,
  CheckCircle,
  CheckCircleOutline,
} from "@mui/icons-material";

import { data } from "../../assets/dumpData/Data";

const JobCard = () => {
  const dispatch = useDispatch();

  const ticketList = useSelector((state) => state.ticketList);
  const { tickets, loading } = ticketList;

  const getFirstCharaterOfUsername = (username) => {
    const FC = username.split(" ");

    return FC[0].slice(0, 1) + FC[1].slice(0, 1);
  };

  const getTitleFromBody = (body) => {
    const title = body.slice(0, 30);

    return title;
  };

  return (
    <>
      {!loading && tickets && (
        <Container>
          {tickets.map((ticket) => {
            const { id, username, body, isUrgent, typeTicket, createdAt } =
              ticket;

            return (
              <Link to={`/${id}`}>
                <Card key={id}>
                  <div className="card-top">
                    <div className="logo" alt="logo">
                      {getFirstCharaterOfUsername(username)}
                    </div>
                    <div className="card-title">
                      <h2>{getTitleFromBody(body)} ...</h2>
                      <p>
                        <LocationOnOutlined className="icons" />
                        {typeTicket}
                      </p>
                    </div>
                  </div>
                  <div className="card-bottom">
                    <div className="card-tag">
                      <h2>
                        Posted On {moment(createdAt).format("Do MMM YYYY")}
                      </h2>
                      <h3>by {username}</h3>
                    </div>
                    {isUrgent ? (
                      <div className="verify">
                        <CheckCircle className="valid icon" />
                        Is Urgent
                      </div>
                    ) : (
                      <div className="verify">
                        <CheckCircleOutline className="invalid icon" />
                        Not Urgent
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </Container>
      )}
    </>
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
        flex
        items-center
        justify-center
        w-10
        h-10
        font-semibold
        bg-blue-300
        text-gray-900
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
        flex-col
        items-start
        justify-center
      `}

      h2 {
        ${tw`
          text-gray-200
        `}
      }

      h3 {
        ${tw`
          text-gray-400
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
          text-red-600
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
