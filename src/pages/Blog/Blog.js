import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

// SVG
import CompletedSvg from "../../assets/Svg/Completed.svg";

// Icon
import { FiberManualRecord } from "@mui/icons-material";

const tempData = [
  {
    id: 1,
    body: "Start of deployment of the system to company use. Full deployment to all user at all level.",
    createdAt: "Still Planning",
  },
  {
    id: 2,
    body: "Start of deployment of the system to company use. Still in testing phase.",
    createdAt: "19th Oct 2021",
  },
  {
    id: 3,
    body: "Start of devalopment of system UI design and design implementation",
    createdAt: "4th Oct 2021",
  },
  {
    id: 4,
    body: "Start of development of web aplication backend and setting cloud connection to online services for cloud data storage",
    createdAt: "17th Sep 2021",
  },
  {
    id: 5,
    body: "Start of development of web aplication project.",
    createdAt: "10th Sep 2021",
  },
];

const BlogPage = () => {
  return (
    <MainContainer>
      <HeroSection>
        <small>Blog Feature</small>
        <h1>Getting Help With Less Effort</h1>
        <img className="hero-svg" src={CompletedSvg} alt="Svg" />
      </HeroSection>
      <div className="inner-container">
        <UpdatesSection>
          <h1>What New Comming?</h1>
          <div className="tempc">
            {tempData.map((item) => {
              const { id, body, createdAt } = item;

              return (
                <div key={id} className="date-item">
                  <div className="date-container">{createdAt}</div>
                  <div className="info-container">
                    {body}
                    <div className="absolute-dot">
                      <FiberManualRecord className="dot-icon" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </UpdatesSection>

        <AboutSection>
          <h1>Why this Application Exist?</h1>
          <div className="item-card">
            <img src="" className="about-img" alt="about"></img>
            <div className="about-info">
              <h2>To Reduce Paper Work In Between Process</h2>
              <p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </div>
          </div>
          <div className="item-card">
            <img src="" className="about-img" alt="about"></img>
            <div className="about-info">
              <h2>Integrate With Big Data For Better Management</h2>
              <p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </div>
          </div>
          <div className="item-card">
            <img src="" className="about-img" alt="about"></img>
            <div className="about-info">
              <h2>Excel In Progressing The Issues Face by User</h2>
              <p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </div>
          </div>
        </AboutSection>

        <HelpSection>
          <h1>Need More Help?</h1>
          <p className="list-item">Call us at EDP Deparment for help assist.</p>
          <p className="list-item">Or Email us at edp@outlook.com</p>
        </HelpSection>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${tw`
    w-full
    bg-gray-900
  `}

  .inner-container {
    ${tw`
        mx-auto
        px-4
        lg:px-0
        w-full
        md:max-w-6xl
        flex
        flex-col
        items-center
        justify-center
    `}

    h1 {
      ${tw`
        mb-4
        text-2xl
        md:text-3xl
        lg:text-4xl
        text-gray-200
        font-semibold
    `}
    }
  }
`;

const HeroSection = styled.div`
  ${tw`
    pt-36
    pb-20
    w-full
    flex
    flex-col
    items-center
    justify-center
    bg-blue-800
  `}

  small {
    ${tw`
        md:text-base
        text-gray-300
    `}
  }

  h1 {
    ${tw`
        py-4
        text-2xl
        md:text-3xl
        lg:text-4xl
        font-bold
        text-gray-200
    `}
  }

  .hero-svg {
    ${tw`
        w-full
        max-w-xs
    `}
  }
`;

const UpdatesSection = styled.div`
  ${tw`
    py-14
    w-full
    flex
    flex-col
    items-start
    justify-center
  `}

  .date-item {
    ${tw`

        flex
        items-center
        justify-start
        text-gray-500
    `}

    .date-container {
      ${tw`
        h-full
        min-w-[10rem]
        flex
        items-center
        justify-center
        pr-6       
      `}
    }

    .info-container {
      ${tw`
        relative
        h-full
        flex
        items-center
        justify-center
        pl-10
        py-4
        border-l
        border-gray-400
      `}

      .absolute-dot {
        ${tw`
            absolute
            left-0
            translate-x-[-55%]
            flex
            items-center
            justify-center
            w-4
            h-4
            font-bold
            border
            rounded-full
        `}

        .dot-icon {
          ${tw`
            text-xs
          `}
        }
      }
    }
  }

  .tempc .date-item:nth-child(2) {
    ${tw`
        text-gray-100
    `}
  }

  .tempc .date-item:nth-last-child(1) {
    .date-container {
      ${tw`
            -mt-12
        `}
    }

    .info-container {
      ${tw`
            pb-16
        `}
    }
  }
`;

const AboutSection = styled.div`
  ${tw`
    pb-10
    w-full
    flex
    flex-col
    items-start
    justify-center
  `}

  .item-card {
    ${tw`
        w-full
        flex
        flex-col
        md:flex-row
        mb-8
        md:mb-6
    `}

    .about-img {
      ${tw`
        min-h-[12rem]
        max-h-[12rem]
        w-full
        md:max-w-xs
        bg-gray-800
        object-cover
      `}
    }

    .about-info {
      ${tw`
        mt-4
        md:ml-6
      `}

      h2 {
        ${tw`
            mb-2
            text-2xl
            text-gray-200
            font-semibold
        `}
      }

      p {
        ${tw`
            text-lg
            text-gray-400
        `}
      }
    }
  }
`;

const HelpSection = styled.div`
  ${tw`
    w-full
    pb-16
  `}

  .list-item {
    ${tw`
        py-1
        ml-10
        text-lg
        text-gray-300
    `}
  }
`;

export default BlogPage;
