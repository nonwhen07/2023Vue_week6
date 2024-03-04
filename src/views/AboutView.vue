<template>
  <div class="about">
    <h1>This is an about page</h1>
    <LoadingOverlay :active="isLoading"/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>


<script>

export default {
  data(){
    return {
      isLoading: true,
    }
  },
  mounted(){
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>
