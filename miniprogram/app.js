//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env:"tedadorms7b94",
        traceUser: true,
      })
    }

    this.globalData = {
      campus_options: [
        "软件学院",
        "物理学院",
        "环境工程与工程学院",
        "药学院",
        "生物学院",
        "全部"
      ],
      detail_options: ["全部"],
      software_options: ["本科生", "研究生", "全部"],
      biology_options: ["泰达籍", "生科籍", "全部"],
      physics_options: ["泰达籍", "物理籍", "临时", "全部"],
      environment_options: ["全部"],
      medicine_options: ["全部"],
      build_options: [
        "1号公寓",
        "2号公寓",
        "3号公寓",
        "4号公寓",
        "5号公寓",
        "6号公寓",
        "7号公寓"
      ],
      door_options: ["1门", "2门", "3门", "4门", "5门"],
      singleRoom_options: ["1", "2", "3", "4"],
    }
  },

  check_bind: function(){

  },


})
