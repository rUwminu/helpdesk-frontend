import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gql } from "@apollo/client";
import { useMutation, useLazyQuery } from "@apollo/client";

// Icons
import { DeleteOutline } from "@mui/icons-material";

// Svg & Images
//import Avatar from '../../assets/image/avatar.jpg'

// Utils
import getFirstCharaterOfUsername from "../../utils/getFirstCharOfUsername";

// Components
import { NewUser } from "../../components/index";

// Redux Action
import { getAllUser, deleteUser } from "../../redux/action/userAction";

const UserPanel = () => {
  // const history = useHistory();
  // const location = useLocation();
  const dispatch = useDispatch();
  const [isSideActive, setIsSideActive] = useState(false);

  const userList = useSelector((state) => state.userList);
  const { allUser } = userList;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const [getUserList, { data }] = useLazyQuery(GET_ALL_USERS, {
    context: {
      headers: {
        Authorization: `Bearer${" "}${user.token}`,
      },
    },
  });

  const [DeleteUserAccount] = useMutation(DELETE_USER_ACCOUNT);

  const handleDeleteUser = (id) => {
    DeleteUserAccount({
      context: {
        headers: {
          Authorization: `Bearer${" "}${user.token}`,
        },
      },
      update() {
        dispatch(deleteUser(id));
      },
      onError(err) {
        console.log(err);
      },
      variables: { userId: id },
    });
  };

  useEffect(() => {
    getUserList();
  }, [allUser]);

  // Refresh pages everytime this page is view
  // useEffect(() => {
  //   history.listen((location) => {
  //     getUserList();
  //     console.log(`You changed the page to: ${location.pathname}`);
  //   });
  // }, [history]);

  useEffect(() => {
    if (data) {
      dispatch(getAllUser(data.getUsers));
    }
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "Full name",
      width: 200,
      renderCell: (params) => {
        return (
          <UserProfile>
            <div className="user-logo">
              {getFirstCharaterOfUsername(params.row.username)}
            </div>
            {params.row.username}
          </UserProfile>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 180,
    },
    {
      field: "department",
      headerName: "Position",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <EditButton>
            <Link to={`/helpdesk-frontend/user/${params.row.id}`}>
              <button>Edit</button>
            </Link>

            <DeleteOutline
              onClick={() => handleDeleteUser(params.row.id)}
              className="delete-icons"
            />
          </EditButton>
        );
      },
    },
  ];

  //console.log(data);

  return (
    <SectionContainer>
      <Container>
        <h1>User List</h1>
        {allUser.length > 0 && (
          <DataGrid
            rows={allUser && allUser}
            columns={columns}
            disableSelectionOnClick
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r.id}
            className="grid-style"
          />
        )}
        <div onClick={() => setIsSideActive(true)} className="add-btn">
          Create
        </div>
      </Container>
      <AbsoluteSideContainer
        className={isSideActive ? "translate-x-0" : "translate-x-full"}
      >
        {isSideActive && (
          <NewUser
            isSideActive={isSideActive}
            setIsSideActive={setIsSideActive}
          />
        )}

        <div
          onClick={() => setIsSideActive(false)}
          className={`blur-bg ${
            isSideActive ? "translate-x-0" : "translate-x-full"
          }`}
        />
      </AbsoluteSideContainer>
    </SectionContainer>
  );
};

const GET_ALL_USERS = gql`
  {
    getUsers {
      id
      username
      email
      department
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
    relative
    flex
    items-start
    justify-center
    w-screen
    min-h-[100vh]
    bg-gray-900
  `}
`;

const Container = styled.div`
  ${tw`
    pt-36
    px-4
    xl:px-0
    h-full
    min-h-[25rem]
    w-full
    max-w-5xl
    flex
    flex-col
    flex-grow
    justify-end
    overflow-hidden
    overflow-y-auto
    scrollbar-hide
  `}

  h1 {
    ${tw`
        mb-4
        text-2xl
        md:text-3xl
        font-semibold
        text-gray-200
    `}
  }

  .add-btn {
    ${tw`
        w-48
        mt-4
        ml-auto
        py-[6px]
        px-5
        text-lg
        text-center
        text-white
        font-semibold
        bg-green-600
        rounded-md
        cursor-pointer
        transition
        duration-200
        ease-in-out
    `}

    :hover {
      ${tw`
        text-black
        bg-green-500
      `}
    }
  }

  .grid-style {
    ${tw`
        h-full 
        min-h-[24rem] 
        text-gray-900 
        bg-gray-50
        border-gray-400
    `}

    .checkbox {
      ${tw`
        border-gray-400
      `}
    }
  }
`;

const UserProfile = styled.div`
  ${tw`
    flex
    items-center
    justify-start
  `}

  .user-logo {
    ${tw`
        mr-2
        w-10
        h-10
        flex
        items-center
        justify-center
        border-2
        bg-blue-600
        border-gray-600
        rounded-full
    `}
  }
`;

const EditButton = styled.div`
  ${tw`
    flex
    items-center
    justify-center
  `}

  button {
    ${tw`
        mr-3
        flex
        items-center
        justify-center
        h-6
        w-10
        font-semibold
        text-green-700
        bg-gray-300
        rounded-md
        hover:text-green-800
        hover:bg-green-300
        transition
        duration-200
        ease-in-out
    `}
  }

  .delete-icons {
    ${tw`
        p-2
        h-10
        w-10
        text-red-600
        cursor-pointer
        rounded-full
        transition
        duration-200
        ease-in-out

        hover:bg-gray-700
        bg-opacity-50
    `}
  }
`;

const AbsoluteSideContainer = styled.div`
  ${tw`
    absolute
    top-0
    right-0
    flex
    items-center
    justify-center
    h-full
    w-full
    sm:max-w-md
    bg-gray-800
    shadow-md
    z-30

    transition
    duration-500
    ease-in-out
  `}

  .blur-bg {
    ${tw`
      absolute
      top-0
      right-0
      w-screen
      h-full
      min-h-[100vh]
      bg-gradient-to-l
      from-gray-700
      via-gray-700
      to-transparent
      opacity-50
      z-10
 
      transition-all
      duration-200
      ease-in-out
    `}
  }
`;

export default UserPanel;
