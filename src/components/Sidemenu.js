import React from "react"
import styled from "styled-components"

const StyledSideMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.SideMenuColor};
  height: 100%;
  width: 96px;
  position: absolute;
  left: 0;
  bottom: -180px;
  border-radius: 0 30px 0 0;
  padding: 30px 0;

  @media (max-width: 765px) {
    display: none;
  }
  *:not(:first-child) {
    margin-top: 30px;
  }
`
const StyledNavItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;

  i {
    width: 25px;
    cursor: pointer;
  }
`

const Sidemenu = () => (
  <StyledSideMenu>
    <StyledNavItems>
      <i className="icon icon-humidity" />
      <i className="icon icon-chart" />
    </StyledNavItems>
  </StyledSideMenu>
)

export default Sidemenu
