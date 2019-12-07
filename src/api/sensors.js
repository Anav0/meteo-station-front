import axios from "axios"

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const interval = 3600000 //1h;
let current = 1575742319

export default {
  getActiveSensorsReading: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve({
          data: [
            {
              id: "1",
              sensorName: "Sensor1",
              value: randomBetween(0, 30),
              date: (current += interval),
              codeName: "temperature",
            },
          ],
        })
      }, 1000)
    })
  }, //axios.get("/api/activeSensors"),
}
