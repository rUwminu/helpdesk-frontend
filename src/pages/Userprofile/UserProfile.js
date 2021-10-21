import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// Redux
import { getSingleUser } from "../../redux/action/userAction";

//Icon class
import { MarkEmailRead, AdminPanelSettings } from "@mui/icons-material";

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
        <h1 className="title">User Profile</h1>
        <div className="info">
          {userInfo && (
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
                <div className="list-item">
                  <MarkEmailRead className="icon mail" />
                  <h2>{userInfo.email}</h2>
                </div>
                <div className="list-item">
                  <AdminPanelSettings className="icon admin" />
                  <h2>
                    {userInfo.isAdmin ? "Admin Permission" : "Normal User"}
                  </h2>
                </div>
              </div>
            </LeftContainer>
          )}
          <RightContainer>
            <h1>Edit user Profile</h1>
            <div className="input-item">
              <h2>Username</h2>
              <input placeholder={userInfo.username} />
            </div>
            <div className="input-item">
              <h2>Username</h2>
              <input placeholder={userInfo.username} />
            </div>
            <div className="input-item">
              <h2>Username</h2>
              <input placeholder={userInfo.username} />
            </div>
            <div className="input-item">
              <h2>Username</h2>
              <input placeholder={userInfo.username} />
            </div>
          </RightContainer>
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

    .list-item {
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
        ${tw``}
      }

      .admin {
        ${tw``}
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
`;

export default UserProfile;
