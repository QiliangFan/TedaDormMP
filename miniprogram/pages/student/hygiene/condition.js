// miniprogram/pages/student/hygiene/condition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    result:"",
    comment:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    const that = this;
    wx.cloud.callFunction({
      name: "hygiene_student",
      data:{
        get_last: true,
        account: app.globalData.account,
        method : "get"
      }
    }).then(function(res){
      console.log(res);
      if(res.result.result){
      that.setData({
        date: res.result.ret.date,
        result: res.result.ret.result,
        comment: res.result.ret.comment,
        complete: true
      });
      }else{
        that.setData({
          complete:true
        });
        wx.showModal({
          title:"错误",
          content:res.result.ret.status,
          complete:function(res){
            wx.reLaunch({
              url:"/pages/index/index"
            })
          }
        })
      }
    }).catch(function(error){
      console.log(error);
      that.setData({
        complete:true
      });

      wx.showModal({
        title:"错误",
        content: "网络错误, 请稍后重试!",
        complete:function(res){
          wx.reLaunch({
            url: "/pages/index/index"
          })
        }
      })
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