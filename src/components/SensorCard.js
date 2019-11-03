import React from "react"
import styled from "styled-components"
import { StyledCard } from "./StyledCard"
import PropTypes from "prop-types"

const StyledSensorCard = styled.div`
width: 225px;
height: 200px;
section{
display:flex;
align-items: center;
justify-content: center;
position: relative;
}
`

const StyledSensorCardIcon = styled.div`
  position: absolute;
  left:0;
  top:0;
  background: ${({ theme }) => theme.colors.AccentColor1};
  width:50px;
  height:40px;
  border-radius: 25px 0 10px;
  display:flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width:20px;
  }
`

const SensorCard = (props) => {
  return (
    <StyledSensorCard>
      <StyledCard>
        <StyledSensorCardIcon>
          {props.children}
        </StyledSensorCardIcon>
        <h2>{props.sensor.value}</h2>
      </StyledCard>
    </StyledSensorCard>
  )
}
SensorCard.propTypes = {
  sensor: PropTypes.object,
  children: PropTypes.node.isRequired,
}
export default SensorCard
