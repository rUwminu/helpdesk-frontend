import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

import {
  getTicket,
  updateTicketIsResolved,
  deleteTicket,
} from "../../redux/action/ticketAction";

// Component
import {
  NewTicket,
  ImgScreen,
  JobCard,
  CommentBox,
  TicketDetailPH,
} from "../../components/index";

// Utils
import getFirstCharaterOfUsername from "../../utils/getFirstCharOfUsername";

// Icons
import {
  ChevronRight,
  ChevronLeft,
  Add,
  DeleteForever,
  Print,
} from "@mui/icons-material";

const TicketDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [isSmall, setIsSmall] = useState(false);
  const [isFilter, setIsFilter] = useState(null);
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [imgIndex, setImgIndex] = useState(null);
  const [isView, setIsView] = useState(false);
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const ticketList = useSelector((state) => state.ticketList);
  const { tickets, loading, resolved } = ticketList;

  const checkTicketResolveType = () => {
    if (!resolved) {
      return GET_INPROCESS_TICKETS;
    } else if (resolved) {
      return GET_COMPLETED_TICKETS;
    }
  };

  const { loading: getTicketLoading, data } = useQuery(
    user.isAdmin ? checkTicketResolveType() : GET_SELF_TICKETS,
    {
      context: {
        headers: {
          Authorization: `Bearer${" "}${user.token}`,
        },
      },
    }
  );

  const [UpdateTicketResolved, { loading: resolvedLoading }] = useMutation(
    UPDATE_TICKET_RESOLVED,
    {
      context: {
        headers: {
          Authorization: `Bearer${" "}${user.token}`,
        },
      },
      update(_, { data: { updateResolved: ticketData } }) {
        dispatch(updateTicketIsResolved(ticketData));
      },
      onError(err) {
        console.log(err);
      },
      variables: { ticketId: id.toString() },
    }
  );

  const [UpdateTicketREOpen, { loading: reOpenLoading }] = useMutation(
    UPDATE_TICKET_RE_OPEN,
    {
      context: {
        headers: {
          Authorization: `Bearer${" "}${user.token}`,
        },
      },
      update(_, { data: { updateResolved: ticketData } }) {
        dispatch(updateTicketIsResolved(ticketData));
      },
      onError(err) {
        console.log(err);
      },
      variables: { ticketId: id.toString() },
    }
  );

  const [DeleteTicket] = useMutation(DELETE_TICKET, {
    context: {
      headers: {
        Authorization: `Bearer${" "}${user.token}`,
      },
    },
    update() {
      dispatch(deleteTicket(id));
    },
    onError(err) {
      console.log(err);
    },
    variables: { ticketId: id.toString() },
  });

  const handleCheckWidthM = () => {
    let windowWidth = window.innerWidth;
    //console.log(windowWidth);

    if (windowWidth < 1185) {
      setIsSideOpen(false);
    } else if (windowWidth > 1185) {
      setIsSideOpen(true);
    }
  };

  const handleCheckWidthS = () => {
    let windowWidth = window.innerWidth;

    if (windowWidth < 478) {
      setIsSmall(true);
    } else if (windowWidth > 478) {
      setIsSmall(false);
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
    handleCheckWidthM();
    handleCheckWidthS();
    window.addEventListener("resize", handleCheckWidthM);
    window.addEventListener("resize", handleCheckWidthS);
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

  const getTitleFromBody = (body) => {
    const title = body.slice(0, 30);

    return title;
  };

  const handleUpdateTicket = () => {
    if (!isFilter.isResolved) {
      UpdateTicketResolved();
    } else if (isFilter.isResolved) {
      UpdateTicketREOpen();
    }
  };

  const handlePdfViews = () => {
    window.open(`/helpdesk-frontend/pdf_view/${id}`, "_blank");
    //history.push(`/helpdesk-frontend/pdf-view/${id}`);
  };

  return (
    <Container>
      <InnerContainer>
        <div
          className={`left-bar ${
            isSideOpen ? "w-full max-w-[27rem]" : "w-20"
          } ${!isSmall && isSideOpen && "min-w-[27rem]"}`}
        >
          {isSideOpen && <JobCard location={"ticket_detail"} />}
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
                      to={`/helpdesk-frontend/ticket_detail/${ticketId}`}
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
            className={`more-icon ${isSideOpen ? "" : "rotate-0"}`}
          />
        </div>
        {!loading && isFilter && (
          <RightContainer
            className={`${isSmall && isSideOpen ? "hidden" : "inline-flex"}`}
          >
            <div className="right-top">
              <Link to="/helpdesk-frontend/home" className="back-btn">
                <ChevronLeft className="back-icon" />
                To Home
              </Link>
              <div className="right-btn-container">
                <DeleteForever
                  onClick={() => DeleteTicket()}
                  className="delete-btn btn"
                />

                <Print
                  onClick={() => handlePdfViews()}
                  className="print-btn btn"
                />

                <div
                  onClick={() => handleUpdateTicket()}
                  className={`resolve-btn ${
                    isFilter.isResolved
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-green-600 hover:bg-green-500"
                  }`}
                >
                  {isFilter.isResolved ? "Re-Open" : "Resolve"}
                </div>
              </div>
            </div>
            {!loading ? (
              <div className="right-form">
                <div className="scoll-container">
                  <div className="title-container">
                    <div className="title-info">
                      <h1>{getTitleFromBody(isFilter.body)}</h1>
                      <p>{isFilter.typeTicket}</p>
                    </div>
                    <div className="title-postby">
                      <h2>
                        Posted on{" "}
                        {moment(isFilter.createdAt).format("Do MMM YYYY")}
                      </h2>
                      <p>by {isFilter.username}</p>
                    </div>
                  </div>
                  <div className="job-highlight hidden md:inline-flex">
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

                  {isFilter.comments.length > 0 && (
                    <div className="ticket-comments">
                      <h2>Comments</h2>
                      <div className="inner-container">
                        {isFilter.comments
                          .slice(0)
                          .reverse()
                          .map((x) => (
                            <div className="comment-card" key={x.id}>
                              <div className="card-userinfo">
                                <div className="username-logo">
                                  {getFirstCharaterOfUsername(x.username)}
                                </div>

                                <div className="user-detail">
                                  <h1>{x.username}</h1>
                                  <p>
                                    Commented On{" "}
                                    {moment(x.createdAt).format("Do MMM YYYY")}
                                  </p>
                                </div>
                              </div>
                              <p className="comment-body">{x.body}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {!isFilter.isResolved && <CommentBox />}
                </div>
              </div>
            ) : (
              <TicketDetailPH />
            )}
          </RightContainer>
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
        createdAt
      }
      createdAt
    }
  }
`;

const GET_COMPLETED_TICKETS = gql`
  {
    getCompletedTickets {
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
        createdAt
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
        createdAt
      }
      createdAt
    }
  }
`;

const UPDATE_TICKET_RESOLVED = gql`
  mutation updateResolved($ticketId: ID!) {
    updateResolved(ticketId: $ticketId) {
      id
      isResolved
    }
  }
`;

const UPDATE_TICKET_RE_OPEN = gql`
  mutation updateReOpenTicket($ticketId: ID!) {
    updateReOpenTicket(ticketId: $ticketId) {
      id
      isResolved
    }
  }
`;

const DELETE_TICKET = gql`
  mutation deleteTicket($ticketId: ID!) {
    deleteTicket(ticketId: $ticketId)
  }
`;

const Container = styled.section`
  ${tw`
    w-full
    min-h-[100vh]
    pt-28
    px-4
    lg:px-0
    flex
    flex-col
    items-start
    justify-start
    bg-gray-900
    overflow-x-hidden
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
        h-full
        min-h-[80vh]
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
        right-0
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
        w-10
        h-10
        md:w-12
        md:h-12
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

const RightContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    pl-8
  `}

  .right-top {
    ${tw`
      mb-3
      flex
      items-center
      justify-between
    `}

    .back-btn {
      ${tw`
        flex
        items-center
        justify-center
        py-1
        pr-3
        md:text-lg
        text-gray-200
        font-semibold
        rounded-md
        transition
        duration-200
        ease-in-out
        overflow-hidden
      `}

      .back-icon {
        ${tw`
          relative
          text-xl
          md:text-3xl
          transition
          duration-200
          ease-in-out
        `}
      }

      :hover {
        ${tw`
          bg-gray-700
        `}

        .back-icon {
          animation: backAnimate 2.5s ease infinite;
        }
      }
    }

    .right-btn-container {
      ${tw`
        flex
        items-center
        justify-center
      `}

      .btn {
        ${tw`
          h-8
          w-8
          p-1
          mr-2
          transition
          duration-200
          ease-in-out
          rounded-md
          cursor-pointer
          hover:bg-gray-700
        `}
      }

      .delete-btn {
        ${tw`
          text-red-500        
        `}
      }

      .print-btn {
        ${tw`
          text-blue-500
        `}
      }

      .resolve-btn {
        ${tw`
          py-1
          px-4
          md:px-8
          text-lg
          font-semibold
          tracking-wider       
          text-gray-200
          transition
          duration-200
          ease-in-out
          rounded-md
          cursor-pointer
        `}
      }
    }
  }

  .right-form {
    ${tw`
        w-full
        h-full
        max-h-[40rem]
        p-6
        bg-gray-800
        rounded-md
    `}

    overflow-y: hidden;

    :hover,
    :active,
    :focus {
      overflow-y: auto;
      overflow-y: overlay;
    }

    ::-webkit-scrollbar-track {
      background: none;
    }

    .scoll-container {
      ${tw`
        h-full
        w-full
      `}
    }

    .title-container {
      ${tw`
      w-full
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      mb-4
      md:mb-0
    `}

      .title-info {
        ${tw`
        mb-4
        md:mb-0
        flex
        flex-col
        items-start
        justify-center
      `}

        h1 {
          ${tw`
          text-lg
          md:text-xl
          text-gray-200
          font-bold
        `}
        }

        p {
          ${tw`
          text-base
          md:text-lg
          text-gray-300
        `}
        }
      }

      .title-postby {
        ${tw``}

        h2 {
          ${tw`
          text-lg
          md:text-xl
          text-gray-200
        `}
        }

        p {
          ${tw`
          text-base
          md:text-lg
          text-gray-300
        `}
        }
      }
    }

    .job-highlight {
      ${tw`
      hidden
      md:inline-flex
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
          md:text-lg
          font-semibold
          text-gray-200
        `}
        }

        p {
          ${tw`
          md:text-lg
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
        text-lg
        md:text-xl
        font-semibold
        text-gray-200
      `}
      }

      p {
        ${tw`
        md:text-lg
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
        md:text-lg
        font-semibold
        text-gray-200
      `}
      }

      .img-container {
        ${tw`
        flex
        flex-nowrap
      `}

        ::-webkit-scrollbar {
          height: 6px;
        }

        overflow-x: hidden;
        overflow-y: hidden;

        :hover,
        :active,
        :focus {
          overflow-x: scroll;
          overflow-x: overlay;
        }

        ::-webkit-scrollbar-track {
          background: none;
        }

        img {
          flex: 0 0 auto;

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

    .ticket-comments {
      ${tw`
        flex
        flex-col
        items-start
        justify-start
      `}

      h2 {
        ${tw`
        mb-4
        text-lg
        md:text-xl
        font-semibold
        text-gray-200
      `}
      }

      .inner-container {
        ${tw`
          flex
          flex-col
          items-start
          justify-start
          w-full
          max-h-[20rem]
          overflow-y-scroll
          scrollbar-hide
        `}
      }

      .comment-card {
        ${tw`
          flex
          flex-col
          items-start
          justify-start
          w-full
          bg-gray-700
          mb-4
          p-4
          rounded-md
        `}

        .card-userinfo {
          ${tw`
            flex
            items-center
            justify-start
          `}

          .username-logo {
            ${tw`
              w-full
              flex
              items-center
              justify-center
              w-8
              h-8
              md:w-12
              md:h-12
              min-w-[2rem]
              text-base
              md:text-xl
              font-semibold
              bg-blue-300
              rounded-md
            `}
          }

          .user-detail {
            ${tw`
              ml-4
            `}

            h1 {
              ${tw`
                text-sm
                md:text-base
                font-semibold
                text-gray-200
              `}
            }

            p {
              ${tw`
                text-xs
                md:text-sm
                text-gray-300
              `}
            }
          }
        }

        .comment-body {
          ${tw`
            w-full
            mt-3
            text-sm
            md:text-base
            text-gray-200
          `}
        }
      }
    }
  }

  @keyframes backAnimate {
    20% {
      ${tw`
        opacity-0
        -translate-x-full
      `}
    }
    30% {
      ${tw`
        opacity-0
        translate-x-full
      `}
    }
    40% {
      ${tw`
        opacity-100
        translate-x-0
        left-1
      `}
    }
    50% {
      ${tw`
        left-0
      `}
    }
    55% {
      ${tw`
        left-1
      `}
    }
    60% {
      ${tw`
        left-0
      `}
    }
    100% {
      ${tw`
        left-0
        translate-x-0
      `}
    }
  }
`;

export default TicketDetail;
