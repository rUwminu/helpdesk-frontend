import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import moment from 'moment'

const TicketPanel = () => {
  return (
    <Container>
      <div className='inner-container'>
        <div className='top-container'>
          <CardContainer>
            <h1>Ticket Completion</h1>
            <div className='info-box'>
              <span className='to-top'>12</span>
              <div className='stroke' />
              <span className='to-bot'>16</span>
            </div>
          </CardContainer>
          <CardContainer>
            <h1>Ticket Urgent</h1>
            <div className='info-box'>
              <span className='to-top'>12</span>
              <div className='stroke' />
              <span className='to-bot'>16</span>
            </div>
          </CardContainer>
          <CardContainer>
            <h1>Ticket Completion</h1>
            <div className='info-box'>
              <span className='to-top'>12</span>
              <div className='stroke' />
              <span className='to-bot'>16</span>
            </div>
          </CardContainer>
        </div>
        <div className='mid-container'>
          <ChartContainer></ChartContainer>
        </div>
        <div className='bot-container'>
          <RoundChartContainer></RoundChartContainer>
          <TicketTypeListContainer></TicketTypeListContainer>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    pt-28
    w-screen
    h-screen
    bg-gray-900
  `}

  .inner-container {
    ${tw`
        px-4
        xl:px-0
        mx-auto
        h-full
        w-full
        max-w-7xl
        flex
        flex-col
        items-start
        justify-between
    `}
  }

  .top-container {
    ${tw`
        flex
        flex-wrap
        items-center
        justify-between
        w-full
    `}
  }

  .mid-container {
    ${tw`
        w-full
    `}
  }

  .bot-container {
    ${tw`
        flex
        flex-wrap
        items-center
        justify-between
    `}
  }
`

const CardContainer = styled.div`
  ${tw`
    mb-4
    p-6
    w-full
    md:max-w-sm
    bg-gray-700
    text-gray-200
    rounded-md
  `}

  h1 {
    ${tw`
        text-xl
        md:text-2xl
        font-semibold
    `}
  }

  .info-box {
    ${tw`
        mx-auto
        flex
        items-center
        justify-center
        h-36
        w-36
    `}

    .stroke {
      ${tw`
        mx-4
        w-1
        h-full
        bg-gray-200
        rotate-[24deg]
      `}
    }

    span {
      ${tw`
        text-5xl
      `}
    }

    .to-top {
      ${tw`
        mb-10
        text-green-600
      `}
    }

    .to-bot {
      ${tw`
        mt-10
        text-red-600
      `}
    }
  }
`

const ChartContainer = styled.div`
  ${tw``}
`

const RoundChartContainer = styled.div`
  ${tw``}
`

const TicketTypeListContainer = styled.div`
  ${tw``}
`

export default TicketPanel
