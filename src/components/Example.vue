<template>
  <section>
    <div class="container">
      <h1>Vue message 2: {{ message }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      message: null,
    }
  },
  created () {
    // this.message = this.$store.getters.getMessage;
    this.message = 'hello world';
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: green;
}
</style>