import React, { PureComponent, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import tw from "twin.macro";
import styled from "styled-components";

import { productData } from "../../assets/dumpData/data";

const LineChartComponent = ({ grid }) => {
  const [isSmall, setIsSmall] = useState(false);

  const handleCheckWidthS = () => {
    let windowWidth = window.innerWidth;

    if (windowWidth < 478) {
      setIsSmall(true);
    } else if (windowWidth > 478) {
      setIsSmall(false);
    }
  };

  useEffect(() => {
    handleCheckWidthS();
    window.addEventListener("resize", handleCheckWidthS);
  }, []);

  return (
    <Container>
      <h3 className="title">Monthly Ticket Chart</h3>
      <ResponsiveContainer width={"100%"} height={200}>
        <LineChart data={productData}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={"Sales"} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

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
`;

const TContainer = styled.div`
  ${tw``}
`;

export default LineChartComponent;
