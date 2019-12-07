import axios from "axios"

export default {
  getActiveSensorsReading: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve({
          data: [
            {
              id: "1",
              sensorName: "Sensor1",
              value: "25",
              date: 1572792755271,
              codeName: "temperature",
            },
            {
              id: "2",
              sensorName: "Sensor2",
              value: "45",
              date: 1572792755271,
              codeName: "humidity",
            },
          ],
        })
      }, 500)
    })
  }, //axios.get("/api/activeSensors"),
}
