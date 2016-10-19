//获取应用实例
var app = getApp()
Page({
  data:{
    select: ["select", "",""],
    display:["display","hidden","hidden"],
    point: [
      {
        "label": "击杀",
        "value": 100
      },
      {
        "label": "生存",
        "value": 100
      },
      {
        "label": "助攻",
        "value": 100
      },
      {
        "label": "物理",
        "value": 100
      },
      {
        "label": "魔法",
        "value": 100
      },
      {
        "label": "防御",
        "value": 100
      },
      {
        "label": "金钱",
        "value": 100
      }
    ]

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
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg);
  },
  valueToPoint: function(value, index, total) {
    var x     = 0
    var y     = -value
    var angle = Math.PI * 2 / total * index
    var cos   = Math.cos(angle)
    var sin   = Math.sin(angle)
    var tx    = x * cos - y * sin + 100
    var ty    = x * sin + y * cos + 100
    return {
      x: tx,
      y: ty
    }
  },
  //#bbe6ea
  //#9ae4ea
  //##6bdbe4
  //#2199a2
  canvasDraw: function(){
    //使用wx.createContext获取绘图上下文context
    var context = wx.createContext()
    
    /* 绘制外围圈 */
    //context.arc(100,100,100,0,Math.PI*2,true);
    var point = this.data.point
    var r_color = ["#d0f0ef", "#99dee3", "#54bfc5", "#238890"]
    var pos = []

    
    for(var r = 0; r < 4; r ++)
    {
      context.beginPath();
      /* 获取七星图七个点坐标 */
      for(var i = 0; i < point.length; i++)
      {
        pos[i] = this.valueToPoint(point[i].value, i, point.length)
        point[i].value -= 25
      }
      /* 绘制 七角星 */
      context.moveTo(pos[0].x,pos[0].y)
      for(var i = 1; i < point.length; i++)
          context.lineTo(pos[i].x,pos[i].y)
      context.lineTo(pos[0].x,pos[0].y)
      context.setFillStyle(r_color[r])
      if(r == 0)
        context.setStrokeStyle(r_color[1])
      else
        context.setStrokeStyle(r_color[r])
      context.fill()

      context.stroke()
      context.closePath()
      /* 绘制到中心的线*/
      context.beginPath()
      for(var k = 0; k < point.length; k++)
      {
        context.moveTo(pos[k].x,pos[k].y)
        context.lineTo(100,100)
      }
      context.setStrokeStyle(r_color[1])
      context.stroke()
      context.closePath()
      context.setFontSize(14)
      if(r == 0)
      {
        for(var h = 0; h < point.length; h++)
          context.fillText(point[h].label, pos[h].x, pos[h].y)
      }
    }


    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'firstCanvas',
      actions: context.getActions() //获取绘图动作数组
    });
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.area[this.data.area_id-1].name
    })
    this.canvasDraw()
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
