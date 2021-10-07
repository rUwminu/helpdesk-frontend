import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ImgScreen = ({ index, state, toggle }) => {
  const { id } = useParams()

  const ticketList = useSelector((state) => state.ticketList)
  const { tickets } = ticketList

  const getImagefromTickets = () => {
    const ticket = tickets.find((x) => x.id === id)
    const tempImgArray = ticket.images

    console.log(tempImgArray[index])
    return tempImgArray[index]
  }

  return (
    <ImgBgContainer onClick={() => toggle()}>
      <img
        onClick={() => toggle()}
        className='img-view'
        src={getImagefromTickets()}
        alt='imgScreen'
      />
    </ImgBgContainer>
  )
}

const ImgBgContainer = styled.div`
  ${tw`
    absolute
    top-0
    left-0
    w-screen
    h-screen
    flex
    items-center
    justify-center
    bg-gray-800
    bg-opacity-50
  `}

  .img-view {
    ${tw`
        w-full
        max-w-[40rem]
        min-w-[16rem]
        object-cover
    `}
  }
`

export default ImgScreen
