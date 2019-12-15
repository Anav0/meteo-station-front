import React, { Component } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import SensorCard from "../components/SensorCard"
import api from "../api"
import HumidityIcon from "../assets/icons/humidity.svg"
import TempIcon from "../assets/icons/temp.svg"
import { Line } from "react-chartjs-2"
import Select from "react-select"

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
const StyledRefresh = styled.div`
  margin-top: 40px;
  .css-2b097c-container {
    color: ${({ theme }) => theme.colors.CardFontColor};
    max-width: 400px;
  }
`
const StyledChartWrapper = styled.div`
  @media (min-width: 1366px) {
    max-width: 50%;
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
  margin-bottom: 40px;
  @media (min-width: 1024px) {
    margin-bottom: 90px;
  }
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
      saveToChartEvery: { value: 4, label: "Co czwarty" },
      chartData: {
        labels: [],
        datasets: [
          {
            id: "temperature",
            label: "Temperatura",
            backgroundColor: "#ffff",
            borderColor: "#ffff",
            fill: false,
            data: [],
          },
        ],
      },
    }
  }
  updateChartData(sensors) {
    //Deep cloning
    let labels = [...this.state.chartData.labels]
    let datasets = [...this.state.chartData.datasets]
    sensors.forEach(sensor => {
      labels.push(
        `${sensor.date.toLocaleDateString("pl-PL", {
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}`
      )
      datasets
        .find(dataset => dataset.id === sensor.codeName)
        .data.push(sensor.value)
    })
    this.setState(state => {
      state.chartData.labels = labels
      state.chartData.datasets = datasets
      return state
    })
  }
  async listenForSensorReadings() {
    try {
      let i = 0
      while (true) {
        const response = await api.sensors.getActiveSensorsReading()
        if (!response.data[0].sensorName)
          throw new Error("API jest nieosiągalne, odśwież stronę")
        response.data.map(reading => (reading.date = new Date()))
        this.setState(state => {
          state.sensors = response.data
          state.isLoading = false
          return state
        })
        if (i % this.state.saveToChartEvery.value === 0) {
          this.updateChartData(response.data)
          i = 0
        }
        i++
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
  changeSaveToChart = selection => {
    this.setState(state => {
      state.saveToChartEvery = selection
      return state
    })
  }
  render() {
    const symbols = {
      temperature: { icon: <TempIcon />, symbol: "°C" },
      humidity: { icon: <HumidityIcon />, symbol: "%" },
    }
    const chartRefrasheOptions = [
      { value: 1, label: "Każdy" },
      { value: 2, label: "Co drugi" },
      { value: 4, label: "Co czwarty" },
      { value: 6, label: "Co szósty" },
      { value: 8, label: "Co ósmy" },
      { value: 10, label: "Co dziesiąty" },
    ]
    const { saveToChartEvery } = this.state

    return (
      <Layout>
        {this.state.error && (
          <StyledErrorMessage>{this.state.error}</StyledErrorMessage>
        )}
        {this.state.isLoading && <StyledSpinner></StyledSpinner>}
        {!this.state.error && !this.state.isLoading && (
          <div>
            <StyledSection>
              <h2>Aktywne Pomiary</h2>
              <ul>
                {this.state.sensors.map((sensor, i) => {
                  return (
                    <SensorCard
                      key={i}
                      sensor={sensor}
                      symbol={symbols[sensor.codeName].symbol}
                    >
                      {symbols[sensor.codeName].icon}
                    </SensorCard>
                  )
                })}
              </ul>
            </StyledSection>
            <StyledSection>
              <h2>Wykresy</h2>
              <StyledChartWrapper>
                <Line data={this.state.chartData} />
              </StyledChartWrapper>
              <StyledRefresh>
                <h4>Co który pomiar ma być dodawany do wykresu?</h4>
                <Select
                  isSearchable={false}
                  options={chartRefrasheOptions}
                  value={saveToChartEvery}
                  onChange={this.changeSaveToChart}
                />
              </StyledRefresh>
            </StyledSection>
          </div>
        )}
      </Layout>
    )
  }
}
