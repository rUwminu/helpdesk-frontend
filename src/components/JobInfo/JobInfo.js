import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { data } from "../../assets/dumpData/Data";

import { CheckCircle } from "@mui/icons-material";

const JobInfo = () => {
  const { id } = useParams();
  const [isFilter, setIsFilter] = useState(null);

  const ticketList = useSelector((state) => state.ticketList);
  const { tickets, loading } = ticketList;

  const getJobDetail = () => {
    if (id) {
      const flitedTicket = tickets.find((ticket) => ticket.id === id);
      setIsFilter(flitedTicket);
    } else {
      setIsFilter(tickets[0]);
    }
  };

  useEffect(() => {
    if (tickets && !loading) {
      getJobDetail();
    }
  }, [id, tickets]);

  const getTitleFromBody = (body) => {
    const title = body.slice(0, 30);

    return title;
  };

  return (
    <>
      {!loading && isFilter && (
        <Container>
          <div className="title-container">
            <div className="title-info">
              <h1>{getTitleFromBody(isFilter.body)}</h1>
              <p>{isFilter.typeTicket}</p>
            </div>
            <div className="title-postby">
              <h2>Posted 4 days ago</h2>
              <p>by {isFilter.username}</p>
            </div>
          </div>
          <div className="job-highlight">
            <div className="list-items">
              <h3>Ticket Level</h3>
              <p>{isFilter.isUrgent ? "Urgent" : "Not Urgent"}</p>
            </div>
            <div className="list-items">
              <h3>Location</h3>
              <p>{isFilter.typeTicket}</p>
            </div>
            <div className="list-items">
              <h3>Comments</h3>
              <p>{isFilter.comments.length}</p>
            </div>
          </div>
          <div className="job-desc">
            <h2>Description</h2>
            <p>{isFilter.body}</p>
          </div>
          {isFilter.images.length > 0 && (
            <div className="job-img">
              <h2>Image Attached</h2>
              <div className="img-container">
                {isFilter.images.map((x, index) => (
                  <img key={index} src={x} alt="" />
                ))}
              </div>
            </div>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  ${tw`
    p-10
    mt-12
    w-full
    max-w-lg
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

      h1 {
        ${tw`
          text-lg
          text-gray-200
          font-bold
        `}
      }

      p {
        ${tw`
          text-lg
          text-gray-400
        `}
      }
    }

    .title-postby {
      ${tw``}

      h2 {
        ${tw`
          text-lg
          text-gray-200
        `}
      }

      p {
        ${tw`
          text-lg
          text-gray-400
        `}
      }
    }
  }

  .job-highlight {
    ${tw`
      my-8
      p-4
      w-full
      flex
      items-center
      justify-between
      bg-gray-900
      rounded-md
    `}

    .list-items {
      h3 {
        ${tw`
          font-semibold
          text-gray-200
        `}
      }

      p {
        ${tw`
          text-gray-400
        `}
      }
    }
  }

  .job-desc {
    ${tw`
      mb-4
    `}

    h2 {
      ${tw`
        mb-4
        text-lg
        font-semibold
        text-gray-200
      `}
    }

    p {
      ${tw`
        text-gray-400
      `}
    }
  }

  .job-img {
    ${tw`
      mb-4
    `}

    h2 {
      ${tw`
        mb-4
        text-lg
        font-semibold
        text-gray-200
      `}
    }

    .img-container {
      ${tw`
        flex
        flex-wrap
        items-center
        justify-between
        w-full
      `}

      img {
        ${tw`
          w-32
          h-32
          rounded-md
          object-cover
          transition
          duration-200
          ease-in-out
        `}

        :hover {
          ${tw`
            scale-110
          `}
        }
      }
    }
  }
`;

export default JobInfo;
