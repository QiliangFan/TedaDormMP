// 云函数入口文件
const url = "http://106.14.142.29:8000";
const cloud = require('wx-server-sdk');
const axios = require("axios");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var _result = false;
  var ret = "";
  const method = event.method;

  if(method == "mate"){
    await axios.post(url + "/student/same_room", {
      account: event.account
    }).then(function(res){
      _result = true;
      ret = res.data;
    }).catch(function(error){
      _result = false;
      ret = error.response.data;
    })
  }

  return {
    event,
    result:_result,
    ret
  }
}