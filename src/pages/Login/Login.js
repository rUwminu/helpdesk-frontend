import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import tw from 'twin.macro'

import { useDispatch } from 'react-redux'
import { signin, register } from '../../redux/action/userAction'

// SVG
import InfoSvg from '../../assets/Svg/intouch.svg'

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      department
      isAdmin
      token
    }
  }
`

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isError, setIsError] = useState({})
  const InputState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [inputValue, setInputValue] = useState(InputState)

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      history.push('/helpdesk-frontend/home')
      dispatch(signin(userData))
    },
    onError(err) {
      setIsError(err.graphQLErrors[0].extensions.errors)
    },
    variables: inputValue,
  })

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  const handlerClick = (e) => {
    e.preventDefault()
    setIsError({})
    loginUser()
  }

  console.log(isError)

  return (
    <Container>
      <InnerContainer>
        <LeftContainer>
          <h1>
            Login To <span>HelpDesk</span>
          </h1>
          <div
            className={`input-items ${
              isError.username ? 'border-red-500' : 'border-gray-400'
            }`}
          >
            <input
              onChange={handleChange}
              type='text'
              name='email'
              value={inputValue.email}
              required
            />
            <span>Your Email</span>
          </div>
          {isError.username && (
            <div className='err-list'>{isError.username}</div>
          )}
          <div
            className={`input-items ${
              isError.password ? 'border-red-500' : 'border-gray-400'
            }`}
          >
            <input
              onChange={handleChange}
              type='password'
              name='password'
              value={inputValue.password}
              required
            />
            <span>Password</span>
          </div>
          {isError.password && (
            <div className='err-list'>{isError.password}</div>
          )}
          {isError && <div className='err-items'></div>}
          <button onClick={(e) => handlerClick(e)}>Login</button>
        </LeftContainer>
        <RightContainer>
          <img src={InfoSvg} alt='' className='svg' />
        </RightContainer>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    w-screen
    h-screen
  `}
`

const InnerContainer = styled.div`
  ${tw`
    px-4
    lg:px-0
    
    w-full
    md:max-w-6xl
    flex
    flex-col-reverse
    md:flex-row
    items-center
    justify-center
  `}
`

const LeftContainer = styled.div`
  ${tw`
    mt-4
    md:mt-0
    w-full
    flex
    flex-col
    items-center
    md:items-start
    justify-center
  `}

  h1 {
    ${tw`
      text-2xl
      md:text-3xl
    `}

    span {
      ${tw`
        text-blue-700
      `}
    }
  }

  .input-items {
    ${tw`
      relative
      w-full
      max-w-md
      mt-6
      border
      rounded-sm
      transition-all
      duration-200
      ease-in-out
    `}

    input {
      ${tw`
        py-4
        px-4
        w-full
        focus:outline-none
        valid:bg-none
      `}
    }

    span {
      ${tw`
        absolute
        py-4
        left-4
        text-gray-400
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
          text-gray-800
          translate-y-[-15px]
        `}
    }
  }

  .err-list {
    ${tw`
        ml-6
        list-item
        text-red-500
        font-semibold
      `}
  }

  .err-items {
    ${tw``}
  }

  button {
    ${tw`
        mt-6
        py-4
        w-full
        max-w-md
        text-xl
        text-center
        bg-gradient-to-r
        from-blue-800
        to-blue-500
        text-white
        transition
        duration-200
        ease-in-out
        rounded-sm
      `}

    :hover {
      ${tw`
          shadow-xl
        `}
    }
  }
`

const RightContainer = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    w-full
  `}

  .svg {
    ${tw`
      w-[22rem]
      md:w-full
      max-w-xl
    `}
  }
`

export default Login
