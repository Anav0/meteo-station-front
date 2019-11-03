import React from "react"
import Sidemenu from "./Sidemenu"
import styled, { ThemeProvider } from "styled-components"
import PropTypes from "prop-types"
import theme from "../styles/theme"
import BottomMenu from "./BottomMenu"

const StyledLayout = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Oxygen:300,400,700&display=swap');
  main{
  padding:20px;
  @media(min-width:765px){
  padding: 20px 20px 20px 150px;
  }
  
  }
  body{
    padding:0;
    margin:0;
  }
  h1{
    font-size: 30px;
    font-weight: bold;
  }
  h2{
    font-size: 25px;
  }
  h3{
    font-size: 22px;
  }
  
  *{
    color: ${theme.colors.FontColor};
      font-family: 'Oxygen', sans-serif;
  }
  h1{
    margin-left: 30px;
    margin-top: 40px;
  }
`

const Layout = ({ children }) => {

  return (
    <ThemeProvider theme={theme}>
      <>
        <StyledLayout>
          <h1>Meteo</h1>
          <Sidemenu className="sidemenu"/>
          <BottomMenu className="bottomMenu"/>
          <main>{children}</main>
        </StyledLayout>
      </>
    </ThemeProvider>

  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
