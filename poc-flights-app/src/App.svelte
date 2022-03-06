
<script lang="ts">
  import { flights } from './lib/db'
  import FlightList from './FlightList.svelte';
</script>

<main class="w-screen flex flex-col items-center max-w-screen-md mx-auto">
  <h1 class="font-bold text-3xl m-4">Flights</h1>

  <FlightList {flights} />
</main>
