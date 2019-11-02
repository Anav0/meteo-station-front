/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import SideMenu from "./sidemenu"
import styled from "styled-components"
import colors from "../styles/colors"
import PropTypes from "prop-types"

const StyledLayout = styled.div`
@import url('https://fonts.googleapis.com/css?family=Oxygen:300,400,700&display=swap');
main,body{
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
  color: ${colors.FontColor};
    font-family: 'Oxygen', sans-serif;

}
h1{
  margin-left: 30px;
  margin-top: 40px;
}

`
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <StyledLayout>
        <h1>Meteo</h1>
        <SideMenu/>
        <main>{children}</main>
      </StyledLayout>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
