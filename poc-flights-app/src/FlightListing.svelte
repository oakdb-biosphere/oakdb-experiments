
<script lang="ts">
  export let flight;
  import * as formatter from './FlightListingFormatter.svelte'
  import type { PresentableFlightListing } from './FlightListingFormatter.svelte'
  const listing: PresentableFlightListing = formatter.makePresentable(flight)
</script>

<div class="flex border border-t-0 justify-between border-gray-200 p-4 w-full first:border-t first:rounded-t-lg last:rounded-b-lg">
  <span class="text-xs md:hidden">{listing.departureDateShort}</span>
  <span class="text-xs hidden md:inline">{listing.departureDateLong}</span>
  <span class="text-xs">{listing.startAndEndTimes}</span>
  <span class="text-xs">{listing.IATAs}</span>
  <span class="text-xs">{listing.price}</span>
</div>
