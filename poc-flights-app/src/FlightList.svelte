
<script>
  export let flights = [];
  import FlightListing from './FlightListing.svelte'
</script>

<div class="flex flex-col w-full mb-6">
  {#each flights as flight}
    <FlightListing {flight}/>
  {/each}
</div>
