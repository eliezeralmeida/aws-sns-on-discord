'use strict';

const axios = require('axios').default;

module.exports.sendMessage = async (channel, message) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post(channel, { ...message })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
