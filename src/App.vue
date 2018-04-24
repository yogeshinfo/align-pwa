<template>
  <div>
    <div v-if="this.$route.path == '/'">
      <router-view></router-view>
    </div>
    <div v-else>
      <v-ons-splitter>
        <v-ons-splitter-side swipeable width="250px" collapse="" side="left" :open.sync="openSide">
          <v-ons-page>
            <v-ons-list>
              <v-ons-list-header>Navigation</v-ons-list-header>
              <v-ons-list-item @click="goToHome" style="background:#969696" tappable modifier="chevron">
                <div class="center" style="color:#fff">Home</div>
              </v-ons-list-item>
              <v-ons-list-item v-for="(cat,index) in Category" tappable modifier="chevron" :key="index" @click="changePage(cat)" :style="'background:'+cat.color">
                <div class="center" style="color: #fff">{{ cat.title }}</div>
              </v-ons-list-item>
            </v-ons-list>
          </v-ons-page>
        </v-ons-splitter-side>
        <v-ons-splitter-content>
          <v-ons-toolbar>
            <div class="left">
              <v-ons-toolbar-button @click="toggleMenu">
                <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
              </v-ons-toolbar-button>
            </div>
            <div class="center">{{ title }}</div>      
          </v-ons-toolbar>
          <div style="margin-top:70px;">
            <router-view></router-view>
          </div>
        </v-ons-splitter-content>    
      </v-ons-splitter>
    </div>      
    <div id="app"></div>
  </div>
</template>
<script>
window.firebase.initializeApp({
  'messagingSenderId': '832704259166'
})

const messaging = window.firebase.messaging()

const customToolbar = {
  template: '#toolbar',
  props: ['title', 'action']
}
export default {
  name: 'app',
  components: {
    customToolbar
  },
  data () {
    return {
      Category: '',
      openSide: false,
      page: '',
      title: 'Align Tips'
    }
  },
  mounted: function () {
    this.Category = this.getCategories()
    this.getPermission()
  },
  methods: {
    action: function () {
      console.log('action called')
    },
    changePage: function (cat) {
      this.openSide = false
      window.location.href = '/category/' + cat.id
    },
    goToHome: function () {
      window.location.href = '/'
    },
    getPermission: function () {
      var self = this
      messaging.requestPermission().then(function () {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function (registration) {
            messaging.useServiceWorker(registration)
            // Request permission and get token.....
            console.log('Service worker registered')
          }).catch(function (err) {
            console.log('An error occurred while registering. ', err)
          })
        }
        messaging.getToken().then(function (currentToken) {
          if (currentToken) {
            messaging.onMessage(function (payload) {
              console.log('Message received. ', payload)
            })
            console.log('Current Token : ' + currentToken)
            self.saveTokenToDB(currentToken)
            if (currentToken !== localStorage.getItem('token')) {
              // save to DB
              self.saveTokenToDB(currentToken)
              localStorage.setItem('token', currentToken)
            }
          } else {
            console.log('No Instance ID token available. Request permission to generate one.')
          }
        }).catch(function (err) {
          console.log('An error occurred while retrieving token. ', err)
        })
      }).catch(function (err) {
        console.log('Unable to get permission to notify.', err)
      })
    },
    getCategories () {
      if (navigator.onLine) {
        this.saveCategoriesToCache()
      }
      return JSON.parse(localStorage.getItem('categories'))
    },
    saveCategoriesToCache () {
      console.log('Method called for categories')
      window.axios({
        method: 'GET',
        url: 'http://techsysap.com/alignme/api/categories'
      }).then(result => {
        localStorage.setItem('categories', JSON.stringify(result.data))
      }, error => {
        console.log(error)
      }
      )
    },
    saveTokenToDB (token) {
      console.log('Method called for saving token to DB')
      window.axios({
        method: 'post',
        url: 'http://techsysap.com/alignme/api/saveToken',
        data: {
          token: token
        }
      }).then(result => {
        console.log('Result' + result.data)
        localStorage.setItem('token', token)
      }, error => {
        console.log(error)
      }
      )
    },
    toggleMenu: function () {
      if (this.openSide) {
        this.openSide = false
      } else {
        this.openSide = true
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  overflow: inherit;
}
body ons-splitter{
  overflow-y: auto;
}
.bottom-bar{
  position: fixed;
}
.tips-wrap{
  padding-bottom: 70px;
}
.btns-row{
  text-align: center;
}
#description{
  padding: 0 25px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  margin:0px !important;
  padding-right: 0px !important;
  padding-left: 0px !important;
}
main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  padding: 0 16px 0 24px;
  background-color: #184d8c;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

.toolbar--material {
  position:fixed !important;
}

.navbar-default{
  background: none;
  border: none;
  margin: 0;
}

.navbar-default .navbar-nav>li>a{
  color: #fff;
  padding: 15px 11px;
}
.navbar-default .navbar-nav>li>a:hover{
  color: #ff901d;
}

.navbar-header {
  float: none;
}
.navbar-toggle {
  display: block;
}
.navbar-collapse.collapse {
  display: none!important;
}
.navbar-nav {
  float: none!important;
}
.navbar-nav>li {
  float: none;
  margin: 0;
}
.navbar-collapse.collapse.in{
  display:block !important;
}

.navbar-default .navbar-toggle .icon-bar {
    background-color: #fff;
    padding: 0;
  }
  .navbar-default .navbar-toggle{
    background: #ef8f29;
    border-color: #ffd8ae;
    }
  .navbar-default .navbar-toggle:focus, .navbar-default .navbar-toggle:hover {
      background-color: #ef8f29;
  }
  .navbar-default .navbar-collapse, .navbar-default .navbar-form {
    border-color: #4c81bf;
  }

@media screen and (max-width:1199px){
  header{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .navbar-default .navbar-nav>li>a{
    padding: 5px 10px;
  }
}
@media screen and (max-width:767px){
  
  .tips-wrap .tip-col:nth-child(2n) .tip-left-col h4 {
    left: 50%;
  }
   .tips-wrap .tip-col:nth-child(2n) .title .tip-img {
    right: 7%;
  }
}
  @media screen and (max-width:640px){
    .tips-wrap .tip-col:nth-child(2n) .title .tip-img {
      right: 9%;
    }
    .tips-wrap .tip-col:nth-child(2n) .tip-left-col h4 {
      left: 32%;
    }
  }
  @media screen and (max-width:480px){
    .tips-wrap .title {
      min-height: 68px;
    }
    .tips-wrap .title h1 {
      font-size: 14px;
    }
    .tips-wrap .title .tip-img{
      width: 85px;
      top: -22px;
      right: 1%;
    }
    .tips-wrap .tip-col:nth-child(2n) .title .tip-img {
      right: 12%;
    }
    .tips-wrap .tip-col:nth-child(2n) .tip-left-col h4 {
      left: 12%;
    }
    .tips-wrap .tip-col:nth-child(2n) .title{
      padding-right: 85px;
    }
  }
  @media screen and (max-width:375px){
    .tips-wrap .tip-col:nth-child(2n) .title .tip-img {
      right: 14%;
    }
    .tips-wrap .tip-col:nth-child(2n) .tip-left-col h4 {
      left: 0%;
    }
    
  }
</style>
