// 云函数入口文件
const url = "http://106.14.142.29:8000";
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const {method, identity, account} = event;
  let result={};

  if(method=="getUserInfo"){    // 获取用户信息
    await axios.post(url + "/" +identity + "/account_information", {account}).then(function(res){
      result = res.data;
    }).catch(function(error){
      result = error.response.data;
    })
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    result: result,
  }
}