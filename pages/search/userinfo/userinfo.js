//获取应用实例
var app = getApp()
Page({
  data:{
    select: ["select", "",""],
    display:["display","hidden","hidden"]
  },
  selectNav: function(event){
    var index = parseInt(event.target.dataset.index);
    var sel = ["","",""]
    var dis = ["hidden","hidden","hidden"]
    sel[index] = "select"
    dis[index] = "display"
    this.setData({
      select:sel,
      display:dis
    })
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.area[this.data.area_id-1].name
    })
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      token: app.globalData.token,
      area: app.globalData.area,
      battle_flag: app.globalData.battle_flag,
      division_name: app.globalData.division_name,
      division_position: app.globalData.division_position,
      game_type: app.globalData.game_type,
      win: app.globalData.win
    })
    
    if(options.qquin && options.area_id)
    {
      console.log("this is search user info")
      this.setData({
        qquin: options.qquin,
        area_id: options.area_id
      })
    }
    else
    {
      console.log("this is default user info")
      this.setData({
        qquin: app.globalData.user_default.qquin,
        area_id: app.globalData.user_default.area_id
      })
    }
    wx.request({
      url: 'http://lolapi.games-cube.com/UserHotInfo?qquin='+this.data.qquin+'&vaid='+this.data.area_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          user_hot_info: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/UserExtInfo?qquin='+this.data.qquin+'&vaid='+this.data.area_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          user_ext_info: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/CombatList?qquin='+this.data.qquin+'&vaid='+this.data.area_id+'&p=0',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          combat_list: res.data.data
        })
      }
    })
    
    
  }
  
})
