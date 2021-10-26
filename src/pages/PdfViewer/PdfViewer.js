import React, { useRef, useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import moment from "moment";

import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    const { id, username, typeTicket, body, isUrgent, createdAt } =
      this.props.ticket;

    const getTitleFromBody = (body) => {
      const title = body.slice(0, 30);

      return title;
    };

    return (
      <AfourContainer>
        <h1 className="title">CHIGA LIGHT INDUSTRIES SDN. BHD.</h1>
        <small className="title-small">IT REQUEST FORM</small>

        <div className="user-info">
          <h4>Department: {typeTicket}</h4>
          <h4>Request: {username}</h4>
          <h4>Date: {moment(createdAt).format("Do MMM YYYY")}</h4>
        </div>

        <div className="table-form">
          <div className="request-item">
            <h4>Request</h4>
            <div className="request-cell">{getTitleFromBody(body)}</div>
          </div>
          <div className="request-item">
            <h4>&nbsp;</h4>
            <div className="request-cell">
              <div className="cb-input">
                <input type="checkbox" />
                <label>Hardware</label>
              </div>
              <div className="cb-input">
                <input type="checkbox" />
                <label>Software / System</label>
              </div>
            </div>
          </div>
          <div className="request-item">
            <h4>Type</h4>
            <div className="request-cell">
              <div className="cb-input">
                <input type="checkbox" />
                <label>New</label>
              </div>
              <div className="cb-input">
                <input type="checkbox" />
                <label>Bug fix</label>
              </div>
              <div className="cb-input">
                <input type="checkbox" />
                <label>Amendment</label>
              </div>
              <div className="cb-input">
                <input type="checkbox" />
                <label>Repair</label>
              </div>
            </div>
          </div>
          <div className="body-item">
            <h4>Description / Outline the Dunctionality / Purpose / Reason</h4>
            <textarea className="body" name="desc" rows="5" cols="60">
              {body}
            </textarea>
          </div>
          <div className="request-item">
            <h4>Required Date</h4>
            <div className="request-cell">
              {moment(createdAt).format("Do MMM YYYY")}
            </div>
          </div>
          <div className="request-item">
            <h4>Attachments(if any)</h4>
            <div className="request-cell">&nbsp;</div>
          </div>
          <div className="request-item">
            <h4>Priority</h4>
            <div className="request-cell">
              <div className="cb-input">
                <input type="checkbox" checked={isUrgent && "checked"} />
                <label>Hight</label>
              </div>
              <div className="cb-input">
                <input type="checkbox" checked={!isUrgent && "checked"} />
                <label>Low</label>
              </div>
            </div>
          </div>
        </div>

        <div className="master-container">
          <h4>
            Kindly prepare and attach following document (software request only)
          </h4>
          <h5 className="ml-4 list-item text-sm">
            All related document. (with data & formula), if any
          </h5>
          <h5 className="ml-4 list-item text-sm">
            Format repuest, title and specified how data should be sorted, if
            needed.
          </h5>

          <div className="master-sign">
            <div className="sign-card">
              <h2>Applied By</h2>
              <h3>Name: {username}</h3>
              <h3>Date: {moment().format("Do MMM YYYY")}</h3>
            </div>
            <div className="sign-card">
              <h2>Approved by (Head of Dept)</h2>
              <h3>Name: </h3>
              <h3>Date: </h3>
              <p>*for new software / hardware or data amendment request only</p>
            </div>
            <div className="sign-card">
              <h2>Received by EDP Dept</h2>
              <h3>Name: </h3>
              <h3>Date: </h3>
            </div>
            <div className="sign-card">
              <h2>Recived by (End User)</h2>
              <h3>Name: </h3>
              <h3>Date: </h3>
            </div>
          </div>

          <div className="edp-require">
            <h2>EDP Dept use only : Preliminary / Equiqment required</h2>
            <textarea rows="3" cols="40" />
          </div>
        </div>
      </AfourContainer>
    );
  }
}

const PdfViewer = () => {
  const { id } = useParams();
  const history = useHistory();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [isFilter, setIsFilter] = useState(null);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { user } = userSignIn;

  const { data } = useQuery(GET_SINGLE_TICKET, {
    context: {
      headers: {
        Authorization: `Bearer${" "}${user.token}`,
      },
    },
    variables: { ticketId: id.toString() },
  });

  useEffect(() => {
    if (data) {
      setIsFilter(data.getTicket);
    }
  }, [data]);

  //console.log(isFilter);

  return (
    <Container>
      <div className="inner-container">
        {isFilter && <ComponentToPrint ref={componentRef} ticket={isFilter} />}
        <button className="print-btn" onClick={handlePrint}>
          Print this out!
        </button>
      </div>
    </Container>
  );
};

const GET_SINGLE_TICKET = gql`
  query getTicket($ticketId: ID!) {
    getTicket(ticketId: $ticketId) {
      id
      username
      typeTicket
      body
      isUrgent
      createdAt
    }
  }
`;

const Container = styled.div`
  ${tw`
    flex
    items-start
    justify-center
    pt-36
    pb-20
    w-screen
    min-h-[100vh]
    bg-gray-700
    overflow-hidden
  `}

  .inner-container {
    ${tw` 
        pb-8  
        w-full
        max-w-5xl
        bg-white
    `}

    .print-btn {
      ${tw` 
        ml-10
        px-8
        py-2
        font-semibold
        bg-blue-600
        text-gray-200
        rounded-sm
        transition
        duration-200
        ease-in-out
      `}

      :hover {
        ${tw`
            shadow-md
            bg-blue-700
        `}
      }
    }
  }

  .page-container {
    ${tw` 
        flex
        flex-col
    `}
  }
`;

const AfourContainer = styled.div`
  ${tw`
    p-10
    w-full
    flex
    flex-col
    items-start
    justify-start
  `}

  .title, .title-small {
    ${tw`
        mx-auto
        text-center
        font-semibold
    `}
  }

  .title {
    ${tw`
        text-xl
    `}
  }

  .user-info {
    margin-bottom: 6px;
    h4 {
      ${tw`
        py-2
      `}
    }
  }

  .table-form {
    ${tw`
        w-full
        border-2
        border-gray-900
    `}

    .request-item {
      ${tw`
        flex
        items-center
        justify-start
        w-full
        border-b-2
        border-gray-900
      `}

      h4 {
        ${tw`
            h-full
            w-48
            px-2
            font-semibold
        `}
      }

      .request-cell {
        ${tw`
            flex
            flex-grow
            items-center
            justify-around
            border-l-2
            border-gray-900
        `}

        label {
          ${tw`
            ml-2
          `}
        }
      }

      :nth-last-child(3) {
        ${tw`
            border-t-2
        `}
      }

      :nth-last-child(1) {
        ${tw`
            border-none
        `}
      }
    }

    .body-item {
      ${tw`
        w-full
        h-auto
      `}

      h4 {
        ${tw`
            px-2
            font-semibold
            border-b-2
            border-gray-900
        `}
      }

      .body {
        ${tw`
            px-2
            w-full
            min-h-[18rem]
        `}
      }
    }
  }

  .master-container {
    ${tw`
        mt-4
        w-full
    `}

    .master-sign {
      ${tw`
        mt-4
        w-full
        flex
        items-start
        justify-between
        `}

      .sign-card {
        width: 100%;
        padding-right: 10px;
        h2 {
          ${tw`
            pb-10
            text-xs
            border-b
            border-gray-900
          `}
        }

        h3 {
          ${tw`
            text-xs
          `}
        }

        p {
          ${tw`
            text-xs
          `}
        }
      }
    }
  }

  .edp-require {
    ${tw`
        mt-1
        w-full
        border-2
        border-gray-900
    `}

    h2 {
      ${tw`
        w-full
        text-sm
        font-semibold
        border-b-2
        border-gray-900
      `}
    }

    textarea {
      ${tw`
        w-full
      `}
    }
  }
`;

export default PdfViewer;
