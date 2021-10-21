import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

// Icons
import { DeleteOutline } from "@mui/icons-material";

// Svg & Images
import Avatar from "../../assets/image/avatar.jpg";

// Redux Action
import { getAllUser } from "../../redux/action/userAction";

const UserPanel = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { allUser } = userList;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const { data } = useQuery(GET_ALL_USERS, {
    context: {
      headers: {
        Authorization: `Bearer${" "}${user.token}`,
      },
    },
  });

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
            <img src={Avatar} alt="" />
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <EditButton>
            <Link to={`/helpdesk-frontend/user/${params.row.id}`}>
              <button>Edit</button>
            </Link>

            <DeleteOutline className="delete-icons" />
          </EditButton>
        );
      },
    },
  ];

  //console.log(allUser);

  return (
    <SectionContainer>
      <Container>
        <h1>User List</h1>
        {allUser.length > 0 && (
          <DataGrid
            rows={allUser}
            columns={columns}
            disableSelectionOnClick
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r.id}
            className="grid-style"
          />
        )}
        <Link to="/helpdesk-frontend/new_user" className="add-btn">
          Create
        </Link>
      </Container>
    </SectionContainer>
  );
};

const GET_ALL_USERS = gql`
  {
    getUsers {
      id
      username
      email
    }
  }
`;

const SectionContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    w-full
    h-full
    min-h-[100vh]
    bg-gray-900
  `}
`;

const Container = styled.div`
  ${tw`
    pt-28
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
        text-gray-200 
        bg-gray-800
    `}
  }
`;

const UserProfile = styled.div`
  ${tw`
    flex
    items-center
    justify-start
  `}

  img {
    ${tw`
        mr-2
        w-10
        h-10
        rounded-full
        object-cover
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

export default UserPanel;