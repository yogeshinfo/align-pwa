<template>
  <div class="container">    
    <div class="tips-wrap">
      <img class="tip-img" width="100%" src="http://techsysap.com/alignme/public/img/splash-img.png">
    </div>
    <v-ons-bottom-toolbar>
      <div class="btns-row">
        <a class="button button--outline btns" :href="'/home/'" >Let's Get Started <span class='ion-chevron-right' /></a>
      </div>
    </v-ons-bottom-toolbar>
  </div>
</template>

<script>
export default {
  name: 'splash',
  data () {
    return {
      content: '',
      page: 'splash'
    }
  },
  mounted: function () {
    this.content = 'splash Screen content'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>