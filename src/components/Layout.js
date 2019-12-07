import React from "react"
import Sidemenu from "./Sidemenu"
import BottomMenu from "./BottomMenu"
import styled, { ThemeProvider } from "styled-components"
import PropTypes from "prop-types"
import themeLight from "../styles/theme"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Oxygen:300,400,700&display=swap");
  * {
    font-family: "Oxygen", sans-serif;
  }
  html{
    min-height:100vh;
    min-width:100vw;
    overflow-x:hidden;
  }
  body {
    background-image: ${({ theme }) => theme.colors.Background};
    background-size: cover;
  }
`
const StyledLayout = styled.div`
  color: ${themeLight.colors.FontColor};

  main {
    padding: 20px;
    @media (min-width: 768px) {
      padding: 60px;
    }
    @media (min-width: 1366px) {
      padding: 20px 20px 20px 150px;
    }
  }

  h1 {
    font-size: 30px;
    font-weight: bold;
  }
  h2 {
    font-size: 25px;
  }
  h3 {
    font-size: 22px;
  }

  h1 {
    margin-left: 30px;
    margin-top: 40px;
  }
`

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={themeLight}>
      <>
        <GlobalStyle />
        <StyledLayout>
          <h1>Meteo</h1>
          {/* <button onClick={() => switchTheme("light")}>Light Theme</button>
          <button onClick={() => switchTheme("dark")}>Dark Theme</button> */}
          {/* <Sidemenu className="sidemenu"/> */}
          {/* <BottomMenu className="bottomMenu" /> */}
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
