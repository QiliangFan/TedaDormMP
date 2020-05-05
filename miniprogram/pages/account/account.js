// miniprogram/pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBind: false,
    identity:"",
    account:"",
    pwd: "",
    userData: {},
    complete:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var that = this;
    const app = getApp();
    await this.setData({
      isBind:  app.globalData.isBind,
      identity: app.globalData.identity,
      account: app.globalData.account
    });

    if (this.data.isBind) {
      wx.cloud.callFunction({
        name: "userInfo",
        data: {
          method: "getUserInfo",
          identity: this.data.identity,
          account:this.data.account,
        }
      }).then(function(res){
        console.log(res);
        that.setData({
          userData:res.result.result,
          complete:true
        })
      }).catch(function(error){
        console.log(error);
      });
    }else{
      that.setData({
        complete:true,
      })
    }

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
  onPullDownRefresh: function () {

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

  go_student:function(){
    wx.navigateTo({
      url: '/pages/account/bindStudent/student',
    })
  },

  go_teacher:function(){
    wx.navigateTo({
      url: '/pages/account/bindTeacher/teacher',
    })
  },

  un_bind:function(e){
    console.log(e);
    var that = this;
    const identity = this.data.identity;
    const account = this.data.account;
    wx.showModal({
      title: '解除绑定',
      content: '当解除绑定后,该账号可供其他微信号重新绑定,确认解绑?',
      success:function(res){
        if(res.confirm==true){
          wx.cloud.callFunction({
            name: "unBind",
            data: {
              identity: identity,
              account: account
            }
          }).then(function (res) {
            console.log(res);
            wx.reLaunch({
              url: "/pages/index/index"
            });
          }).catch(function (error) {
            console.log(error);
            wx.showModal({
              "title": "错误",
              "content": "网络错误或请求非法!"
            })
          })

        }
      }
    })
   
  }
})