import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'

// redux
import { useDispatch } from 'react-redux'
import { register } from '../../redux/action/userAction'

// Icons
import { CheckCircle, CloudUpload, Close } from '@mui/icons-material'

const UserCreate = ({ setIsSideActive }) => {
  const dispatch = useDispatch()

  const InputState = {
    username: '',
    email: '',
    department: '',
    password: '',
    confirmPassword: '',
  }
  const [isActive, setIsActive] = useState(false)
  const [inputValue, setInputValue] = useState(InputState)
  const [isError, setIsError] = useState(null)

  const [registerUser] = useMutation(REGISTER_NEW_USER, {
    update(_, { data: { register: userData } }) {
      dispatch(register(userData))
    },
    onError(err) {
      setIsError(err)
    },
    variables: inputValue,
  })

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const handleCreate = () => {
    setIsError(null)

    if (
      inputValue.username !== '' &&
      inputValue.email !== '' &&
      inputValue.department !== '' &&
      inputValue.password !== '' &&
      inputValue.confirmPassword !== ''
    ) {
      setIsActive(true)
      registerUser()
    } else {
      setIsError({ error: 'Please Check Your Input' })
    }

    setTimeout(() => {
      setIsActive(false)
    }, 13000)
  }

  return (
    <Container>
      <div className='top-container'>
        <div onClick={() => setIsSideActive(false)} className='close-btn'>
          <Close className='icon' />
        </div>
      </div>
      <form className='input-container'>
        <h1>
          Create <span>New User</span>
        </h1>
        <div className='input-items'>
          <input
            onChange={handleChange}
            type='text'
            name='username'
            value={inputValue.username}
            required
          />
          <span>Username</span>
        </div>
        <div className='input-items'>
          <input
            onChange={handleChange}
            type='text'
            name='email'
            value={inputValue.email}
            required
          />
          <span>User Email</span>
        </div>
        <div className='input-items'>
          <input
            onChange={handleChange}
            type='text'
            name='department'
            value={inputValue.department}
            required
          />
          <span>Department</span>
        </div>
        <div className='input-items'>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            value={inputValue.password}
            required
          />
          <span>Password</span>
        </div>
        <div className='input-items'>
          <input
            onChange={handleChange}
            type='password'
            name='confirmPassword'
            value={inputValue.confirmPassword}
            required
          />
          <span>Confirm Password</span>
        </div>
        <UploadBtn
          onClick={() => handleCreate()}
          className={`${isActive && 'active'}`}
        >
          <div className='completed'>
            <CheckCircle className='icons' />
            <span>Completed</span>
          </div>
          <div className='upload'>
            <CloudUpload className='icons' />
            <span>Create</span>
          </div>
        </UploadBtn>
      </form>
    </Container>
  )
}

const REGISTER_NEW_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $department: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        department: $department
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      department
    }
  }
`

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

  // Button Animation --------------------
  .active {
    width: 100%;
    height: 15px;
    animation: btn_width 4.5s linear forwards;
    animation-delay: 5s;
  }

  .active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: #5c5cff;
    animation: before_active 10s linear forwards;
    animation-delay: 1.5s;
  }

  .active::after {
    content: 'Done';
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    font-size: 0.8rem;
    transform: translate(-50%, -50%) scale(0);
    transition: 0.3s;
    animation: check_scale 2s linear forwards;
    animation-delay: 8.5s;
  }

  .active .completed {
    animation: top_bottom 1.3s linear forwards;
    animation-delay: 6.5s;
  }

  .active .upload {
    transform: translate(-50%, 60px);
    animation: bottom_top 0.5s linear forwards;
    animation-delay: 12s;
  }

  @keyframes before_active {
    0% {
      width: 0%;
      height: 100%;
    }
    30%,
    95% {
      width: 100%;
      height: 100%;
    }
    100% {
      width: 100%;
      height: 0%;
    }
  }

  @keyframes btn_width {
    0% {
      width: 100%;
      height: 15px;
    }
    20%,
    70% {
      width: 176px;
      height: 40px;
    }
    80%,
    90% {
      width: 50px;
      height: 50px;
    }
    100% {
      width: 176px;
      height: 40px;
    }
  }

  @keyframes top_bottom {
    0% {
      transform: translate(-50%, -60px);
    }
    20%,
    90% {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    100% {
      top: 130%;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes bottom_top {
    0% {
      transform: translate(-50%, 60px);
    }
    20%,
    90% {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }

  @keyframes check_scale {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    20%,
    90% {
      transform: translate(-50%, -50%) scale(1.3);
    }
    100% {
      transform: translate(-50%, 100px) scale(1.3);
    }
  }
`

const UploadBtn = styled.div`
  ${tw`
    relative
    w-[176px]
    h-[40px]
    text-lg
    bg-gray-600
    text-gray-400
    font-semibold
    cursor-pointer
    rounded-3xl

    ease-in-out
    overflow-hidden
  `}

  transition: 0.8s;
  transition-delay: 0.5s;

  .icons {
    ${tw`
        w-6
        h-6
        mr-2
    `}
  }

  .completed {
    ${tw`
        absolute
        top-[0%]
        left-[50%]
        flex
        items-center
        justify-center
        text-gray-900
    `}
    transform: translate(-50%, -60px);
    white-space: nowrap;
  }

  .upload {
    ${tw`
        absolute
        top-[50%]
        left-[50%]
        flex
        items-center
        justify-center
    `}
    transition: 0.3s;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
`

export default UserCreate
