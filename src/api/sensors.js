import axios from "axios"

axios.defaults.baseURL = "localhost:3000"

function fetchMockSensors() {
  return new Promise((resolve) => {
    return resolve([
      { id: "1", sensorName: "Sensor1", value: "25", "date": 1572792755271, codeName: "temperature" },
      { id: "2", sensorName: "Sensor2", value: "45", "date": 1572792755271, codeName: "humidity" },
    ])
  })
}

export default {

  getActiveSensorsReading: fetchMockSensors,//() => axios.get('/activeSensors')

}
