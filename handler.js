'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});


const BUCKET = process.env.BUCKET;
const USER = process.env.USER;


module.exports.athome = async (event, context) => {
  let user = USER.split(",");
  let userdata = [];
  for (let i=0;i<user.length;i++){
    let data = await s3.getObject({
      Bucket: BUCKET,
      Key: user[i]+'.json'
    }).promise();
    userdata.push(JSON.parse(data.Body.toString()));
  }

  return {
    statusCode: 200,
    body: userdata
    //body: JSON.parse(data.Body.toString())
  };
};

