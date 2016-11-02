//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    token:null,
    token_video: null,
    video_latest: null,
    tab:[
      {"idx":0,"hover":'top-hoverd-btn','title':"最新视频","content":"display"},
      {"idx":1,"hover":'','title':"英雄视频","content":"hidden"},
      {"idx":2,"hover":'','title':"解说","content":"hidden"},
      {"idx":3,"hover":'','title':"查询","content":"hidden"},
    ]
  },
  toTab: function(event){
      var index = parseInt(event.target.dataset.index)
      //console.log(index)
      var tolatest = '',tohero='',toauthor='',tosearch=''
      var tab = this.data.tab
      for(var i = 0; i < tab.length; i++)
      {
        tab[i].hover = ''
        tab[i].content = 'hidden'
        if(index == tab[i].idx)
        {
          tab[i].hover = 'top-hoverd-btn'
          tab[i].content = 'display'
        }
      }
      this.setData({
          tab: tab
      });
  },
  refresh: function(){
    var that = this
    this.setData({
      token_video: app.globalData.token_video,
      token: app.globalData.token
    })

    wx.request({
      url: 'http://lolapi.games-cube.com/Area',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        app.globalData.area = res.data.data
      }
    })
    wx.request({
      url: 'http://infoapi.games-cube.com/GetNewstVideos?p=1',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token_video
      },
      success: function(res) {
        var latest_swiper = res.data.data.slice(0,5)
        var length = res.data.data.length
        var latest_list = res.data.data.slice(5,length)
        that.setData({
          latest_swiper: latest_swiper,
          latest_list: latest_list
        })
      }
    })
  },
  onLoad: function() {
    this.refresh()
  },
  onPullDownRefresh () {
    this.refresh()
    wx.stopPullDownRefresh()
  }
  
})
