import React, { Component } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import SensorCard from "../components/SensorCard"
import api from "../api"
import HumidityIcon from "../assets/icons/humidity.svg"
import TempIcon from "../assets/icons/temp.svg"
const StyledSpinner = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.SpinnerColor};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  animation: orbit 1s linear infinite;

  @keyframes orbit {
    from {
      transform: rotate(0deg) translateX(25px) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(25px) rotate(-360deg);
    }
  }
`
const StyledErrorMessage = styled.h1`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 50%);
  margin: 0 !important;
  text-align: center;
`
const StyledSection = styled.div`
  h2 {
    margin-bottom: 40px;
  }

  ul {
    display: flex;
    padding: 0;

    > *:not(:first-child) {
      margin-left: 20px;
      @media (min-width: 768px) {
        margin-left: 50px;
      }
    }
  }
`
export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sensors: [],
      error: "",
      isLoading: true,
    }
  }
  async listenForSensorReadings() {
    try {
      while (true) {
        const response = await api.sensors.getActiveSensorsReading()
        if (!response.data[0].value)
          throw new Error("API jest nieosiągalne, odśwież stronę")
        this.setState(state => {
          state.sensors = response.data
          state.isLoading = false
          return state
        })
      }
    } catch (error) {
      console.error(error)
      this.setState(state => {
        state.error = error.message
        state.isLoading = false
        return state
      })
    }
  }
  async componentDidMount() {
    this.listenForSensorReadings()
  }

  render() {
    const symbols = {
      temperature: { icon: <TempIcon />, symbol: "°C" },
      humidity: { icon: <HumidityIcon />, symbol: "%" },
    }

    return (
      <Layout>
        <StyledSection>
          {!this.state.error && !this.state.isLoading && (
            <h2>Aktywne Pomiary</h2>
          )}
          {this.state.error && (
            <StyledErrorMessage>{this.state.error}</StyledErrorMessage>
          )}
          {this.state.isLoading && <StyledSpinner></StyledSpinner>}
          <ul>
            {this.state.sensors.map((sensor, i) => {
              sensor.value += symbols[sensor.codeName].symbol
              return (
                <SensorCard key={i} sensor={sensor}>
                  {symbols[sensor.codeName].icon}
                </SensorCard>
              )
            })}
          </ul>
        </StyledSection>
      </Layout>
    )
  }
}
