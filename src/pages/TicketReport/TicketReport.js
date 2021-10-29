import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import MaterialTable from 'material-table'
import XLSX from 'xlsx'
import moment from 'moment'

// Icons
import { ChevronLeft } from '@mui/icons-material'

const TicketReport = () => {
  const [ticketsList, setTicketsList] = useState([])

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  const { data } = useQuery(GET_COMPLETE_TICKETS, {
    context: {
      headers: {
        Authorization: `Bearer${' '}${user.token}`,
      },
    },
  })

  const getShortBody = (body) => {
    const title = body.slice(0, 60)

    return title
  }

  const columns = [
    { title: 'Name', field: 'username' },
    {
      title: 'Position',
      field: 'typeTicket',
    },
    {
      title: 'Description',
      field: 'body',
      render: (params) => {
        return <div>{getShortBody(params.body)}</div>
      },
    },
    {
      title: 'Resolved',
      field: 'isResolved',
      render: (params) => {
        return <div>{params.isResolved && 'Completed Ticket'}</div>
      },
    },
    {
      title: 'Date',
      field: 'updatedAt',
      render: (params) => {
        const date = params.updatedAt

        return <div>{moment(date).format('Do MMM YYYY')}</div>
      },
    },
  ]

  const exportToExcelFile = () => {
    const newdata = ticketsList.map((row) => {
      delete row.__typename
      delete row.id
      delete row.tableData

      return row
    })
    const workSheet = XLSX.utils.json_to_sheet(newdata)
    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Ticket Report')

    //Buffer
    let buf = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })
    //Binary string
    XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
    //Download
    XLSX.writeFile(workBook, 'TicektReport.xlsx')
  }

  useEffect(() => {
    if (data) {
      setTicketsList(data.getCompletedTickets.map((o) => ({ ...o })))
    }
  }, [data])


  return (
    <Container>
      <div className='inner-container'>
        <Link to='/helpdesk-frontend/ticket_panel' className='back-btn'>
          <ChevronLeft className='back-icon' />
          Go Back
        </Link>
        {ticketsList.length > 0 && (
          <MaterialTable
            title='Completed Tickets'
            columns={columns}
            data={ticketsList}
            actions={[
              {
                icon: () => <button>Export</button>,
                tooltip: 'Export to Excel',
                onClick: () => {
                  exportToExcelFile()
                },
                isFreeAction: true,
              },
            ]}
            options={{
              tableLayout: 'Auto',
            }}
          />
        )}
      </div>
    </Container>
  )
}

const GET_COMPLETE_TICKETS = gql`
  {
    getCompletedTickets {
      id
      username
      typeTicket
      body
      isResolved
      updatedAt
    }
  }
`

const Container = styled.div`
  ${tw`
    pt-36
    pb-14
    px-4
    lg:px-0
    w-full
    min-h-[100vh]
    bg-gray-900
  `}

  .inner-container {
    ${tw`
        mx-auto
        w-full
        max-w-6xl
    `}

    .back-btn {
      ${tw`
        flex
        items-center
        justify-center
        py-1
        pr-3
        mb-4
        w-36
        md:text-lg
        text-gray-200
        font-semibold
        rounded-md
        transition
        duration-200
        ease-in-out
        overflow-hidden
      `}

      .back-icon {
        ${tw`
          relative
          text-xl
          md:text-3xl
          transition
          duration-200
          ease-in-out
        `}
      }

      :hover {
        ${tw`
          bg-gray-700
        `}

        .back-icon {
          animation: backAnimate 2.5s ease infinite;
        }
      }
    }

    @keyframes backAnimate {
      20% {
        ${tw`
        opacity-0
        -translate-x-full
      `}
      }
      30% {
        ${tw`
        opacity-0
        translate-x-full
      `}
      }
      40% {
        ${tw`
        opacity-100
        translate-x-0
        left-1
      `}
      }
      50% {
        ${tw`
        left-0
      `}
      }
      55% {
        ${tw`
        left-1
      `}
      }
      60% {
        ${tw`
        left-0
      `}
      }
      100% {
        ${tw`
        left-0
        translate-x-0
      `}
      }
    }
  }
`

export default TicketReport
