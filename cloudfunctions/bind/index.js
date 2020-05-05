// 云函数入口文件
const url = "http://106.14.142.29:8000";
const cloud = require('wx-server-sdk');
const axios = require('axios');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  let {
    openid,
    account,
    pwd,
    identity
  } = event;
  let bind_success = false;
  let verify_pass = false;
  let result = "";

  await axios.post(url + '/login', {
    account: account,
    pwd: pwd,
    type: identity
  }).then(function(res) {
    verify_pass = true;
    result = res.data;
  }).catch(function(error) {
    console.log(error)
    result = error.response;
  })
  if (verify_pass) {
    await db.collection("User").add({
      data: {
        _id: openid,
        account: account,
        identity: identity,
      }
    }).then(function(res) {
      bind_success = true;

    }).catch(function(error) {

    })
  }
  return {
    event,
    bind_success,
    verify_pass,
    result,
  }
}