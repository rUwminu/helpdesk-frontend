import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

//firebase
import storage from '../../firebase'
import { ref, listAll, deleteObject } from 'firebase/storage'

// Redux action
import { getAllTicketType } from '../../redux/action/ticketAction'

// components
import { PieChart, LineChartComponent } from '../../components/index'

// mui import
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// mui icons
import { ExitToApp, ViewDay } from '@mui/icons-material'

function CircularProgressWithLabel(props) {
  return (
    <Box className='relative w-full h-full'>
      <CircularProgress
        className='w-full h-full'
        variant='determinate'
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          className='text-2xl text-gray-200'
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
}

const TicketPanel = () => {
  const dispatch = useDispatch()
  const [reducedType, setReducedType] = useState([])

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const ticketList = useSelector((state) => state.ticketList)
  const { allTicketsType } = ticketList

  const [getTicketOnLoad, { data }] = useLazyQuery(GET_ALL_TICKETS, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
  })

  const [deleteAllTicketInDB] = useMutation(DELETE_ALL_TICKETS, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
    update(_, { data }) {
      alert(data.deleteAllTicket)
    },
  })

  const calAllTicketCompletePercentage = () => {
    const total = allTicketsType.length
    const completion = allTicketsType.filter((x) => x.isResolved === true)

    if (total.length !== 0) {
      const getpercentage = Math.round((100 / total) * completion.length)

      return getpercentage
    } else {
      return 0
    }
  }

  const calAllTicketIsUrgentPercentage = () => {
    const total = allTicketsType.filter((x) => x.isUrgent === true)
    const completion = allTicketsType.filter(
      (x) => x.isUrgent === true && x.isResolved === true
    )

    if (total.length !== 0) {
      const getpercentage = Math.round((100 / total.length) * completion.length)

      return getpercentage
    } else {
      return 0
    }
  }

  const getTypeValue = () => {
    const countType = allTicketsType.reduce((total, item) => {
      const { typeTicket } = item

      if (!typeTicket) {
        return total
      }

      if (!total[typeTicket]) {
        total[typeTicket] = { name: typeTicket, value: 1 }
      } else {
        total[typeTicket] = {
          ...total[typeTicket],
          value: total[typeTicket].value + 1,
        }
      }

      return total
    }, {})

    //console.log(Object.values(countType))

    setReducedType(Object.values(countType))

    return countType
  }

  const handleTicketCleanUp = async () => {
    // Clean up the firebase image storage
    const storageRef = ref(storage, `/items`)
    await listAll(storageRef)
      .then((res) => {
        res.items.forEach((item) => {
          const itemRef = ref(storage, `${item._location.path}`)

          deleteObject(itemRef)
            .then(() => {
              console.log('items delete')
            })
            .catch((error) => {
              console.log(error)
            })
        })
      })
      .catch((error) => {
        console.log(error)
      })

    // Clean up mongodb storage
    deleteAllTicketInDB()
  }

  useEffect(() => {
    if (allTicketsType.length === 0) {
      getTicketOnLoad()

      if (data) {
        dispatch(getAllTicketType(data.getTickets))
      }
    }
  }, [data])

  useEffect(() => {
    if (allTicketsType.length > 0) {
      getTypeValue()
    }
  }, [allTicketsType])

  return (
    <Container>
      <div className='inner-container'>
        <div className='title-container'>
          <h1 className='title'>Dashboard</h1>
          <div className='left-tags'>
            <div className='option-tag all'>
              <ViewDay className='icon' />
              <span>View Tickets</span>
            </div>
            <Link
              to='/helpdesk-frontend/ticket_report'
              className='option-tag report'
            >
              <ExitToApp className='icon' />
              <span>Get Report</span>
            </Link>
          </div>
        </div>

        <div className='top-container'>
          <div className='left-pie'>
            <CardContainer>
              <h1>Ticket Completion</h1>
              <div className='info-box'>
                <CircularProgressWithLabel
                  className='w-full h-full'
                  value={calAllTicketCompletePercentage()}
                />
              </div>
            </CardContainer>
            <CardContainer>
              <h1>Ticket Urgent</h1>
              <div className='info-box'>
                <CircularProgressWithLabel
                  className='w-full h-full'
                  value={calAllTicketIsUrgentPercentage()}
                />
              </div>
            </CardContainer>
            <CardContainer>
              <h1>Ticket Completion</h1>
              <div className='info-box'>
                <CircularProgressWithLabel
                  className='w-full h-full'
                  value={calAllTicketCompletePercentage()}
                />
              </div>
            </CardContainer>
          </div>
          <div className='right-pie'>
            <h1>Ticket Requested By Deparment</h1>
            {reducedType && <PieChart data={reducedType} />}
          </div>
        </div>
        <div className='mid-container'>
          <LineChartComponent grid />
        </div>
        <div className='bot-container'>
          <h1>Danger Zone</h1>
          <div className='del-card'>
            <p>
              This will clear up all the ticket in database.
              <br /> <span>*Only Perform this action on clean up day</span>
            </p>
            <div onClick={() => handleTicketCleanUp()} className='del-btn'>
              Remove All Tickets
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const GET_ALL_TICKETS = gql`
  {
    getTickets {
      id
      typeTicket
      isUrgent
      isResolved
    }
  }
`

const DELETE_ALL_TICKETS = gql`
  mutation deleteAllTicket {
    deleteAllTicket
  }
`

const Container = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    pt-28
    pb-16
    w-full
    bg-gray-900
    overflow-x-hidden
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
        justify-start
    `}

    .title-container {
      ${tw`
        mb-4
        w-full
        flex
        items-center
        justify-between
      `}

      .left-tags {
        ${tw`
          flex
          items-center
          justify-center
        `}

        .option-tag {
          ${tw`
            ml-2
            flex
            items-center
            justify-center

            rounded-full
            w-10
            h-10
            md:w-auto
            md:h-auto
            md:py-1
            md:px-4
            md:rounded-2xl

            transition
            duration-200
            ease-in-out
            cursor-pointer
          `}

          .icon {
            ${tw`
              text-gray-200
            `}
          }

          span {
            ${tw`
              ml-2
              hidden
              md:inline-flex
              text-gray-200
            `}
          }
        }

        .all {
          ${tw`
            bg-blue-600
            hover:bg-blue-700
          `}
        }

        .report {
          ${tw`
            bg-green-600
            hover:bg-green-700
          `}
        }
      }
    }

    .title {
      ${tw`
        text-2xl
        md:text-4xl
        text-gray-200
        font-semibold
      `}
    }
  }

  .top-container {
    ${tw`
        flex
        flex-col
        xl:flex-row
        items-center
        justify-between
        w-full
    `}

    .left-pie {
      ${tw`
        w-full
        flex
        flex-wrap
        items-start
        justify-center
        xl:justify-start
      `}
    }

    .right-pie {
      ${tw`
        py-4
        px-4
        w-full
        max-w-2xl
        flex
        flex-col
        items-center
        justify-center
        bg-gray-800
        rounded-md
      `}

      h1 {
        ${tw`
          mb-4
          text-2xl
          md:text-3xl
          text-gray-200
          font-semibold
        `}
      }
    }
  }

  .mid-container {
    ${tw`
        mt-6
        w-full
    `}
  }

  .bot-container {
    ${tw`
        py-6
        px-10
        mt-6
        w-full
        flex
        flex-col
        items-start
        justify-start
        bg-red-900
        bg-opacity-50
        rounded-md
    `}

    h1 {
      ${tw`
        mb-4
        text-lg
        md:text-xl
        lg:text-2xl
        text-red-600
        font-semibold
      `}
    }

    .del-card {
      ${tw`
        w-full
        flex
        flex-col
        md:flex-row
        md:items-center
        justify-between
      `}

      p {
        ${tw`
          text-gray-100
        `}

        span {
          ${tw`
            ml-4
            text-gray-300
          `}
        }
      }

      .del-btn {
        ${tw`
          mt-3
          md:mt-0
          py-2
          px-6
          text-center
          bg-red-800
          text-gray-200
          font-semibold
          rounded-md
          cursor-pointer
          transition
          duration-200
          ease-in-out

          hover:bg-red-700
        `}
      }
    }
  }
`

const CardContainer = styled.div`
  ${tw`
    mr-6
    mb-6
    py-4
    px-6
    w-[14rem]
    md:w-[16rem]
    bg-gray-800
    text-gray-200
    rounded-md
  `}

  h1 {
    ${tw`
        mb-4
        text-base
        md:text-xl
        font-semibold
    `}
  }

  .info-box {
    ${tw`
        relative
        mx-auto
        flex
        items-center
        justify-center
        h-16
        w-16
        md:h-20
        md:w-20
        mb-2
    `}
  }
`

export default TicketPanel
