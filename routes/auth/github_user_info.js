const axios = require("axios");
async function getUserInfo(requestToken) {
  try {
    let response = await axios({
      method: "post",
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
      headers: {
        accept: "application/json",
      },
    });
    let access_token = response.data.access_token;

    response = await axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        Authorization: "token " + access_token,
      },
    });

    return response.data;
  } catch (error) {
    return;
  }
}

module.exports = getUserInfo;
