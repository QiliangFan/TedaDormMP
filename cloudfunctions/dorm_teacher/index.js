// 云函数入口文件
const url = "http://106.14.142.29:8000";
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { method, data } = event;
  var _result = false;
  var _status = "";
  const account = data.account;
  if(method=="manage"){
    const build = data.build_options[data.build][0];
    const door = data.door_options[data.door] ? data.door_options[data.door][0] : "";
    const room = data.room;
    const singleRoom = data.singleRoom_options[data.singleRoom];
    const id = data.stuId;
    await axios.post(url + "/teacher/ManageBed", {
      build,
      door,
      room,
      singleRoom,
      id,
      account
    }).then(function(res){
      _result = true;
    }).catch(function(error){
        _result = false;
        _status = error.response.data["status"]
    })
  }
  return {
    event,
    result: _result,
    status:_status,
  }
}