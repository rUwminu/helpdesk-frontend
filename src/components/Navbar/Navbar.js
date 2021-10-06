import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useSelector } from "react-redux";

// Svg
import Logo from "../../assets/image/Logo.svg";
import Avatar from "../../assets/image/avatar.jpg";

// Icon
import { ExpandMore, Logout, AssignmentInd } from "@mui/icons-material";

const Navbar = () => {
  let lastScroll = 0;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading } = userSignIn;

  const [isActive, setIsActive] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(true);
  const [isMobile, setIsMobile] = useState();
  const [isDropOption, setIsDropOption] = useState(false);

  const handleCheckWidth = () => {
    let windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleScroll = () => {
    const currentTop = window.scrollY;

    if (currentTop <= 0) {
      setIsScrollTop(true);
    }
    if (currentTop > lastScroll) {
      setIsScrollTop(false);
    }

    lastScroll = currentTop;
  };

  useEffect(() => {
    handleCheckWidth();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container
      className={`${
        isScrollTop ? "py-10 bg-none" : "py-4 bg-gray-900 shadow-md"
      }`}
    >
      {userInfo && !loading && (
        <NavInner>
          <NavLeft>
            <img src={Logo} alt="logo" />
          </NavLeft>
          {!isMobile && (
            <NavMid>
              <div className="nav-link">Manage User</div>
              <div className="nav-link">Watch Ticket Stats</div>
              <div className="nav-link">Sponsor us</div>
            </NavMid>
          )}
          <NavRight>
            {isMobile && (
              <Burger
                className={`${isActive && "line-active"}`}
                onClick={() => setIsActive(!isActive)}
              >
                <div className={`line-1`} />
                <div className={`line-2`} />
                <div className={`line-3`} />
              </Burger>
            )}

            <div className="user-info">
              <img src={Avatar} alt="user" />
              <h2>{userInfo.username}</h2>
              <ExpandMore
                onClick={() => setIsDropOption(!isDropOption)}
                className="icon"
              />

              <AbsoluteDropList
                className={isDropOption ? "h-36" : "h-0"}
                onMouseLeave={() => setIsDropOption(false)}
              >
                <h2>Option</h2>
                <div className="option-item">
                  <h3>Profile</h3>
                  <AssignmentInd className="option-icon" />
                </div>
                <div className="option-item">
                  <h3>Logout</h3>
                  <Logout className="option-icon" />
                </div>
              </AbsoluteDropList>
            </div>
          </NavRight>
          {isMobile && (
            <AbsoluteNav
              className={`${
                isActive ? "translate-x-0 shadow-md" : "translate-x-full "
              }`}
            >
              <div className="nav-link">Find a Job</div>
              <div className="nav-link">Submit a Job</div>
              <div className="nav-link">Sponsor us</div>
            </AbsoluteNav>
          )}
        </NavInner>
      )}
    </Container>
  );
};

const Container = styled.div`
  ${tw`
    w-full
    fixed
    top-0
    left-0
    px-4
    2xl:px-0
    transition-all
    duration-500
    ease-in-out
    z-10
  `}
`;

const NavInner = styled.div`
  ${tw`
    w-full
    md:max-w-7xl
    mx-auto
    flex
    items-center
    justify-between
  `}
`;

const NavLeft = styled.div`
  ${tw`
    flex
    items-center
    justify-center
  `}

  img {
    ${tw`
        w-full
        h-full
        mr-4
        cursor-pointer
        z-30
      `}
  }
`;

const NavMid = styled.div`
  ${tw`
    flex
    items-center
    justify-center
  `}

  .nav-link {
    ${tw`
        mb-4
        md:mb-0
        px-4
        text-lg
        text-gray-300
        cursor-pointer
        hover:text-gray-500
        transition
        duration-200
        ease-in-out
      `}
  }
`;

const NavRight = styled.div`
  ${tw`
    flex
    items-center
    justify-center
    transition
    duration-200
    ease-in-out
  `}

  img {
    ${tw`
        w-10
        h-10
        mr-4
        rounded-full
        cursor-pointer
      `}
  }

  .user-info {
    ${tw`
      relative
      flex
      items-center
      justify-center
      z-30
    `}
  }

  h2 {
    ${tw`
      mr-2
      text-lg
      text-gray-100
    `}
  }

  .icon {
    ${tw`
      text-3xl
      text-gray-100
      cursor-pointer
      rounded-full
      transition
      duration-200
      ease-in-out
    `}

    :hover {
      ${tw`
        bg-gray-600
      `}
    }
  }

  .line-active {
    .line-1 {
      transform: rotate(-45deg) translate(-6px, 6px);
    }

    .line-2 {
      opacity: 0;
      transform: translate(100%);
    }

    .line-3 {
      transform: rotate(45deg) translate(-5px, -5px);
    }
  }
`;

const AbsoluteNav = styled.div`
  ${tw`
    absolute
    top-0
    right-0
    pt-36
    px-10
    w-full
    h-screen
    bg-gray-900
    flex
    flex-col
    items-center
    transition-all
    duration-500
    ease-in-out
    z-20
  `}

  .nav-link {
    ${tw`
        mb-4
        md:mb-0
        px-4
        text-lg
        text-gray-300
        cursor-pointer
        hover:text-gray-500
        transition
        duration-200
        ease-in-out
      `}
  }
`;

const Burger = styled.div`
  ${tw`
    mr-2
    h-10
    w-10
    p-2
    flex
    flex-col
    items-center
    justify-around
    cursor-pointer
    bg-gray-900
    hover:bg-gray-700
    rounded-sm
    transition
    duration-200
    ease-in-out
    z-30
  `}

  div {
    ${tw`
      w-6
      h-[2px]
      bg-gray-200
      transition
      duration-200
      ease-in-out
    `}
  }
`;

const AbsoluteDropList = styled.div`
  ${tw`
    absolute
    right-0
    top-12

    px-2
    w-[12rem]
    bg-gray-800
    rounded-md
    shadow-md
    transition-all
    duration-200
    ease-linear
    overflow-hidden
  `}

  h2 {
    ${tw`
      mb-2
      pt-2
    `}
  }

  .option-item {
    ${tw`
      flex
      items-center
      justify-between
      min-w-[10rem]
      p-2
      rounded-md
      transition
      duration-200
      ease-in-out
      cursor-pointer
      hover:bg-gray-600
    `}

    h3 {
      ${tw`
        text-gray-200
      `}
    }

    .option-icon {
      ${tw`
        text-gray-200
      `}
    }
  }
`;

export default Navbar;
