// miniprogram/pages/account/bindStudent/student.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: "",
    pwd: "",
    complete:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  account: function (e) {
    this.setData({
      account: e.detail.value
    })
  },

  pwd: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  bind: function (e) {
    var that = this;
    this.setData({
      complete:false
    })
    const openid = wx.getStorageSync("openid");
    if (typeof (openid) == undefined) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
    wx.cloud.callFunction({
      name: "bind",
      data: {
        identity: "student",
        account: this.data.account,
        pwd: this.data.pwd,
        openid: openid
      },
      success: function (res) {
        console.log(res);
        that.setData({
          conplete:true
        });

        if (res.result.verify_pass == true && res.result.bind_success == false) {
          wx.showModal({
            title: '该账号已被绑定',
            content: '你输入的账号已经被其他用户绑定, 如果有疑问请联系管理员',
            complete:function(){
              that.setData({
                conplete: true
              });
            }
          })
        } else if (res.result.verify_pass == false) {
          wx.showModal({
            title: '逻辑错误',
            content: '验证您的账号密码时出现问题, 请确认账号密码或检查网络状况!',
          })
        } else {    // 绑定成功
          const app = getApp();
          app.globalData.account = that.data.account;
          wx.showModal({
            title: '成功',
            content: '恭喜你绑定账号成功',
            success: function (res) {
              wx.reLaunch({
                url: "/pages/index/index"
              })
            }
          })
        }


      },
      fail: function (res) {
        console.log(res);
        that.setData({
          conplete: true
        });
        console.log(res);

      }
    })
  }
})