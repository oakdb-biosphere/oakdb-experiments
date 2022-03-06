
<script lang="ts" context="module">
  export interface PresentableFlightListing {
    departureDateShort: String,
    departureDateLong: String,
    startAndEndTimes: String,
    IATAs: String,
    price: String,
  }

  function shortTime(date: Date): String {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
  }

  function shortDate(date: Date): String {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  function longDate(date: Date): String {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })
  }

  function getStartAndEndTimes(flight): String {
    let start = flight.departsAt
    let end = new Date(flight.departsAt)
    end.setMinutes(end.getMinutes() + flight.durationInMinutes)
    return `${shortTime(start)} - ${shortTime(end)}`
  }

  export function makePresentable(flight): PresentableFlightListing {
    return {
      departureDateShort: shortDate(flight.departsAt),
      departureDateLong: longDate(flight.departsAt),
      startAndEndTimes: getStartAndEndTimes(flight),
      IATAs: `${flight.originIATA} - ${flight.destinationIATA}`,
      price: `$${flight.priceInUSD}`,
    }
  }

</script>