import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

import { getTicket } from "../../redux/action/ticketAction";

// Component
import { NewTicket, ImgScreen, JobCard } from "../../components/index";

// Icons
import { ChevronRight, Add } from "@mui/icons-material";

const TicketDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isMedium, setIsMedium] = useState(false);
  const [isFilter, setIsFilter] = useState(null);
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [imgIndex, setImgIndex] = useState(null);
  const [isView, setIsView] = useState(false);
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const ticketList = useSelector((state) => state.ticketList);
  const { tickets, loading } = ticketList;

  const { loading: getTicketLoading, data } = useQuery(
    user.isAdmin ? GET_INPROCESS_TICKETS : GET_SELF_TICKETS,
    {
      context: {
        headers: {
          Authorization: `Bearer${" "}${user.token}`,
        },
      },
    }
  );

  const handleCheckWidthM = () => {
    let windowWidth = window.innerWidth;
    console.log(windowWidth);

    if (windowWidth < 1185) {
      setIsSideOpen(false);
      setIsMedium(true);
    } else if (windowWidth > 1185) {
      setIsMedium(false);
      setIsSideOpen(true);
    }
  };

  const getJobDetail = () => {
    if (id) {
      const flitedTicket = tickets.find((ticket) => ticket.id === id);
      setIsFilter(flitedTicket);
    } else {
      setIsFilter(tickets[0]);
    }
  };

  useEffect(() => {
    if (tickets.length === 0) {
      if (!getTicketLoading && data) {
        if (user.isAdmin) {
          dispatch(getTicket(data.getInProcessTickets));
        } else {
          dispatch(getTicket(data.getSelfTicket));
        }
      }
    }

    if (tickets && !loading) {
      getJobDetail();
    }
  }, [id, tickets, data]);

  useEffect(() => {
    //handleCheckWidthM();
    window.addEventListener("resize", handleCheckWidthM);
  }, []);

  const handleImgClick = (index) => {
    document.body.style.overflow = "hidden";
    setImgIndex(index);
    setIsView(true);
  };

  const handleCloseScreen = () => {
    document.body.style.overflowY = "scroll";
    setImgIndex(null);
    setIsView(false);
  };

  const getFirstCharaterOfUsername = (username) => {
    const FC = username.split(" ");

    return FC[0].slice(0, 1) + FC[1].slice(0, 1);
  };

  const getTitleFromBody = (body) => {
    const title = body.slice(0, 30);

    return title;
  };

  return (
    <Container>
      <InnerContainer>
        <div
          className={`left-bar ${
            isSideOpen ? "w-[27rem] min-w-[27rem]" : "w-20"
          }`}
        >
          {isSideOpen && <JobCard location={"/ticket_detail"} />}
          {!isSideOpen && (
            <ClosedTicketCard>
              <div
                onClick={() => setIsCreateTicketOpen(true)}
                className="name-box "
              >
                <Add className="text-3xl" />
              </div>
              {tickets &&
                tickets.map((ticket, index) => {
                  const { id: ticketId, username } = ticket;
                  return (
                    <Link
                      to={`/ticket_detail/${ticketId}`}
                      key={index}
                      className="name-box "
                    >
                      {getFirstCharaterOfUsername(username)}
                    </Link>
                  );
                })}
            </ClosedTicketCard>
          )}
          <ChevronRight
            onClick={() => setIsSideOpen(!isSideOpen)}
            className={`more-icon ${
              isSideOpen ? "left-[24.4rem]" : "left-[2.5rem] rotate-0"
            }`}
          />
        </div>
        {!loading && isFilter && (
          <div className="right-form">
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
                    <img
                      onClick={() => handleImgClick(index)}
                      key={index}
                      src={x}
                      alt="attachment"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </InnerContainer>
      <NewTicket state={isCreateTicketOpen} toggle={setIsCreateTicketOpen} />
      {isView && imgIndex !== null && (
        <ImgScreen index={imgIndex} toggle={handleCloseScreen} />
      )}
    </Container>
  );
};

const GET_INPROCESS_TICKETS = gql`
  {
    getInProcessTickets {
      id
      typeTicket
      username
      body
      images
      isUrgent
      isResolved
      comments {
        id
        username
        body
      }
      createdAt
    }
  }
`;

const GET_SELF_TICKETS = gql`
  {
    getSelfTicket {
      id
      typeTicket
      username
      body
      images
      isUrgent
      isResolved
      comments {
        id
        username
        body
      }
      createdAt
    }
  }
`;

const Container = styled.section`
  ${tw`
    w-full
    h-full
    pt-28
    pb-28
    bg-gray-900
  `}
`;

const InnerContainer = styled.div`
  ${tw`
    h-full
    w-full
    md:max-w-7xl
    mx-auto
    flex
    items-start
    justify-between
  `}

  .left-bar {
    ${tw`
        relative
        pr-8
        mr-8
        border-r-2
        border-gray-400
        transition-all
        duration-200
        ease-in-out
    `}

    .more-icon {
      ${tw`
        absolute
        top-40
        rotate-180
        translate-x-1/2
        h-10
        w-10
        bg-gray-900
        text-gray-400
        border-2
        border-gray-400
        rounded-full
        cursor-pointer
        hover:bg-gray-800
        transition-all
        duration-200
        ease-in-out
      `}
    }
  }

  .right-form {
    ${tw`
        flex-grow
        p-6
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
          text-xl
          text-gray-200
          font-bold
        `}
        }

        p {
          ${tw`
          text-lg
          text-gray-300
        `}
        }
      }

      .title-postby {
        ${tw``}

        h2 {
          ${tw`
          text-xl
          text-gray-200
        `}
        }

        p {
          ${tw`
          text-lg
          text-gray-300
        `}
        }
      }
    }

    .job-highlight {
      ${tw`
      my-8
      py-4
      px-6
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
          text-lg
          font-semibold
          text-gray-200
        `}
        }

        p {
          ${tw`
          text-lg
          text-gray-300
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
        text-xl
        font-semibold
        text-gray-200
      `}
      }

      p {
        ${tw`
        text-lg
        text-gray-300
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
        justify-start
        w-full
      `}

        img {
          ${tw`
          mr-4
          w-32
          h-32
          rounded-md
          object-cover
          cursor-pointer
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
  }
`;

const ClosedTicketCard = styled.div`
  ${tw`
    flex
    flex-col
    items-center
    justify-start
    max-h-screen
    overflow-y-scroll
    scrollbar-hide
  `}

  .name-box {
    ${tw`
        flex
        items-center
        justify-center
        w-12
        h-12
        mb-4
        text-gray-200
        bg-gray-700
        font-semibold
        hover:bg-gray-600
        rounded-md
        transition
        duration-200
        ease-in-out
    `}
  }
`;

export default TicketDetail;
