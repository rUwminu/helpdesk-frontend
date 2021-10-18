import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client";
import moment from "moment";

import { getTicket } from "../../redux/action/ticketAction";

//Icon class
import {
  LocationOnOutlined,
  CheckCircle,
  CheckCircleOutline,
  Add,
  ExpandMore,
} from "@mui/icons-material";

import { NewTicket, TicketCardPH, SidebarSmall } from "../index";

const JobCard = ({ location, isMedium }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [tempTicketList, setTempTicketList] = useState([]);
  const [isCreateScreen, setIsCreateScreen] = useState(false);

  // Temp useState
  const [isLoading, setIsLoading] = useState(true);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const ticketList = useSelector((state) => state.ticketList);
  const {
    tickets,
    isUrgent,
    filterType,
    resolved,
    loading: ticketLoading,
  } = ticketList;

  const checkTicketResolveType = () => {
    if (!resolved) {
      return GET_INPROCESS_TICKETS;
    } else if (resolved) {
      return GET_COMPLETED_TICKETS;
    }
  };

  const [getTicketOnLoad, { loading, data }] = useLazyQuery(
    user.isAdmin ? checkTicketResolveType() : GET_SELF_TICKETS,
    {
      context: {
        headers: {
          Authorization: `Bearer${" "}${user.token}`,
        },
      },
    }
  );

  // Test Query, ignore this
  // const [getResolvedTypeTicket, { data: lazyData }] = useLazyQuery(
  //   GET_COMPLETED_TICKETS,
  //   {
  //     context: {
  //       headers: {
  //         Authorization: `Bearer${' '}${user.token}`,
  //       },
  //     },
  //   }
  // )

  // Set data from backend to redux
  useEffect(() => {
    if (!loading && data) {
      if (user.isAdmin) {
        if (!resolved) {
          dispatch(getTicket(data.getInProcessTickets));
        } else {
          dispatch(getTicket(data.getCompletedTickets));
        }
      } else {
        dispatch(getTicket(data.getSelfTicket));
      }
    }
  }, [data]);

  // Filter Ticket by is Urgent and filter by department type
  useEffect(() => {
    if (tickets) {
      setIsLoading(true);
      if (isUrgent) {
        const tempArray = tickets.filter((x) => x.isUrgent === isUrgent);

        if (filterType && filterType.length > 0) {
          setTempTicketList(
            tempArray.filter((x) => filterType.includes(x.typeTicket))
          );
          setIsLoading(false);
        } else {
          setTempTicketList(tempArray);
          setIsLoading(false);
        }
      } else {
        if (filterType && filterType.length > 0) {
          setTempTicketList(
            tickets.filter((x) => filterType.includes(x.typeTicket))
          );
          setIsLoading(false);
        } else {
          setTempTicketList(tickets);
          setIsLoading(false);
        }
      }
    }
  }, [tickets, isUrgent, filterType, loading]);

  // Refetch tickets list when user select in process or closed tickets
  useEffect(() => {
    getTicketOnLoad();
  }, [resolved]);

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
      <OuterMainContainer>
        <AbsoluteTopAddButton>
          <div onClick={() => setIsCreateScreen(true)} className="add-button">
            <Add /> Add Ticket
          </div>
        </AbsoluteTopAddButton>
        <AbsoluteTopFilterButton>
          <div onClick={() => setIsActive(!isActive)} className="btn">
            <h2>Filter</h2>
            <ExpandMore className="filter-icon" />
          </div>
          <AbsoluteFilterList
            onMouseLeave={() => setIsActive(false)}
            className={`${isActive ? "h-[36rem]" : "h-0"}`}
          >
            <SidebarSmall />
          </AbsoluteFilterList>
        </AbsoluteTopFilterButton>
        {!loading && !isLoading && tempTicketList ? (
          <Container>
            {tempTicketList.map((ticket) => {
              const { id, username, body, isUrgent, typeTicket, createdAt } =
                ticket;

              return (
                <Link to={`/helpdesk-frontend/${location}/${id}`}>
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
        ) : (
          <Container>
            <TicketCardPH />
            <TicketCardPH />
            <TicketCardPH />
          </Container>
        )}
      </OuterMainContainer>

      <NewTicket state={isCreateScreen} toggle={setIsCreateScreen} />
    </>
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

const OuterMainContainer = styled.div`
  ${tw`
    relative
    flex
    flex-col
    items-start
    justify-start
    h-full
    w-full
    max-h-[50rem]
    max-w-[26.5rem]
  `}
`;

const Container = styled.div`
  ${tw`
    mt-12
    pb-10
    h-full
    w-full
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

const AbsoluteTopAddButton = styled.div`
  ${tw`
    absolute
    left-0
  `}

  .add-button {
    ${tw`
      flex
      items-center
      justify-center
      py-2
      px-4
      text-gray-200
      bg-gray-800
      rounded-md
      transition
      duration-200
      ease-in-out
      cursor-pointer
      hover:bg-gray-700
    `}
  }
`;

const AbsoluteTopFilterButton = styled.div`
  ${tw`
    absolute
    right-0
  `}

  .btn {
    ${tw`
      flex
      items-center
      justify-center
      py-2
      px-4
      text-gray-200
      bg-gray-800
      rounded-md
      transition
      duration-200
      ease-in-out
      cursor-pointer
      hover:bg-gray-700
    `}
  }
`;

const AbsoluteFilterList = styled.div`
  ${tw`
    absolute
    top-[3rem]
    right-0
    h-full
    max-h-80
    px-4  
    bg-gray-800
    rounded-md
    transition-all
    duration-200
    ease-linear
    z-10
  `}
  box-shadow: -1px -3px 207px -29px rgba(0,0,0,1);
`;

export default JobCard;
