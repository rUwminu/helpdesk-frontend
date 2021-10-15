import React, { PureComponent, useState, useEffect, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'

import { productData } from '../../assets/dumpData/Data'

const LineChartComponent = ({ grid }) => {
  const Months = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  )

  const [isSmall, setIsSmall] = useState(false)
  const [ticketStat, setTicketStat] = useState([])

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const handleCheckWidthS = () => {
    let windowWidth = window.innerWidth

    if (windowWidth < 478) {
      setIsSmall(true)
    } else if (windowWidth > 478) {
      setIsSmall(false)
    }
  }

  const { data } = useQuery(GET_TICKET_STATS, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
  })

  const formatData = () => {
    const dataArray = [...data.getTicketStats]

    const sortedList = dataArray.sort(function (a, b) {
      return a._id - b._id
    })

    sortedList.map((item) =>
      setTicketStat((prev) => [
        ...prev,
        { name: Months[item._id - 1], 'Total Ticket': item.total },
      ])
    )
  }

  useEffect(() => {
    handleCheckWidthS()
    window.addEventListener('resize', handleCheckWidthS)
  }, [])

  useEffect(() => {
    if (data) {
      formatData()
    }
  }, [data])

  console.log(ticketStat)

  return (
    <>
      {ticketStat && (
        <Container>
          <h3 className='title'>Monthly Ticket Chart</h3>
          <ResponsiveContainer width={'100%'} height={200}>
            <LineChart data={ticketStat}>
              <XAxis dataKey='name' stroke='#C5C5C5' />
              <Line type='monotone' dataKey={'Total Ticket'} stroke='#D1D100' />
              <Tooltip />
              {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='5 5' />}
            </LineChart>
          </ResponsiveContainer>
        </Container>
      )}
    </>
  )
}

const GET_TICKET_STATS = gql`
  {
    getTicketStats {
      _id
      total
    }
  }
`

const Container = styled.div`
  ${tw`
    w-full
    py-4
    px-10
    bg-gray-800
    shadow-sm
    flex
    flex-col
    rounded-md
  `}

  .title {
    ${tw`
        md:text-lg
        lg:text-xl
    `}
  }
`

const TContainer = styled.div`
  ${tw``}
`

export default LineChartComponent
