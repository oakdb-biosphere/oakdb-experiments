
<script lang="ts" context="module">
  function getStartAndEndTimes(flight) {
    let d1 = flight.departsAt
    let d2 = new Date(flight.departsAt)
    d2.setMinutes(d2.getMinutes() + flight.durationInMinutes)
    let startTime = d1.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    let endTime = d2.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    return `${startTime} - ${endTime}`
  }

  export function format(flight) {
    return {
      departureDateShort: flight?.departsAt?.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric',
      }),

      departureDateLong: flight?.departsAt?.toLocaleDateString('en-US', {
        weekday: 'short', month: 'long', day: 'numeric',
      }),

      startAndEndTimes: getStartAndEndTimes(flight),
      IATAs: `${flight.originIATA} - ${flight.destinationIATA}`,
      price: '$' + flight.priceInUSD,
    }
  }

</script>