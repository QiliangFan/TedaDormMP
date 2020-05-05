// miniprogram/pages/teacher/account/reset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId:"",
    complete: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    this.setData({
      account: app.globalData.account
    });
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

  inputStuId: function(e){
    this.setData({
      stuId: e.detail.value
    })
  },

  submit:function(e){
    const that = this;
    that.setData({
      complete: false
    });
    wx.cloud.callFunction({
      name: "account_teacher",
      data: {
        method: "reset",
        data: this.data
      }
    }).then(function (res) {
      console.log(res);
      if (res.result.result) {
        wx.showModal({
          title: '成功',
          content: '密码重置成功!!',
          success: function (res) {
            that.setData({
              stuId: "",
              complete: true,
            });
          }
        })
      } else {
        wx.showModal({
          title: '错误',
          content: res.result.status ? res.result.status : "请求错误,请稍后重试!",
          success: function (res) {
            that.setData({
              complete: true,
            });
          }
        })
      }
    }).catch(function (error) {
      console.log(error);
      wx.showModal({
        title: '错误',
        content: '网络错误,请重试或重新进入小程序!',
        success: function (res) {
          that.setData({
            complete: true,
          });
        }
      })
    })
  }
})