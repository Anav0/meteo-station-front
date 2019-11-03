import React, { Component } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import SensorCard from "../components/SensorCard"
import TempIcon from "../assets/temp.svg"
import HumidityIcon from "../assets/humidity.svg"
import api from "../api"
import settings from "../settings"

const StyledSection = styled.div`
  h2{
  margin-bottom: 40px;
  }
  
  ul{
    display:flex;
    padding:0;
    
    > *:not(:first-child){
      margin-left:20px;
      @media(min-width:768px){
      margin-left:50px;
      }
    }
  }
`

export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sensors: [],
    }
  }

  async componentDidMount() {
    const fetchData = async () => {
      const sensors = await api.sensors.getActiveSensorsReading()
      this.setState((state) => {
        state.sensors = sensors
        return state
      })
    }
    await fetchData()
    setInterval(async () => {
      await fetchData()
    }, settings.dataFetchInterval)
  }

  render() {
    const symbols = {
      "temperature": { icon: <TempIcon/>, symbol: "°C" },
      "humidity": { icon: <HumidityIcon/>, symbol: "%" },
    }
    return (
      <Layout>
        <StyledSection>
          <h2>Aktywne Pomiary</h2>
          <ul>
            {
              this.state.sensors.map((sensor, i) => {
                  sensor.value += symbols[sensor.codeName].symbol
                  return (<SensorCard key={i} sensor={sensor}>
                    {symbols[sensor.codeName].icon}
                  </SensorCard>)
                },
              )
            }
          </ul>
        </StyledSection>
      </Layout>
    )
  }
}

