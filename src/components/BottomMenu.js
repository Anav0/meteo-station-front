import React from "react"
import styled from "styled-components"
import ChartIcon from "../assets/chart.svg"
import MonitorIcon from "../assets/monitor.svg"

const StyleBottomMenu = styled.div`
  background: ${({ theme }) => theme.colors.AccentColor1};
  width:100%;
  position:absolute;
  left:0;
  bottom:0;
  
  @media (min-width:765px){
    display:none;
  }
  
  ul{
    padding:0;
  }
  
  svg{
    width: 25px;
    height:25px;
    cursor: pointer;
  }
  
  `
const StyledNavItems = styled.ul`
display:flex;
align-items: center;
justify-content: space-evenly;
`
const BottomMenu = () => (
  <StyleBottomMenu>
    <StyledNavItems>
      <MonitorIcon/>
      <ChartIcon/>
    </StyledNavItems>
  </StyleBottomMenu>

)

export default BottomMenu
