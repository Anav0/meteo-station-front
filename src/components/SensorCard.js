import React from "react"
import styled from "styled-components"
import { StyledCard } from "./StyledCard"
import PropTypes from "prop-types"

const StyledSensorCard = styled.div`
  width: 225px;
  height: 200px;
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    h2 {
      color: ${({ theme }) => theme.colors.CardFontColor};
    }
  }
`

const StyledSensorCardIcon = styled.div`
  position: absolute;
  left: 25px;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: scale(1.25);
  }
`

const SensorCard = props => {
  return (
    <StyledSensorCard>
      <StyledCard>
        <StyledSensorCardIcon>{props.children}</StyledSensorCardIcon>
        <h2>
          {props.sensor.value}
          {props.symbol}
        </h2>
      </StyledCard>
    </StyledSensorCard>
  )
}
SensorCard.propTypes = {
  sensor: PropTypes.object,
}
export default SensorCard
