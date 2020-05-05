// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    account,
    identity
  } = event;
  const openid = wxContext.OPENID;
  const db = cloud.database();
  let unBindSuccess = false;
  await db.collection("User").doc(openid).remove().then(function(res) {
    unBindSuccess = true;
  }).catch(function(error) {
    unBindSuccess = false;
  });

  return {
    event,
    unBindSuccess,
  }
}