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
  const [isMedium, setIsMedium] = useState(false);
  const [isSmall, setIsIsSmall] = useState(false);

  // const userSignIn = useSelector((state) => state.userSignIn);
  // const { user } = userSignIn;

  // const { loading, data } = useQuery(
  //   user.isAdmin ? GET_INPROCESS_TICKETS : GET_SELF_TICKETS,
  //   {
  //     context: {
  //       headers: {
  //         Authorization: `Bearer${" "}${user.token}`,
  //       },
  //     },
  //   }
  // );

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

  // useEffect(() => {
  //   if (!loading && data) {
  //     if (user.isAdmin) {
  //       dispatch(getTicket(data.getInProcessTickets));
  //     } else {
  //       dispatch(getTicket(data.getSelfTicket));
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    handleCheckWidthM();
    handleCheckWidthS();
    window.addEventListener("resize", handleCheckWidthM);
    window.addEventListener("resize", handleCheckWidthS);
  }, []);

  return (
    <Container>
      <InnerContainer>
        <div className="bottom-container">
          {!isMedium && <Sidebar />}

          <JobCard
            location={`${isSmall ? "ticket_detail" : "home"}`}
            isMedium={isMedium}
          />

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
    pt-28
    pb-10
    min-h-screen
    w-full
    flex
    items-start
    justify-center
    bg-gray-900
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

export default Home;
