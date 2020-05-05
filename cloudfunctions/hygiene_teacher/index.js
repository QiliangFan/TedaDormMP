// 云函数入口文件
const url = "http://106.14.142.29:8000";
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const {method, data} = event;
  var _result = false;
  const account = data.account;

  if(method == "add"){    // 添加卫生记录
    const build = data.build_options[data.build][0];
    const door = data.door_options[data.door]?data.door_options[data.door][0]:"";
    const room = data.room;
    const singleRoom = data.singleRoom_options[data.singleRoom];
    const result = data.result_options[data.result];
    const comment = data.comment;
    await axios.post(url + "/teacher/add_HygieneHistory",{
      build,
      door,
      room,
      singleRoom,
      result,
      comment,
      account,
    }).then(function(res){
      console.log(res);
      _result = true;
    }).catch(function(error){
      _result = false;
      console.log(error);
    });
  }else if(method == "send"){  //发送警告信息
    const build = data.build_options[data.build][0];
    const door = data.door_options[data.door] ? data.door_options[data.door][0] : "";
    const room = data.room;
    const singleRoom = data.singleRoom_options[data.singleRoom];
    const warning = data.warning_options[data.warning];
    const comment = data.comment;
    await axios.post(url + "/teacher/send_warning", {
      build,
      door,
      room,
      singleRoom,
      warning,
      comment,
      account,
    }).then(function(res){
      console.log(res);
      _result = true;
    }).catch(function(error){
      console.log(error);
      _result = false;
    });
  }


  return {
    event,
    result:_result,
  }
}