
<script lang="ts">
  import { flights } from './lib/db'

  function formatDuration(flight) {
    let d1 = flight.departsAt
    let d2 = new Date(flight.departsAt)
    d2.setMinutes(d2.getMinutes() + flight.durationInMinutes)
    let startTime = d1.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    let endTime = d2.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    return `${startTime} - ${endTime}`
  }
</script>

<main class="w-screen flex flex-col items-center max-w-screen-md mx-auto">
  <h1 class="font-bold text-3xl m-4">Flights</h1>

  <div class="flex flex-col w-full mb-6">
  {#each flights as flight}
    <div class="flex border border-t-0 justify-between border-gray-200 p-4 w-full first:border-t first:rounded-t-lg last:rounded-b-lg">
      <span class="text-xs md:hidden">{flight.departsAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      <span class="text-xs hidden md:inline">{flight.departsAt.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</span>
      <span class="text-xs">{formatDuration(flight)}</span>
      <span class="text-xs">{flight.originIATA} - {flight.destinationIATA}</span>
      <span class="text-xs">${flight.priceInUSD}</span>
    </div>
  {/each}
  </div>
</main>
