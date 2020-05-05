// miniprogram/pages/student/hygiene/condition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sponsor: "",
    level: "",
    comment: "",
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    const that = this;
    wx.cloud.callFunction({
      name: "hygiene_student",
      data: {
        get_last: true,
        account: app.globalData.account,
        method: "warning"
      }
    }).then(function (res) {
      console.log(res);
      if (res.result.result) {
        that.setData({
          sponsor: res.result.ret.sponsor,
          level: res.result.ret.level,
          comment: res.result.ret.comment,
          id:res.result.ret.id,
          complete: true
        });
      } else {
        that.setData({
          complete: true
        });
        wx.showModal({
          title: "错误",
          content: res.result.ret.status,
          complete: function (res) {
            wx.reLaunch({
              url: "/pages/index/index"
            })
          }
        })
      }
    }).catch(function (error) {
      console.log(error);
      that.setData({
        complete: true
      });

      wx.showModal({
        title: "错误",
        content: "网络错误, 请稍后重试!",
        complete: function (res) {
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

  },

  del_warning:function(e){
    console.log(e);
    const app = getApp();
    const that = this;
    wx.showModal({
      title: '确认已读',
      content: '确认已读后将删除这一条信息',
      success:function(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name: "hygiene_student",
            data: {
              account: app.globalData.account,
              id:that.data.id,
              method: "del_warning"
            }
          }).then(function(res){
            console.log(res);
            if(res.result.result){
              wx.showModal({
                title: '成功',
                content: '确认成功, 该条通知已被删除!',
                complete: function (res) {
                  wx.redirectTo({
                    url: "./warning"
                  })
                }
              })
            }else{
              wx.showModal({
                title: '失败',
                content: res.result.ret.status ? res.result.ret.status :"网络错误, 请稍后重试!",

              })
            }
          }).catch(function(error){
            console.log(error)
            wx.showModal({
              title: '错误',
              content: '网络错误, 请稍后重试!',
            })
          })
        }
      }
    })
  
  }
})