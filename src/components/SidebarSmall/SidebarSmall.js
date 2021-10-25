import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  filterTicketsUrgent,
  filterTicketsByDeparment,
  toggleTicketIsResolved,
} from "../../redux/action/ticketAction";

const Sidebar = () => {
  const dispatch = useDispatch();

  const [isUrgent, setIsUrgent] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user, loading } = userSignIn;

  const ticketList = useSelector((state) => state.ticketList);
  const { filterType } = ticketList;

  const handleToggleIsUrgent = () => {
    setIsUrgent(!isUrgent);

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
              checked={
                filterType &&
                filterType.find((x) => x === "Manager") &&
                "checked"
              }
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
              checked={
                filterType && filterType.find((x) => x === "EDP") && "checked"
              }
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
              checked={
                filterType && filterType.find((x) => x === "CS") && "checked"
              }
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
              checked={
                filterType && filterType.find((x) => x === "QA") && "checked"
              }
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
              checked={
                filterType &&
                filterType.find((x) => x === "Account") &&
                "checked"
              }
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
              checked={
                filterType &&
                filterType.find((x) => x === "Production") &&
                "checked"
              }
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
              checked={
                filterType &&
                filterType.find((x) => x === "Printing") &&
                "checked"
              }
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
              checked={
                filterType &&
                filterType.find((x) => x === "Cutting") &&
                "checked"
              }
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
              onClick={() => {
                setIsComplete(false);
                dispatch(toggleTicketIsResolved(false));
              }}
              type="checkbox"
              checked={!isComplete ? true : false}
              value="entry"
            />
            <span className="check"></span>
            In Process
          </label>
          <label className="cb-container">
            <input
              onClick={() => {
                setIsComplete(true);
                dispatch(toggleTicketIsResolved(true));
              }}
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
    px-2
    w-44
    h-full
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
      pt-4
    `}

    h2 {
      ${tw`
        mb-4
        text-base
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
        text-base
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
        bg-none
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
