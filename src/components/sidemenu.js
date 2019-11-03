import React from "react"
import styled from "styled-components"
import ChartIcon from "../assets/chart.svg"
import MonitorIcon from "../assets/monitor.svg"

const StyledSideMenu = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.AccentColor1};
  height:80vh;
  width:96px;
  position:absolute;
  left:0;
  bottom:0;
  border-radius: 0 30px 0 0 ;
  padding:30px 0;

*:not(:first-child){
margin-top:30px;
}
  `
const StyledNavItems = styled.ul`
display:flex;
flex-direction: column;
align-items: center;
margin:0;
padding:0;

svg{
width:25px;
cursor:pointer;
}
  `
const SideMenu = () => (
  <StyledSideMenu>
    <StyledNavItems>
      <MonitorIcon/>
      <ChartIcon/>
    </StyledNavItems>
  </StyledSideMenu>

)

export default SideMenu
