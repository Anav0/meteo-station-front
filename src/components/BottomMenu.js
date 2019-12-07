import React from "react"
import styled from "styled-components"

const StyleBottomMenu = styled.div`
  background: ${({ theme }) => theme.colors.SideMenuColor};
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;

  @media (min-width: 765px) {
    display: none;
  }

  ul {
    padding: 0;
  }

  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`
const StyledNavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
const BottomMenu = () => (
  <StyleBottomMenu>
    <StyledNavItems>
      <i className="icon icon-humidity" />
      <i className="icon icon-chart" />
    </StyledNavItems>
  </StyleBottomMenu>
)

export default BottomMenu
