import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
//import MaterialTable from "material-table";
import XLSX from "xlsx";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

// Icons
import { ChevronLeft } from "@mui/icons-material";

const TicketReport = () => {
  const [ticketsList, setTicketsList] = useState([]);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const { data } = useQuery(GET_COMPLETE_TICKETS, {
    context: {
      headers: {
        Authorization: `Bearer${" "}${user.token}`,
      },
    },
  });

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Name", width: 160 },
    {
      field: "typeTicket",
      headerName: "Position",
      width: 100,
    },
    {
      field: "body",
      headerName: "Description",
      renderCell: (params) => {
        const title = params.row.body.slice(0, 60);
        return <div>{title}</div>;
      },
      width: 220,
    },
    {
      field: "isResolved",
      headerName: "Resolved",
      renderCell: (params) => {
        return <div>{params.row.isResolved && "Ticket Complete"}</div>;
      },
      width: 130,
    },
    {
      field: "updatedAt",
      headerName: "Date",
      renderCell: (params) => {
        const date = params.row.updatedAt;

        return <div>{moment(date).format("Do MMM YYYY")}</div>;
      },
    },
  ];

  const exportToExcelFile = () => {
    const newdata = ticketsList.map((row) => {
      delete row.__typename;
      delete row.id;
      delete row.tableData;

      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newdata);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "Ticket Report");

    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "TicektReport.xlsx");
  };

  useEffect(() => {
    if (data) {
      setTicketsList(data.getCompletedTickets.map((o) => ({ ...o })));
    }
  }, [data]);

  //console.log(ticketsList);

  return (
    <Container>
      <div className="inner-container">
        <div className="link-box">
          <Link to="/helpdesk-frontend/ticket_panel" className="back-btn">
            <ChevronLeft className="back-icon" />
            Go Back
          </Link>
          <div className="exp-btn" onClick={() => exportToExcelFile()}>
            Export Report
          </div>
        </div>

        {ticketsList && (
          <DataGrid
            rows={ticketsList && ticketsList}
            columns={columns}
            disableSelectionOnClick
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r.id}
            className="grid-style"
          />
        )}
      </div>
    </Container>
  );
};

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
`;

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

    .link-box {
      ${tw`
        mb-4
        w-full
        flex
        items-center
        justify-between
      `}

      .exp-btn {
        ${tw`
          py-1
          w-36
          text-lg
          text-center
          text-gray-50
          bg-gray-600
          rounded-md
          cursor-pointer

          transition
          duration-200
          ease-in-out
        `}

        :hover {
          ${tw`
            bg-gray-700
          `}
        }
      }
    }

    .back-btn {
      ${tw`
        flex
        items-center
        justify-center
        py-1
        pr-3
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

    .grid-style {
      ${tw`
      min-h-[24rem] 
      w-full
      bg-gray-50
    `}
    }
  }
`;

export default TicketReport;
