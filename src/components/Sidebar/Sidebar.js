import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  filterTicketsUrgent,
  filterTicketsByDeparment,
} from "../../redux/action/ticketAction";

const Sidebar = () => {
  const dispatch = useDispatch();

  const [isComplete, setIsComplete] = useState(false);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const ticketList = useSelector((state) => state.ticketList);
  const { isUrgent } = ticketList;

  const handleToggleIsUrgent = () => {
    console.log(isUrgent);
    if (isUrgent) {
      dispatch(filterTicketsUrgent(false));
    } else {
      dispatch(filterTicketsUrgent(true));
    }
  };

  return (
    <Container>
      {user && user.isAdmin && (
        <div className="items-list">
          <h2>Type Ticket</h2>
          <label className="cb-container">
            <input
              onClick={(e) =>
                dispatch(filterTicketsByDeparment(e.target.value))
              }
              type="checkbox"
              value="Manager"
            />
            <span className="check"></span>
            Manager
          </label>
          <label className="cb-container">
            <input
              onClick={(e) =>
                dispatch(filterTicketsByDeparment(e.target.value))
              }
              type="checkbox"
              value="EDP"
            />
            <span className="check"></span>
            EDP
          </label>
          <label className="cb-container">
            <input
              onClick={(e) =>
                dispatch(filterTicketsByDeparment(e.target.value))
              }
              type="checkbox"
              value="CS"
            />
            <span className="check"></span>
            CS
          </label>
          <label className="cb-container">
            <input
              onClick={(e) =>
                dispatch(filterTicketsByDeparment(e.target.value))
              }
              type="checkbox"
              value="QA"
            />
            <span className="check"></span>
            QA
          </label>
          <label className="cb-container">
            <input
              onClick={(e) =>
                dispatch(filterTicketsByDeparment(e.target.value))
              }
              type="checkbox"
              value="Account"
            />
            <span className="check"></span>
            Account
          </label>
          <label className="cb-container">
            <input
              onClick={(e) =>
                dispatch(filterTicketsByDeparment(e.target.value))
              }
              type="checkbox"
              value="Production"
            />
            <span className="check"></span>
            Production
          </label>
          <label className="cb-container">
            <input
              onClick={(e) =>
                dispatch(filterTicketsByDeparment(e.target.value))
              }
              type="checkbox"
              value="Printing"
            />
            <span className="check"></span>
            Printing
          </label>
          <label className="cb-container">
            <input
              onClick={(e) =>
                dispatch(filterTicketsByDeparment(e.target.value))
              }
              type="checkbox"
              value="Cutting"
            />
            <span className="check"></span>
            Cutting
          </label>
        </div>
      )}
      <div className="items-list">
        <h2>Emergency</h2>
        <label className="cb-container">
          <input
            onChange={() => handleToggleIsUrgent()}
            type="checkbox"
            value="verify"
            checked={isUrgent ? "checked" : ""}
          />
          <span className="check"></span>
          Urgent
        </label>
      </div>
      {user && user.isAdmin && (
        <div className="items-list">
          <h2>Sort Ticket</h2>
          <label className="cb-container">
            <input
              onClick={() => setIsComplete(false)}
              type="checkbox"
              checked={!isComplete ? true : false}
              value="entry"
            />
            <span className="check"></span>
            In Process
          </label>
          <label className="cb-container">
            <input
              onClick={() => setIsComplete(true)}
              type="checkbox"
              checked={isComplete ? true : false}
              value="inter"
            />
            <span className="check"></span>
            Closed Ticket
          </label>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${tw`
    h-full
    w-full
    max-w-[10rem]
    flex
    flex-col
    items-start
    justify-start
    overflow-y-scroll
    scrollbar-hide
  `}

  .items-list {
    ${tw`
      pb-10
    `}

    h2 {
      ${tw`
        mb-4
        text-xl
        text-gray-200
        font-bold
      `}
    }

    .cb-container {
      ${tw`
        flex
        items-center
        justify-start

        mb-4
        text-lg
        text-gray-400
        font-semibold
        hover:text-gray-300
        transition
        duration-200
        ease-in-out
        cursor-pointer
    `}

      input {
        appearance: none;
      }

      span {
        ${tw`
        relative
        inline-block
        w-[15px]
        h-[15px]
        mr-4
        bg-gray-900
        transition
        duration-500
        ease-in-out
      `}

        :before {
          content: "";
          box-shadow: 0 -13.5px 0 rgba(249, 250, 251, 1);

          ${tw`
            absolute
            bottom-0
            left-0
            w-full
            h-[1.5px]
            bg-gray-100
            transition
            duration-500
        `}
        }

        :after {
          content: "";
          box-shadow: 13.5px 0 0 rgba(249, 250, 251, 1);

          ${tw`
            absolute
            bottom-0
            left-0
            w-[1.5px]
            h-full
            bg-gray-100
            transition
            duration-500
        `}
        }
      }

      input:checked ~ .check::before {
        ${tw`
        bg-green-500
      `}
        box-shadow: 0 0 0 transparent;
      }

      input:checked ~ .check::after {
        ${tw`
        h-1/2
        bg-green-500
      `}
        box-shadow: 0 0 0 transparent;
      }

      input:checked ~ .check {
        transform: rotate(-45deg) translate(2px, -6px);
      }
    }
  }
`;

export default Sidebar;
