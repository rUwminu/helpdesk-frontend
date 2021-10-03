import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Sidebar, JobCard, JobInfo } from '../../components/index'

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
      <InnerContainer className={`${isMedium ? '' : ''}`}>
        {!isMedium && <Sidebar />}
        <JobCard />
        {!isSmall && <JobInfo />}
      </InnerContainer>
    </Container>
  )
}

const Container = styled.section`
  ${tw`
    w-full
    flex
    items-center
    justify-center
    bg-gray-900
    overflow-y-hidden
    scrollbar-hide
  `}
`

const InnerContainer = styled.div`
  ${tw`
    mx-auto
    pt-20
    h-full
    w-full
    md:max-w-7xl
    flex
    items-start
    justify-around
    xl:justify-between
    overflow-y-hidden
  `}
`

export default Home
