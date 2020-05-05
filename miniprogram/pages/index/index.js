// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity:"",
    show_teacher: true,
    complete:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var that = this;
    await wx.cloud.callFunction({
      name: "login",
      success: res => {
        that.setData({
          complete:true
        })
        console.log(res);
        wx.setStorage({
          key:"openid",
          data: res.result.openid
        })
        if(res.result.isBind == false){
          // 注册未绑定信息
          const app = getApp()
          app.globalData.isBind = false;

          wx.showModal({
            title:"尚未绑定",
            content:"只有当您绑定了宿舍管理系统的账号时, 才可以正常使用相应功能, 现在即将前往绑定...",
            confirmText: "前往",
            success:function(res){
              if(res.confirm == true){
                console.log()
                  wx.navigateTo({
                    url: '/pages/account/account',
                  })
              }
            }
          })
        }
        else{
          const app = getApp();
          app.globalData.isBind = true;
          app.globalData.identity = res.result.identity;
          app.globalData.account = res.result.account;
          that.setData({
            identity: res.result.identity
          })
        }
      },
      fail:error=>{
        that.setData({
          complete:true
        });
        console.log(error);
        wx.showModal({
          title: '网络错误',
          content: '后台出现未知错误, 请联系管理员',
          complete:function(){
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  go:function(e){
    wx.navigateTo({
      url:e.currentTarget.dataset.url
    })
  }
})