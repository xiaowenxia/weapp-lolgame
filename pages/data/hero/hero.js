//获取应用实例
var app = getApp()
Page({
  data: {
    token: "656AE-24A3A-66426-4A479",
    toastHidden:true,
  },
  toastChange: function() {
    this.setData({
        toastHidden:true
      })
  },
  bindSearchInput:function(e){
    this.setData({
      search_name:e.detail.value
    })
  },
  //事件处理函数
  bindSearchTap: function() {
    var that = this
    if(that.data.search_name == null || that.data.search_name == "")
    {
      console.log("please input the name")
      
      that.setData({
        toastHidden:false
      })
      return
    }
    that.setData({
      loading:true
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/UserArea?keyword='+this.data.search_name,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        that.setData({
          loading:false
        })
        console.log(JSON.stringify(res))
        app.globalData.search_result = res
        wx.navigateTo({
          url: 'result/result'
        })
      }
    })
  },
  onLoad: function() {
    var that = this
    this.setData({
      token: app.globalData.token
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/champion',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        console.log(JSON.stringify(res))
        
        that.setData({
          champions: res.data.data
        })
      }
    })

    
  }
})
