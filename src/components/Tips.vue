<template>
  <div class="container">
    <div class="tips-wrap" v-if="tips">
      <div class="text-left tip-col" :key="index" v-for="(tip,index) in tips" v-show="current==index">
        <div class="title tips-title"  :style="'background:'+tip.categories.color">
          <span class="tip-count">Tip {{tip.tip_number}} </span>
          <h1>{{tip.title}}</h1>
          <img class="tip-img" width="100" :src="tip.categories.icon_image">
        </div>
        <div class="row">
          <div class="col-sm-2 col-xs-2 tip-left-col" >
            <h4 class="text-uppercase">{{tip.categories.title}}</h4>
          </div>
          <div class="col-sm-10 col-xs-10" >
            <div id="description" v-html="tip.description">
              {{tip.description}}
              {{ tip.actions }}
            </div>
          </div>
        </div>       
      </div>
    </div>
    <div v-else>
      <div class="col-sm-10 col-xs-10" >
            <div id="description">
              Tips are not available...
            </div>
          </div>
    </div>  
    <v-ons-bottom-toolbar>
      <div class="btns-row">
        <button class="button button--outline pre-btn" v-show="prev_btn" href="javascript:" @click="changePage('p')"><span class='ion-chevron-left' /></button>
        <button class="button button--outline next-btn" v-show="next_btn" href="javascript:" @click="changePage('n')"><span class='ion-chevron-right' /></button>
      </div>
    </v-ons-bottom-toolbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'tips',
  data () {
    return {
      current: 0,
      next_btn: true,
      prev_btn: false,
      tips: ''
    }
  },
  mounted: function () {
    this.tips = this.getTipsByCategory()
    this.showTip()
  },
  watch: {
    current: function (v) {
      var self = this
      if (v === 0) {
        self.prev_btn = false
      } else {
        self.prev_btn = true
      }

      if (v < self.tips.length - 1) {
        self.next_btn = true
      } else {
        self.next_btn = false
      }
    }
  },
  methods: {
    showTip () {
      if (this.$route.params.tip_id > 0) {
        this.current = this.$route.params.tip_id
      } else {
        this.current = 0
      }
    },
    changePage: function (type) {
      if (type === 'n') {
        this.current++
      } else {
        this.current--
      }
    },
    getTipsByCategory () {
      if (navigator.onLine) {
        this.saveCategoriesTipsToCache()
      }
      return JSON.parse(localStorage.getItem('categories_' + this.$route.params.id))
    },
    saveCategoriesTipsToCache () {
      axios({
        method: 'GET',
        url: 'http://techsysap.com/alignme/api/categoryTips/' + this.$route.params.id
      }).then(result => {
        localStorage.setItem('categories_' + this.$route.params.id, JSON.stringify(result.data))
      }, error => {
        console.log(error)
      }
      )
    }
  }
}
</script>

<style>
.button {
  line-height: 18px !important;
  font-size:15px !important;
}
.navbar-default{
  background: none;
  border: none;
  margin: 0;
}
.tip-col{
  margin-bottom: 35px;
  min-height: 450px;
}
.title {
  padding: 15px 105px 15px 52px;
  border-radius: 3px;
  position: relative;
  margin-bottom: 20px;
  min-height: 68px;
}
.tip-count{
  background: #104d8c;
  color: #fff;
  width: 68px;
  -webkit-transform: rotate(-90deg);
  transform: rotate(270deg);
  position: absolute;
  left: -14px;
  top: 14px;
  height: 40px;
  text-align: center;
  border-radius: 3px 3px 0px 0px;
  padding: 10px 5px;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
}
.tip-col:nth-child(2n) .tip-count{
  left: inherit;
  right: -14px;
  border-radius: 0px 0px 3px 3px;
}
.tip-col:nth-child(2n) .title{
  padding-left: 23px;
  padding-right: 113px;
}
.tip-col:nth-child(2n) .title .tip-img{
  right: 5%;
}
.tip-col:nth-child(2n) .tip-left-col{
  float: right;
}
.tip-col:nth-child(2n) .tip-left-col h4{
  left: 0;;
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
    left: -10px;
}

.btns-row{
  margin: 0 0 10px;
  width: 100%;
  min-height: 40px;
  padding-right: 10px;
}
.btns-row .next-btn{
  float: right;
  margin-top:8px;
  margin-right:10px;
}

.btns-row .pre-btn{
  margin-top:8px;
  margin-left:10px;
  float: left;
}


@media screen and (max-width:767px) {
  .navbar-default .navbar-nav>li>a{
    padding: 3px 10px;
    font-size: 13px;
  }
  .tips-wrap .tip-col:nth-child(2n) .tip-left-col h4 {
    left: 35%;
  }
}
@media screen and (max-width:640px) {
  .tips-wrap .tip-col:nth-child(2n) .tip-left-col h4 {
    left: 10%;
  }
  .title h1{
    font-size: 15px;
  }
}
@media screen and (max-width:480px) {
  .tips-wrap .tip-col:nth-child(2n) .tip-left-col h4 {
    left: -15%;
  }
  .tip-col:nth-child(2n) .title{
    padding-left: 10px;
  }
  .tips-title{
    padding-right: 80px;
  }
  .tips-wrap .tips-title h1{
    font-size: 12px;
  }
}
@media screen and (max-width:375px) {
  .tips-wrap .tip-col:nth-child(2n) .tip-left-col h4 {
    left: -35%;
  }
}
</style>