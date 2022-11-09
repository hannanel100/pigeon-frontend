// Header component, with name if logged in, and login/logout button
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessTokenQuery } from "../hooks/useAccessTokenQuery";
import { useUserQuery } from "../hooks/useUserQuery";
import Logo from "../assets/pigeon_transparent.svg";
import styled from "styled-components/macro";
import LoadingSpinner from "./LoadingSpinner";
const StyledLogo = styled.img`
  margin-left: 25px;
  padding: 0;
  z-index: 5;
  cursor: pointer;
`;
const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  gap: 1rem;
  width: 100%;
  height: 90px;
  position: relative;
  box-shadow: 0px 4px 9px 5px rgba(0, 0, 0, 0.82);
  z-index: 1;
  &::before {
    background-image: url("/header-background.jpeg");
    opacity: 0.7;
    content: "";
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    transform: scaleX(-1);
  }
`;
const StyledImageContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 25px;
  background: linear-gradient(180deg, #02c7c8 0%, #bc3cc5 100%);
  position: relative;
  cursor: pointer;
  transition: transform 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    /* spin cubic-bezier */
    /* bounce and spin animation */
    transform: scale(1.2) rotate(360deg);
    transition: transform 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;
const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 2.5px;
  left: 2.5px;
`;
const StyledName = styled.div`
  font-family: "Roboto", sans-serif;
  background-color: #fff;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  /* animation to slide to the left */
  animation: slideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  @keyframes slideIn {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;
const Header = () => {
  const { accessTokenQuery } = useAccessTokenQuery(undefined);
  const { userQuery } = useUserQuery();
  const navigate = useNavigate();
  console.log(userQuery.data);
  const [open, setOpen] = useState(false);
  const firstName = userQuery.data?.localizedFirstName;
  const lastName = userQuery.data?.localizedLastName;
  const imageUrl = userQuery.data?.profilePicture
    ? userQuery.data?.profilePicture["displayImage~"].elements[0].identifiers[0]
        .identifier
    : "/user-ninja-solid.svg";
  if (userQuery.isInitialLoading) {
    return (
      <StyledHeader>
        <StyledLogo src={Logo} />
        <StyledImageContainer>
          <LoadingSpinner width="40" height="40" />
        </StyledImageContainer>
      </StyledHeader>
    );
  }
  return (
    <StyledHeader>
      <StyledLogo onClick={() => navigate("/")} src={Logo} />
      {accessTokenQuery.data ? (
        <>
          {open && (
            <StyledName>
              Hello, {firstName} {lastName}!
            </StyledName>
          )}
          <StyledImageContainer onClick={() => setOpen(!open)}>
            <StyledImage src={imageUrl} />
          </StyledImageContainer>
        </>
      ) : null}
    </StyledHeader>
  );
};

export default Header;
