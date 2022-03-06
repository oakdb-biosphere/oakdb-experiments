
<script>
  export let departureDateShort;
  export let departureDateLong;
  export let startAndEndTimes;
  export let IATAs;
  export let price;
</script>

<div class="flex border border-t-0 justify-between border-gray-200 p-4 w-full first:border-t first:rounded-t-lg last:rounded-b-lg">
  <span class="text-xs md:hidden">{departureDateShort}</span>
  <span class="text-xs hidden md:inline">{departureDateLong}</span>
  <span class="text-xs">{startAndEndTimes}</span>
  <span class="text-xs">{IATAs}</span>
  <span class="text-xs">{price}</span>
</div>