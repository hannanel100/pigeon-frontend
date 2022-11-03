import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import styled from "styled-components";
const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  flex: 6 1 auto;
`;
const Layout = () => {
  // get the path from the url, if it is "/" don't show sidebar, if it is, show it
  const history = useLocation();
  console.log(history);

  return (
    <>
      {history.pathname !== "/" ? (
        <StyledContainer>
          <NavBar isHome={false} />
          <Outlet />
        </StyledContainer>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Layout;
