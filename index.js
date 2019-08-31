var telegram = require('telegram-bot-api');
var https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var api = new telegram({
        token: 'token',
        updates: {
        	enabled: true
    }
});

api.on('message', function(message)
{
    console.log(message);

    if(message.text.toLowerCase().includes('ciao'))
    {
        api.sendMessage({chat_id:message.chat.id, text:'ciao a te '+message.from["first_name"]});
    }    

    if(message.text.toLowerCase().includes('attore'))
    {
        https.get("https://localhost:5001/api/Messages/appears/"+message.text.replace('attore ',''), (res) => {      
        res.on('data', (d) => {
            api.sendMessage({chat_id:message.chat.id, text:d});
        });
      
      }).on('error', (e) => {
        console.error(e);
      });
    }
    
      

});