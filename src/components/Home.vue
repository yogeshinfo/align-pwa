<template>
  <div class="tips-wrap">
      <div class="text-left tip-col" v-for="hc in content">
          <div class="title top-head">
          <h1>{{ hc.title}}</h1>
          <h2>We have used this model for</h2>          
          </div>
          <div class="col-sm-12" >
            <div class="description" v-html="hc.description">
             {{hc.description}}     
            </div>
          </div>      
      </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      content: '',
      offsetHeight: ''
    }
  },
  mounted: function () {
    this.content = this.getHomeContent()
  },

  methods: {
    getHomeContent () {
      console.log('get home is called ')
      if (navigator.onLine) {
        this.saveHomeContentToCache()
      }
      return JSON.parse(localStorage.getItem('home_content'))
    },
    saveHomeContentToCache () {
      window.axios({
        method: 'GET',
        url: 'http://techsysap.com/alignme/api/home'
      }).then(result => {
        localStorage.setItem('home_content', JSON.stringify(result.data))
      }, error => {
        console.log(error)
      }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
.tip-col{
  width: 100%;
  float: left;
  margin-bottom: 25px;
}
.title {
      padding: 13px 23px 13px 52px;
    border-radius: 3px;
    position: relative;
    margin-bottom: 20px;
    background: #d50f0f;
}
.tip-count{
    background: #104d8c;
    color: #fff;
    width: 68px;
    -webkit-transform: rotate(-90deg);
    transform: rotate(270deg);
    position: absolute;
    right: -14px;
    top: 14px;
    height: 40px;
    text-align: center;
    border-radius: 3px 3px 0px 0px;
    padding: 10px 5px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.5px;
}
.title h1{
  margin: 0;
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 600;
}
.title h2{
    font-size: 15px;
    color: #fff;
    margin: 4px 0 0 0;
}
.description{
  padding: 0 40px;
}
</style>