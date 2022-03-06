
<script>
  export let flight;
  import { format } from './FlightListingDataFormatter.svelte'
  const data = format(flight)
</script>

<div class="flex border border-t-0 justify-between border-gray-200 p-4 w-full first:border-t first:rounded-t-lg last:rounded-b-lg">
  <span class="text-xs md:hidden">{data.departureDateShort}</span>
  <span class="text-xs hidden md:inline">{data.departureDateLong}</span>
  <span class="text-xs">{data.startAndEndTimes}</span>
  <span class="text-xs">{data.IATAs}</span>
  <span class="text-xs">{data.price}</span>
</div>