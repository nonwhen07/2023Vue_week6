<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Navbar w/ text</a> -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        
       

        <div class="navbar-nav">
        <router-link to="?category=all&page=1" class="nav-link">全部</router-link>
          <router-link to="?category=旅遊類&page=1" class="nav-link">旅遊類</router-link>
          <router-link to="?category=蔬果類&page=1" class="nav-link">蔬果類</router-link>
          <router-link to="?category=肉品類&page=1" class="nav-link">肉品類</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
  
  <script>
export default {
  methods: {
    
  }
}
</script>