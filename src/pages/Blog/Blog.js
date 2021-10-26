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
            <img
              src="data:image/jpeg;base64,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"
              className="about-img"
              alt="about"
            ></img>
            <div className="about-info">
              <h2>To Reduce Paper Work In Between Process</h2>
              <p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </div>
          </div>
          <div className="item-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwEtyJEps8gKFKMvOqpiywFaJKvP74pUxEM4e3n5xX1n1MJVQKK3fIRIyUOUj8z0LlaCY&usqp=CAU"
              className="about-img"
              alt="about"
            ></img>
            <div className="about-info">
              <h2>Integrate With Big Data For Better Management</h2>
              <p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>
            </div>
          </div>
          <div className="item-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxe0dmLbZeC3PLQA9pK2GMf2_0ZX9Q1TXTVw&usqp=CAU"
              className="about-img"
              alt="about"
            ></img>
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
    min-h-[100vh]
    flex
    flex-col
    items-center
    justify-center
    bg-gray-800
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
        max-h-[18rem]
        md:min-h-[12rem]
        md:max-h-[12rem]
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
