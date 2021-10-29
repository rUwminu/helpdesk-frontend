import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import ErrCA from '../../assets/Svg/ErrCA.svg'

const ErrorPage = () => {
  const history = useHistory()
  return (
    <Container>
      <img className='err-svg' src={ErrCA} alt='' />
      <h1>
        I Know There A <span className='cat-text'>Cat</span> Here. But Come{' '}
        <span
          onClick={() => history.push('/helpdesk-frontend/home')}
          className='link'
        >
          Back Here
        </span>
        ...
      </h1>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    px-6
    w-full
    h-full
    min-h-[100vh]
    flex
    flex-col
    items-center
    justify-center
    bg-gray-600
  `}

  .err-svg {
    ${tw`
        w-full
        max-w-xl
    `}
  }

  h1 {
    ${tw`
        text-center
        text-3xl
        md:text-4xl
        font-semibold
        text-gray-200
    `}

    .cat-text {
      ${tw`
        text-blue-400
      `}
    }

    .link {
      ${tw`
        text-green-500
        cursor-pointer
        transition
        duration-200
        ease-in-out

        hover:text-green-400
      `}
    }
  }
`

export default ErrorPage
