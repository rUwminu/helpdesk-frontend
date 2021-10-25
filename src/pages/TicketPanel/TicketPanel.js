import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";

// Redux action
import { getAllTicketType } from "../../redux/action/ticketAction";

// components
import { PieChart, LineChartComponent } from "../../components/index";

// mui import
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box className="relative w-full h-full">
      <CircularProgress
        className="w-full h-full"
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          className="text-2xl text-gray-200"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const TicketPanel = () => {
  const dispatch = useDispatch();
  const [reducedType, setReducedType] = useState([]);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const ticketList = useSelector((state) => state.ticketList);
  const { allTicketsType } = ticketList;

  const [getTicketOnLoad, { data }] = useLazyQuery(GET_ALL_TICKETS, {
    context: {
      headers: {
        Authorization: `Bearer${" "}${user.token}`,
      },
    },
  });

  const calAllTicketCompletePercentage = () => {
    const total = allTicketsType.length;
    const completion = allTicketsType.filter((x) => x.isResolved === true);

    if (total.length !== 0) {
      const getpercentage = Math.round((100 / total) * completion.length);

      return getpercentage;
    } else {
      return 0;
    }
  };

  const calAllTicketIsUrgentPercentage = () => {
    const total = allTicketsType.filter((x) => x.isUrgent === true);
    const completion = allTicketsType.filter(
      (x) => x.isUrgent === true && x.isResolved === true
    );

    if (total.length !== 0) {
      const getpercentage = Math.round(
        (100 / total.length) * completion.length
      );

      return getpercentage;
    } else {
      return 0;
    }
  };

  const getTypeValue = () => {
    const countType = allTicketsType.reduce((total, item) => {
      const { typeTicket } = item;

      if (!typeTicket) {
        return total;
      }

      if (!total[typeTicket]) {
        total[typeTicket] = { name: typeTicket, value: 1 };
      } else {
        total[typeTicket] = {
          ...total[typeTicket],
          value: total[typeTicket].value + 1,
        };
      }

      return total;
    }, {});

    //console.log(Object.values(countType))

    setReducedType(Object.values(countType));

    return countType;
  };

  useEffect(() => {
    if (allTicketsType.length === 0) {
      getTicketOnLoad();

      if (data) {
        dispatch(getAllTicketType(data.getTickets));
      }
    }
  }, [data]);

  useEffect(() => {
    if (allTicketsType.length > 0) {
      getTypeValue();
    }
  }, [allTicketsType]);

  return (
    <Container>
      <div className="inner-container">
        <h1 className="title">Dashboard</h1>
        <div className="top-container">
          <div className="left-pie">
            <CardContainer>
              <h1>Ticket Completion</h1>
              <div className="info-box">
                <CircularProgressWithLabel
                  className="w-full h-full"
                  value={calAllTicketCompletePercentage()}
                />
              </div>
            </CardContainer>
            <CardContainer>
              <h1>Ticket Urgent</h1>
              <div className="info-box">
                <CircularProgressWithLabel
                  className="w-full h-full"
                  value={calAllTicketIsUrgentPercentage()}
                />
              </div>
            </CardContainer>
            <CardContainer>
              <h1>Ticket Completion</h1>
              <div className="info-box">
                <CircularProgressWithLabel
                  className="w-full h-full"
                  value={calAllTicketCompletePercentage()}
                />
              </div>
            </CardContainer>
          </div>
          <div className="right-pie">
            <h1>Ticket Requested By Deparment</h1>
            {reducedType && <PieChart data={reducedType} />}
          </div>
        </div>
        <div className="mid-container">
          <LineChartComponent grid />
        </div>
      </div>
    </Container>
  );
};

const GET_ALL_TICKETS = gql`
  {
    getTickets {
      id
      typeTicket
      isUrgent
      isResolved
    }
  }
`;

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

    .title {
      ${tw`
        mb-6
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
        mt-8
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
`;

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
`;

export default TicketPanel;
