// miniprogram/pages/teacher/dorm/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    build: "",
    door: "",
    room: "",
    singleRoom: "",
    hasSingleRoom: false,
    stuId: "",
    complete: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const app = getApp();
    this.setData({
      build_options: app.globalData.build_options,
      door_options: app.globalData.door_options,
      singleRoom_options: app.globalData.singleRoom_options,
      build: 0,
      account: app.globalData.account
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  chooseBuild: function(e) {
    console.log(e);
    var that = this;
    this.setData({
      build: e.detail.value
    }, res => {
      if (that.data.build_options[that.data.build][0] >= "4") {
        that.setData({
          hasSingleRoom: true,
          door: 0,
          singleRoom: 0
        })
      } else {
        that.setData({
          hasSingleRoom: false,
          door: "",
          singleRoom: ""
        })
      }
    });

  },

  inputRoom: function(e) {
    console.log(e);
    this.setData({
      room: e.detail.value
    });
  },

  chooseDoor: function(e) {
    this.setData({
      door: e.detail.value
    });
  },

  chooseSingleRoom: function(e) {
    this.setData({
      singleRoom: e.detail.value
    });
  },

  inputStuId: function(e) {
    this.setData({
      stuId: e.detail.value
    })
  },

  submit: function(e) {
    const that = this;
    that.setData({
      complete: false
    });
    wx.cloud.callFunction({
      name: "dorm_teacher",
      data: {
        method: "manage",
        data: this.data
      }
    }).then(function(res) {
      console.log(res);
      if (res.result.result) {
        wx.showModal({
          title: '成功',
          content: '宿舍安排成功!',
          success: function(res) {
            that.setData({
              comment: "",
              complete: true,
            });
          }
        })
      } else {
        wx.showModal({
          title: '字段错误',
          content: res.result.status?res.result.status:"请求错误,请稍后重试!",
          success: function(res) {
            that.setData({
              complete: true,
            });
          }
        })
      }
    }).catch(function(error) {
      console.log(error);
      wx.showModal({
        title: '错误',
        content: '网络错误,请重试或重新进入小程序!',
        success: function(res) {
          that.setData({
            complete: true,
          });
        }
      })
    })
  }
})