import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams, Link, useHistory } from "react-router-dom";
import moment from "moment";

// Redux
import { getSingleUser, deleteUser } from "../../redux/action/userAction";

//Icon class
import {
  MarkEmailRead,
  AdminPanelSettings,
  ChevronLeft,
  CheckCircle,
  CheckCircleOutline,
} from "@mui/icons-material";

const UserProfile = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({});
  const [ticketList, setTicketList] = useState([]);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const userProfile = useSelector((state) => state.userList);
  const { userInfo } = userProfile;

  const { data } = useQuery(GET_USER_INFO, {
    variables: { userId: id.toString() },
  });

  const { data: userTicket } = useQuery(GET_USER_TICKETS, {
    context: {
      headers: {
        Authorization: `Bearer${" "}${user.token}`,
      },
    },
    variables: { userId: id.toString() },
  });

  const [UpdateProfileDetail, { loading: UpdatedLoading }] = useMutation(
    UPDATE_USER_PROFILE,
    {
      context: {
        headers: {
          Authorization: `Bearer${" "}${user.token}`,
        },
      },
      update(_, { data: { updateProfile: UpdatedData } }) {
        dispatch(getSingleUser(UpdatedData));
      },
      onError(err) {
        console.log(err);
      },
      variables: { ...inputValue, userId: id.toString() },
    }
  );

  const [DeleteUserAccount] = useMutation(DELETE_USER_ACCOUNT, {
    context: {
      headers: {
        Authorization: `Bearer${" "}${user.token}`,
      },
    },
    update() {
      if (user.isAdmin) {
        if (user.id === id) {
          history.push("/helpdesk-frontend/login");
        } else {
          const asyncFunction = async () => {
            await dispatch(deleteUser(id));
            await history.push("/helpdesk-frontend/user_panel");

            window.location.reload();
          };
          asyncFunction();
        }
      } else {
        history.push("/helpdesk-frontend/login");
      }
    },
    onError(err) {
      console.log(err);
    },
    variables: { userId: id.toString() },
  });

  useEffect(() => {
    if (data) {
      dispatch(getSingleUser(data.getUser));
    }
  }, [data]);

  useEffect(() => {
    //console.log(userTicket.getTargetTicket);
    if (userTicket) {
      setTicketList(userTicket.getTargetTicket);
    }
  }, [userTicket]);

  //console.log(data);

  const getFirstCharaterOfUsername = (username) => {
    const FC = username.split(" ");

    return FC[0].slice(0, 1) + FC[1].slice(0, 1);
  };

  const getTitleFromBody = (body) => {
    const title = body.slice(0, 30);

    return title;
  };

  const handleUpdateProflie = async () => {
    await UpdateProfileDetail();
  };

  // const handleRirect = async (location) => {
  //   await history.push(`${location}`);

  //   window.location.reload();
  // };

  return (
    <SectionContainer>
      <Container>
        <div className="title-container">
          <h1 className="title">User Profile</h1>
          <Link
            to={
              user.isAdmin
                ? "/helpdesk-frontend/user_panel"
                : "/helpdesk-frontend/home"
            }
            className="back-btn"
          >
            <ChevronLeft className="back-icon" />
            Back
          </Link>
        </div>

        <div className="info">
          {userInfo && (
            <>
              <LeftContainer>
                <div className="user-info-card">
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
                </div>
                <div className="recent-ticket-card">
                  <h1 className="card-title">Recent Ticket</h1>
                  {ticketList.length === 0 && (
                    <h2 className="ph-title">
                      No Ticket Yet. How <span>Amazing</span>!
                    </h2>
                  )}
                  <div className="card-container">
                    {ticketList &&
                      ticketList.map((ticket) => {
                        const { id, body, isResolved, createdAt } = ticket;

                        return (
                          <div className="ticket-card" key={id}>
                            <h1>{getTitleFromBody(body)}...</h1>
                            <div className="card-detail">
                              <div>
                                <h2>Posted on</h2>
                                <small>
                                  {moment(createdAt).format("Do MMM YYYY")}
                                </small>
                              </div>
                              {isResolved ? (
                                <div className="status green">
                                  <CheckCircle className="icon" />
                                  Resolved
                                </div>
                              ) : (
                                <div className="status red">
                                  <CheckCircleOutline className="icon" />
                                  Not Resolve
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </LeftContainer>

              <RightContainer>
                <div className="edit-profile-card">
                  <h1>Edit user Profile</h1>
                  <div className="input-item">
                    <h2>Username</h2>
                    <input
                      onChange={(e) =>
                        setInputValue({
                          ...inputValue,
                          username: e.target.value,
                        })
                      }
                      placeholder={userInfo.username}
                      name="username"
                    />
                  </div>
                  <div className="input-item">
                    <h2>Email</h2>
                    <input
                      onChange={(e) =>
                        setInputValue({
                          ...inputValue,
                          email: e.target.value,
                        })
                      }
                      placeholder={userInfo.email}
                      name="email"
                    />
                  </div>
                  <div className="input-item">
                    <h2>Password</h2>
                    <input
                      onChange={(e) =>
                        setInputValue({
                          ...inputValue,
                          password: e.target.value,
                        })
                      }
                      placeholder="Atleast 6 Charater"
                      name="password"
                    />
                  </div>
                  <div className="input-item">
                    <h2>Confirm Password</h2>
                    <input
                      onChange={(e) =>
                        setInputValue({
                          ...inputValue,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Retype Your Password"
                      name="confirmPassword"
                    />
                  </div>

                  {Object.keys(inputValue).length > 0 && (
                    <div onClick={() => handleUpdateProflie()} className="btn">
                      Update
                    </div>
                  )}
                </div>
                <div className="danger-zone-card">
                  <h1>Danger Zone</h1>
                  <div className="list-items">
                    <h2>Permanent Remove Account?</h2>
                    <div
                      onClick={() => DeleteUserAccount()}
                      className="del-btn"
                    >
                      Remove
                    </div>
                  </div>
                </div>
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

const GET_USER_TICKETS = gql`
  query getTargetTicket($userId: ID!) {
    getTargetTicket(userId: $userId) {
      id
      body
      isResolved
      createdAt
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation updateProfile(
    $userId: ID!
    $username: String
    $email: String
    $password: String
    $confirmPassword: String
  ) {
    updateProfile(
      userId: $userId
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      username
      email
      department
      isAdmin
    }
  }
`;

const DELETE_USER_ACCOUNT = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
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
    flex
    flex-col
    mb-6
    md:mb-0
    md:mr-6
    w-full
    md:max-w-md
    
  `}

  .user-info-card {
    ${tw`
      mb-6
      p-6
      w-full
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
  }

  .recent-ticket-card {
    ${tw`
      p-6
      w-full
      h-full
      flex
      flex-col
      bg-gray-800
      rounded-md
    `}

    .card-title {
      ${tw`
        mb-4
        text-lg
        md:text-xl
        font-semibold
        text-gray-200
      `}
    }

    .ph-title {
      ${tw`
        text-gray-200
      `}

      span {
        ${tw`
          text-green-500
        `}
      }
    }

    .card-container {
      ${tw`
        max-h-[13.5rem]
        w-full
        overflow-y-scroll
        scrollbar-hide
      `}
    }

    .ticket-card {
      ${tw`
        mb-4
        p-4
        h-full
        w-full
        flex
        flex-col
        bg-gray-900
        rounded-md
      `}

      h1 {
        ${tw`
          mb-2
          text-gray-200
        `}
      }

      .card-detail {
        ${tw`
          mb-2
          flex
          items-center
          justify-between
        `}

        h2 {
          ${tw`
            text-gray-200
          `}
        }

        small {
          ${tw`
            text-gray-400
          `}
        }

        .status {
          ${tw`
            flex
            items-center
          `}

          .icon {
            ${tw`
              mr-2
            `}
          }
        }

        .status.green {
          ${tw`
            text-green-500
          `}
        }

        .status.red {
          ${tw`
            text-red-500
          `}
        }
      }
    }
  }
`;

const RightContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-col
    md:flex-grow   
  `}

  .edit-profile-card {
    ${tw`
      flex
      flex-col
      mb-6
      p-6
      w-full
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
        `}

        :focus, :active {
          ${tw`
            bg-transparent
            outline-none
          `}
        }
      }
    }

    .btn {
      ${tw`
        flex
        items-center
        justify-center
        mt-4
        py-[6px]
        w-full
        md:max-w-[14rem]
        text-lg
        bg-blue-700
        text-gray-200
        font-semibold
        rounded-sm
        cursor-pointer

        transition
        duration-200
        ease-in-out

        hover:bg-blue-800
        hover:shadow-md
      `}
    }
  }

  .danger-zone-card {
    ${tw`
      flex
      flex-col
      p-6
      w-full
      bg-gray-800
      rounded-md
    `}

    h1 {
      ${tw`
        mb-4
        text-lg
        md:text-xl
        font-semibold
        text-red-600
      `}
    }

    .list-items {
      ${tw`
        w-full
        flex
        items-center
        justify-between
      `}

      h2 {
        ${tw`
          text-gray-200
        `}
      }

      .del-btn {
        ${tw`
          py-1
          px-8
          font-semibold
          bg-red-600
          text-gray-200
          rounded-md
          cursor-pointer

          transition
          duration-200
          ease-in-out

          hover:bg-red-700
          hover:shadow-md
        `}
      }
    }
  }
`;

export default UserProfile;
