import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

// Redux
import { getSingleUser } from "../../redux/action/userAction";

//Icon class
import {
  MarkEmailRead,
  AdminPanelSettings,
  ChevronLeft,
} from "@mui/icons-material";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const userProfile = useSelector((state) => state.userList);
  const { userInfo } = userProfile;

  const { data } = useQuery(GET_USER_INFO, {
    variables: { userId: id.toString() },
  });

  useEffect(() => {
    if (data) {
      dispatch(getSingleUser(data.getUser));
    }
  }, [data]);

  //console.log(data);

  const getFirstCharaterOfUsername = (username) => {
    const FC = username.split(" ");

    return FC[0].slice(0, 1) + FC[1].slice(0, 1);
  };

  return (
    <SectionContainer>
      <Container>
        <div className="title-container">
          <h1 className="title">User Profile</h1>
          <Link to="/helpdesk-frontend/user_panel" className="back-btn">
            <ChevronLeft className="back-icon" />
            To Home
          </Link>
        </div>

        <div className="info">
          {userInfo && (
            <>
              <LeftContainer>
                <div className="user-title">
                  <div className="logo">
                    {getFirstCharaterOfUsername(userInfo.username)}
                  </div>
                  <div className="user-info">
                    <h2>{userInfo.username}</h2>
                    <small>{userInfo.department}</small>
                  </div>
                </div>
                <div className="user-detail">
                  <h1>User Information</h1>
                  <div className="list-items">
                    <MarkEmailRead className="icon mail" />
                    <h2>{userInfo.email}</h2>
                  </div>
                  <div className="list-items">
                    <AdminPanelSettings className="icon admin" />
                    <h2>
                      {userInfo.isAdmin ? "Admin Permission" : "Normal User"}
                    </h2>
                  </div>
                </div>
              </LeftContainer>

              <RightContainer>
                <h1>Edit user Profile</h1>
                <div className="input-item">
                  <h2>Username</h2>
                  <input placeholder={userInfo.username} />
                </div>
                <div className="input-item">
                  <h2>Email</h2>
                  <input placeholder={userInfo.email} />
                </div>
                <div className="input-item">
                  <h2>Password</h2>
                  <input placeholder="Atleast 6 Charater" />
                </div>
                <div className="input-item">
                  <h2>Comfirm Password</h2>
                  <input placeholder="Retype Your Password" />
                </div>

                <div className="btn">Update</div>
              </RightContainer>
            </>
          )}
        </div>
      </Container>
    </SectionContainer>
  );
};

const GET_USER_INFO = gql`
  query getuser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      email
      department
      isAdmin
    }
  }
`;

const SectionContainer = styled.div`
  ${tw`
    w-full
    h-full
    min-h-[100vh]
    flex
    items-start
    justify-center
    bg-gray-900
  `}
`;

const Container = styled.div`
  ${tw`
    mx-auto
    px-4
    lg:px-0
    pt-28
    pb-20
    w-full
    md:max-w-5xl 
  `}

  .title-container {
    ${tw`
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
          ${tw`
             
          `}
          animation: backAnimate 2.5s ease infinite;
        }
      }
    }
  }

  .title {
    ${tw`
        mb-4
        text-2xl
        md:text-3xl
        font-semibold
        text-gray-200
    `}
  }

  .info {
    ${tw`
        flex
        flex-col
        md:flex-row
        items-start
        justify-start
        md:justify-between
    `}
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

const LeftContainer = styled.div`
  ${tw`
    p-6
    mb-6
    md:mb-0
    md:mr-6
    w-full
    md:max-w-md
    bg-gray-800
    rounded-md
  `}

  .user-title {
    ${tw`
        mb-4
        w-full
        flex
        items-center
        justify-start
    `}

    .logo {
      ${tw`
        w-12
        h-12
        flex
        items-center
        justify-center
        text-lg
        text-gray-900
        bg-blue-200
        font-semibold
        rounded-md
      `}
    }

    .user-info {
      ${tw`
        ml-4
      `}

      h2 {
        ${tw`
            text-lg
            text-gray-200
        `}
      }

      small {
        ${tw`
            text-gray-300
        `}
      }
    }
  }

  .user-detail {
    h1 {
      ${tw`
        mb-2
        text-lg
        font-semibold
        text-gray-200
      `}
    }

    .list-items {
      ${tw`
        ml-2
        mb-2
        flex
        items-center
        justify-start
      `}

      .icon {
        ${tw`
            text-gray-200
        `}
      }

      .mail {
        ${tw`
            text-blue-500
        `}
      }

      .admin {
        ${tw`
            text-red-500
        `}
      }

      h2 {
        ${tw`
            ml-2
            text-gray-300
        `}
      }
    }
  }
`;

const RightContainer = styled.div`
  ${tw`
    p-6
    w-full
    md:flex-grow
    bg-gray-800
    rounded-md
  `}

  h1 {
    ${tw`
        mb-4
        text-xl
        font-semibold
        text-gray-200
    `}
  }

  .input-item {
    ${tw`
        mb-4
        flex
        flex-col
    `}

    h2 {
      ${tw`
        text-lg
        text-gray-200
      `}
    }

    input {
      ${tw`
        py-1
        px-2
        w-full
        md:max-w-xs
        border-b
        text-gray-300
        bg-transparent
        focus:outline-none
      `}
    }
  }

  .btn {
    ${tw`
        flex
        items-center
        justify-center
        py-1
        w-full
        md:max-w-[14rem]
        text-lg
        bg-blue-700
        text-gray-200
        font-semibold
        rounded-sm
      `}
  }
`;

export default UserProfile;
