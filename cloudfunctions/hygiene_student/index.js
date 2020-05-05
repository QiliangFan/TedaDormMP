// 云函数入口文件
const url = "http://106.14.142.29:8000";
const cloud = require('wx-server-sdk');
const axios = require("axios");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const method = event.method;
  var _result = false;
  var ret = "";

  if (method == "get") {
    await axios.post(url + "/student/result_of_check", {
      get_last:true,
      account:event.account
    }).then(function(res){
      _result = true;
      ret = res.data;
    }).catch(function(error){
      _result = false;
      ret = error.response.data;
    })
  }else if(method == "warning"){
    await axios.post(url + "/student/warning_message", {
      get_last: true,
      account: event.account
    }).then(function (res) {
      _result = true;
      ret = res.data;
    }).catch(function (error) {
      _result = false;
      ret = error.response.data;
    })
  }else if(method == "del_warning"){
    await axios.post(url +"/student/del_warning_message", {
      id:event.id,
      account:event.account
    }).then(function(res){
      _result = true;
      ret = res.data;
    }).catch(function(error){
      _result = false;
      ret = error.response.data;
    });
  }

  return {
    event,
    result: _result,
    ret
  }
}