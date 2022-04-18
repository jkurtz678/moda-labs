<template>
  <div class="submit">
    <h1>Submit to moda archives</h1>
    <button @click="submit()">Submit Token</button>
  </div>
</template>

<script lang="ts">
import { createTokenMeta } from "@/api/token-meta"
import type { TokenMeta } from "@/types/types"
export default {
  methods: {
    submit() {
      const token = {name: "starry night", artist: "vang gogh"} as TokenMeta
      createTokenMeta(token).then(r => {
        alert("Successfully submitted token")
      }).catch(err => {
        alert(err)
      })
    }
  }
}
</script>

<style>
</style>
