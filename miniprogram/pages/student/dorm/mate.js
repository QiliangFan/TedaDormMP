// miniprogram/pages/student/dorm/mate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mates:[],
    complete: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const app = getApp();
    wx.cloud.callFunction({
      name: "dorm_student",
      data:{
        account: app.globalData.account,
        method:"mate"
      }
    }).then(function(res){
      console.log(res);
      if(res.result.result){
      that.setData({
        mates: res.result.ret,
        complete: true
      })
      }else{
        that.setData({
          complete: true
        })
        wx.showModal({
          title: '错误',
          content: res.result.ret.status ? res.result.ret.status :"网络错误, 请稍后重试!",
          complete: function (res) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        })
      }
    }).catch(function(res){
      that.setData({
        complete: true
      })
      console.log(res);
      wx.showModal({
        title: '后台错误',
        content: '请检查网络或稍后重试',
        complete:function(res){
          wx.reLaunchre({
            url: '/pages/index/index',
          })
        }
      });
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

  }
})