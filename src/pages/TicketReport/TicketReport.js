import React, { useState, useEffect } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import MaterialTable from 'material-table'
import XLSX from 'xlsx'
import moment from 'moment'

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

  const columns = [
    {
      title: 'id',
      field: 'id',
    },
    { title: 'Name', field: 'username' },
    {
      title: 'Position',
      field: 'typeTicket',
      width: '50px',
    },
    { title: 'Description', field: 'body' },
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

  //console.log(ticketsList)

  return (
    <Container>
      <div className='inner-container'>
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
              tableLayout: 'fixed',
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
  }
`

export default TicketReport
