'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});


const BUCKET = process.env.BUCKET;
const USER = process.env.USER;


module.exports.athome2speech = async (event, context) => {
  let user = USER.split(",");
  let userdata = [];
  for (let i=0;i<user.length;i++){
    let data = await s3.getObject({
      Bucket: BUCKET,
      Key: user[i]+'.json'
    }).promise();
    userdata.push(JSON.parse(data.Body.toString()));
  }
  let athome = [];
  for (let users in userdata){
    if(users.active === 1){
      athome.push(users.device);
    }
  }
  let talk = "";
  switch(athome.length){
    case 0 : talk = "Niemand ist zu Hause.";break;
    case 1 : talk = athome[0]+" ist zu Hause.";break;
    case 2 : talk = athome[0]+" und "+athome[1]+" sind zu Hause.";break;
    case 3 : talk = athome[0]+", "+athome[1]+" und "+athome[2]+" sind zu Hause.";break;
    default: talk = "keine Ahnung :)";
  }

  return {
    talk
  };
};

