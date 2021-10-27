import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

// redux
import { useDispatch } from "react-redux";
import { register } from "../../redux/action/userAction";

// Icons
import CloseIcon from "@mui/icons-material/Close";

const UserCreate = ({ setIsSideActive }) => {
  const dispatch = useDispatch();

  const InputState = {
    username: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  };
  const [inputValue, setInputValue] = useState(InputState);
  const [isError, setIsError] = useState(null);

  const [registerUser, { loading }] = useMutation(REGISTER_NEW_USER, {
    update(_, { data: { register: userData } }) {
      dispatch(register(userData));
    },
    onError(err) {
      console.log(err);
      setIsError(err);
    },
    variables: { registerInput: inputValue },
  });

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setIsError(null);

    if (
      inputValue.username !== "" &&
      inputValue.email !== "" &&
      inputValue.department !== "" &&
      inputValue.password !== "" &&
      inputValue.confirmPassword !== ""
    ) {
      registerUser();
    } else {
      setIsError({ error: "Please Check Your Input" });
    }
  };

  return (
    <Container>
      <div className="top-container">
        <div onClick={() => setIsSideActive(false)} className="close-btn">
          <CloseIcon className="icon" />
        </div>
      </div>
      <form className="input-container">
        <h1>
          Create <span>New User</span>
        </h1>
        <div className="input-items">
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={inputValue.username}
            required
          />
          <span>Username</span>
        </div>
        <div className="input-items">
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={inputValue.email}
            required
          />
          <span>User Email</span>
        </div>
        <div className="input-items">
          <input
            onChange={handleChange}
            type="text"
            name="department"
            value={inputValue.department}
            required
          />
          <span>Department</span>
        </div>
        <div className="input-items">
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={inputValue.password}
            required
          />
          <span>Password</span>
        </div>
        <div className="input-items">
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={inputValue.confirmPassword}
            required
          />
          <span>Confirm Password</span>
        </div>
        <button
          onClick={(e) => handleCreate(e)}
          type="submit"
          className="create-btn"
        >
          Create User
        </button>
      </form>
    </Container>
  );
};

const REGISTER_NEW_USER = gql`
  mutation register($registerInput: inputValue!) {
    register(registerInput: $registerInput) {
      id
      username
      email
      department
      isAdmin
    }
  }
`;

const Container = styled.div`
  ${tw`
    w-full
    px-6
    z-30
  `}

  .top-container {
    ${tw`
      w-full
      flex
      items-center
      justify-end
    `}

    .close-btn {
      ${tw`
        w-10
        h-10
        flex
        items-center
        justify-center
        rounded-md
        cursor-pointer
        hover:bg-gray-700
      `}

      .icon {
        ${tw`
          text-3xl
          text-gray-200
          pointer-events-none
        `}
      }
    }
  }

  .input-container {
    ${tw`
      w-full
      flex
      flex-col
      items-start
      justify-start
    `}

    h1 {
      ${tw`
      mb-6
      text-2xl
      md:text-3xl
      text-gray-300
      font-semibold
    `}

      span {
        ${tw`
        text-blue-600
      `}
      }
    }

    .input-items {
      ${tw`
      relative
      w-full
      max-w-md
      mb-8
      border
      border-gray-400
      rounded-sm
    `}

      input {
        ${tw`
        py-2
        md:py-3
        px-4
        w-full
        focus:outline-none
        valid:bg-none
      `}
      }

      span {
        ${tw`
        absolute
        py-2
        md:py-3
        left-4
        text-gray-600
        transition
        duration-500
        ease-in-out
      `}
        pointer-events: none;
      }

      input:focus ~ span,
      input:valid ~ span,
      textarea:focus ~ span,
      textarea:valid ~ span {
        ${tw`
          text-sm
          text-gray-900
          font-semibold
          translate-y-[-16px]
        `}
      }
    }
  }

  .create-btn {
    ${tw`
      py-3
      w-full
      text-xl
      text-center
      bg-green-600
      text-gray-200
      font-semibold
      rounded-sm
      cursor-pointer

      transition
      duration-200
      ease-in-out

      hover:bg-green-700
    `}
  }
`;

export default UserCreate;
