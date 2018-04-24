<template>
  <div class="container">    
    <div class="tips-wrap">
      <img class="tip-img" width="100%" src="https://upload.wikimedia.org/wikipedia/commons/3/30/Rubik_cube.png">
      <div class="text-left tip-col">
        <div class="title tips-title"  :style="'background:' + categoryDetails.color">          
          <h1>{{categoryDetails.title}}</h1>
          <img class="tip-img" width="100" src="https://upload.wikimedia.org/wikipedia/commons/3/30/Rubik_cube.png">          
        </div>
        <div class="row">
          <div class="col-sm-10 col-xs-12" >
            <div id="description" v-html="categoryDetails.description">              
              {{ categoryDetails.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-ons-bottom-toolbar>
      <div class="btns-row">
        <a class="button button--outline btns" :href="'/tips/' + categoryDetails.id" >Tips <span class='ion-chevron-right' /></a>
      </div>
    </v-ons-bottom-toolbar>
  </div>
</template>
<script>
export default {
  name: 'categories',
  data () {
    return {
      categoryDetails: ''
    }
  },
  mounted: function () {
    this.categoryDetails = this.getCategory()
  },
  methods: {
    getCategory () {
      var catJson = JSON.parse(localStorage.getItem('categories'))
      return catJson[--this.$route.params.id]
    }
  }
}
</script>

<style>

.btns-row .btns{
  text-align: center;
  margin-top:8px;  
}
.button {
  line-height: 18px !important;
  font-size:15px !important;
}

.title {
  padding: 15px 105px 15px 52px;
  border-radius: 3px;
  position: relative;
  margin-bottom: 20px;
  min-height: 68px;
}

.title h1{
  margin: 0;
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 600;
}

.title .tip-img{
  position: absolute;
  top: -16px;
  right: 2%;
}

.tip-left-col h4{
    text-transform: uppercase;
    white-space: nowrap;
    -webkit-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    position: absolute;
    top: 119px;
    left: -21px;
}
</style>
