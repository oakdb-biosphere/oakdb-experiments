
<script lang="ts">
  import { flights } from './lib/db'
</script>

<main class="w-screen flex flex-col items-center">
  <h1 class="font-bold text-3xl m-4">Flights</h1>
  <pre>{JSON.stringify(flights, null, 2)}</pre>
</main>
