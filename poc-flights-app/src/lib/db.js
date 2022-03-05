
const airports = [
  { iata: "DEN", name: "Denver International Airport" },
  { iata: "DFW", name: "Dallas/Fort Worth International Airport" },
  { iata: "JFK", name: "John F. Kennedy International Airport" },
  { iata: "LAX", name: "Los Angeles International Airport" },
]

const averageFlightData = {
  get(a, b) { return a < b ? this[`${a}:${b}`] : this[`${b}:${a}`] },
  "DEN:DFW": { durationInMinutes: 120, priceInUSD: 500, },
  "DEN:LAX": { durationInMinutes: 160, priceInUSD: 450, },
  "DEN:JFK": { durationInMinutes: 220, priceInUSD: 700, },
  "DFW:JFK": { durationInMinutes: 200, priceInUSD: 300, },
  "DFW:LAX": { durationInMinutes: 200, priceInUSD: 250, },
  "JFK:LAX": { durationInMinutes: 320, priceInUSD: 600, },
}

function randomBetween(min, max) { 
  return Math.floor(Math.random() * (max - min) + min)
} 

function randomItem(list = []) {
  const index = randomBetween(0, list.length) 
  return list[index]
}

// Populating random flight data
export const flights = []
while (flights.length < 10) {
  const [a, b] = [randomItem(airports), randomItem(airports)];
  if (a.iata == b.iata) continue

  const flight = { ...averageFlightData.get(a.iata, b.iata) }
  flight.durationInMinutes += randomBetween(-20, 20)
  flight.priceInUSD += randomBetween(-75, 75)
  flights.push(flight)
}
