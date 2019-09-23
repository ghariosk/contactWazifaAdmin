let AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = function async (event, context, callback) {
    console.log(event)

    var {who,email,name,phoneNumber,city} = event.body
    var data 
    if (who == "user") {
        data = `${name} wants to know more about Wazifa. You can reach them at ${email} or ${phoneNumber}. He lives in ${city}`
    } else {
        data = `${name} wants to join Wazifa. You can reach them at ${email} or ${phoneNumber}. They operate from ${city}`
    }

    ses.sendEmail({
        Destination: {
            ToAddresses: ['karlgharios@hotmail.com', 'knhatem@gmail.com'],
            CcAddresses: [],
            BccAddresses: []
        },
        Message: {
            Body: {
                Text: {
                    Data: data
                }
            },
            Subject: {
                Data: 'Contact Request from' + name
            }
        },
        Source: 'Wazifa No Reply <no-reply@wazifa.solutions>',
    }, function (err, data) {
        console.log(err,data)
        if (err) callback(null, { "message": "Successfully executed", data }); // an error occurred
        else callback(null, {data});           // successful response
    });
}