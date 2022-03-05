<script lang="ts">

  const airports = [
    { iata: "DFW", name: "Dallas/Fort Worth International Airport" },
    { iata: "JFK", name: "John F. Kennedy International Airport" },
    { iata: "LAX", name: "Los Angeles International Airport" },
    { iata: "DEN", name: "Denver International Airport" },
  ]

  const averageFlightData = {
    get(a, b) { return a < b ? this[`${a}:${b}`] : this[`${b}:${a}`] },
    "DEN:DFW": { durationInMinutes: 120, priceInUSD: 500, },
    "DEN:LAX": { durationInMinutes: 160, priceInUSD: 450, },
    "DEN:JFK": { durationInMinutes: 220, priceInUSD: 700, },
    "DFW:JFK": { durationInMinutes: 200, priceInUSD: 300, },
    "DFW:LAX": { durationInMinutes: 200, priceInUSD: 250, },
    "LAX:JFK": { durationInMinutes: 320, priceInUSD: 600, },
  }

</script>

<main>
  <h1>Flights</h1>

  <pre>
    {JSON.stringify(averageFlightData.get('DEN', 'DFW'))}
  </pre>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
