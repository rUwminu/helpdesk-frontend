import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'

import { createNewComment } from '../../redux/action/ticketAction'

const CREATE_NEW_COMMENT = gql`
  mutation createComment($ticketId: ID!, $body: String!) {
    createComment(ticketId: $ticketId, body: $body) {
      username
    }
  }
`

const CommentBox = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  //const [getId, setGetId] = useState()

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const InputState = {
    ticketId: '',
    username: user.username,
    body: '',
    createdAt: Date.now(),
  }
  const [inputValue, setInputValue] = useState(InputState)

  const [createComment] = useMutation(CREATE_NEW_COMMENT, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
    update(_, { data }) {
      if (data) {
        dispatch(createNewComment(inputValue))
      }
    },
    onError(err) {
      console.log(err)
      dispatch(createNewComment('error'))
    },
    variables: inputValue,
  })

  useEffect(() => {
    inputValue.ticketId = id.toString()
  }, [id])

  return (
    <Container>
      <h1>Create Comment</h1>
      <div className='input-items'>
        <textarea
          onChange={(e) =>
            setInputValue({
              ...inputValue,
              body: e.target.value,
            })
          }
          rows='4'
          cols='50'
          required
        />
        <span>Write Your Comment Here...</span>
      </div>

      <div
        onClick={() => createComment()}
        className={`btn ${inputValue.body !== '' ? 'w-full ' : 'w-0 h-0 '}`}
      >
        Create
      </div>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    flex
    flex-col
    items-start
    justify-start
    mt-6
    w-full
  `}

  h1 {
    ${tw`
        mb-4
        text-base
        md:text-lg
        text-gray-200
        font-semibold
    `}
  }

  .input-items {
    ${tw`
      relative
      w-full
      mb-3
      border
      border-gray-400
      rounded-sm
    `}

    textarea {
      ${tw`
        pt-6
        pb-4
        px-4
        w-full
        text-gray-200
        bg-transparent
        focus:outline-none
      `}
    }

    span {
      ${tw`
        absolute
        py-2
        left-4
        text-gray-400
        transition
        duration-500
        ease-in-out
      `}
      pointer-events: none;
    }

    textarea:focus ~ span,
    textarea:valid ~ span {
      ${tw`
          text-sm
          text-gray-400
          translate-y-[-10px]
        `}
    }
  }

  .btn {
    ${tw`
        md:max-w-[14rem]
        py-2
        ml-auto
        text-lg
        text-center
        font-semibold
        bg-blue-600
        text-gray-200
        rounded-sm
        overflow-hidden
        transition-all
        duration-200
        ease-in-out
        cursor-pointer
        hover:bg-blue-700
    `}
  }
`

export default CommentBox
