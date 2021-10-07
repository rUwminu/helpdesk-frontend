import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../../redux/action/ticketAction";
import {
  Sidebar,
  JobCard,
  JobInfo,
  SidebarSmall,
} from "../../components/index";

// Icon
import { ExpandMore } from "@mui/icons-material";

const Home = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [isSmall, setIsIsSmall] = useState(false);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const { loading, data } = useQuery(
    userInfo.isAdmin ? GET_INPROCESS_TICKETS : GET_SELF_TICKETS,
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );

  const handleCheckWidthM = () => {
    let windowWidth = window.innerWidth;

    if (windowWidth < 1185) {
      setIsMedium(true);
    } else if (windowWidth > 1185) {
      setIsMedium(false);
    }
  };

  const handleCheckWidthS = () => {
    let windowWidth = window.innerWidth;

    if (windowWidth < 994) {
      setIsIsSmall(true);
    } else if (windowWidth > 994) {
      setIsIsSmall(false);
    }
  };

  const getFirstCharaterOfUsername = (username) => {
    const FC = username.split(" ");

    return FC[0].slice(0, 1) + FC[1].slice(0, 1);
  };

  useEffect(() => {
    if (!loading && data) {
      dispatch(getTicket(data.getInProcessTickets));
    }
  }, [data]);

  useEffect(() => {
    handleCheckWidthM();
    handleCheckWidthS();
    window.addEventListener("resize", handleCheckWidthM);
    window.addEventListener("resize", handleCheckWidthS);
  }, []);

  return (
    <Container>
      <InnerContainer>
        {isMedium && (
          <div className="top-container">
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
          </div>
        )}
        <div className="bottom-container">
          {!isMedium && <Sidebar />}
          <JobCard />
          {!isSmall && <JobInfo />}
        </div>
      </InnerContainer>
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
    h-screen
    w-full
    flex
    items-center
    justify-center
    bg-gray-900
    overflow-y-hidden
    scrollbar-hide
  `}
`;

const InnerContainer = styled.div`
  ${tw`
    mx-auto
    h-full
    w-full
    md:max-w-7xl
    flex
    flex-col
    items-end
    justify-center
  `}

  .top-container {
    ${tw`
      pt-14
      px-4
      relative
    `}

    .btn {
      ${tw`
        flex
        items-center
        justify-between
        py-2
        px-3
        w-32
        bg-gray-800
        rounded-md
        transition
        duration-200
        ease-in-out
        hover:bg-gray-600
      `}

      h2 {
        ${tw`
          text-xl
          font-semibold
          text-gray-200
        `}
      }

      .filter-icon {
        ${tw`
          ml-2
          text-3xl
          text-gray-200
        `}
      }
    }
  }

  .bottom-container {
    ${tw`
      w-full
      flex
      items-start
      justify-around
      xl:justify-between
      overflow-y-hidden
    `}
  }
`;

const AbsoluteFilterList = styled.div`
  ${tw`
    absolute
    top-[7rem]
    right-4

    w-44
    px-4
    bg-gray-800
    rounded-md
    transition-all
    duration-200
    ease-linear
    z-10
  `}
`;

export default Home;
