import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Sidebar, JobCard, JobInfo } from '../../components/index'

// Icon
// import { ExpandMore } from "@mui/icons-material";

const Home = () => {
  const [isMedium, setIsMedium] = useState(false)
  const [isSmall, setIsIsSmall] = useState(false)

  const handleCheckWidthM = () => {
    let windowWidth = window.innerWidth

    if (windowWidth < 1185) {
      setIsMedium(true)
    } else if (windowWidth > 1185) {
      setIsMedium(false)
    }
  }

  const handleCheckWidthS = () => {
    let windowWidth = window.innerWidth

    if (windowWidth < 994) {
      setIsIsSmall(true)
    } else if (windowWidth > 994) {
      setIsIsSmall(false)
    }
  }

  useEffect(() => {
    handleCheckWidthM()
    handleCheckWidthS()
    window.addEventListener('resize', handleCheckWidthM)
    window.addEventListener('resize', handleCheckWidthS)
  }, [])

  return (
    <Container>
      <InnerContainer>
        <div className='bottom-container'>
          {!isMedium && <Sidebar />}

          <JobCard
            location={`${isSmall ? 'ticket_detail' : 'home'}`}
            isMedium={isMedium}
          />

          {!isSmall && <JobInfo />}
        </div>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.section`
  ${tw`
    pt-28
    pb-10
    min-h-screen
    w-full
    flex
    items-start
    justify-center
    bg-gray-900
  `}
`

const InnerContainer = styled.div`
  ${tw`
    mx-auto
    h-full
    w-full
    md:max-w-7xl
    flex
    flex-col
    items-end
    justify-center
  `}

  .top-container {
    ${tw`
      pt-14
      px-4
      relative
    `}

    .btn {
      ${tw`
        flex
        items-center
        justify-between
        py-2
        px-3
        w-32
        bg-gray-800
        rounded-md
        transition
        duration-200
        ease-in-out
        hover:bg-gray-600
      `}

      h2 {
        ${tw`
          text-xl
          font-semibold
          text-gray-200
        `}
      }

      .filter-icon {
        ${tw`
          ml-2
          text-3xl
          text-gray-200
        `}
      }
    }
  }

  .bottom-container {
    ${tw`
      w-full
      flex
      items-start
      justify-around
      xl:justify-between
      overflow-y-hidden
    `}
  }
`

export default Home
