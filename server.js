var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
var serverAd = 'http://18.221.90.80:3000';
//
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
///
// parse application/json
app.use(bodyParser.json())

<<<<<<< Updated upstream
var mydb;

/* Endpoint to greet and add a new visitor to database.
* Send a POST request to 18.221.90.80:3000/api/visitors with body
* {
* 	"name": "Bob"
* }
*/

//Smaple Database Code
app.post("/api/visitors", function (request, response) {
  var userName = request.body.name;
  if(!mydb) {
    console.log("No database.");
    response.send("Hello " + userName + "!");
    return;
  }
  // insert the username as a document
  mydb.insert({ "name" : userName }, function(err, body, header) {
    if (err) {
      return console.log('[mydb.insert] ', err.message);
    }
    response.send("Hello " + userName + "! I added you to the database.");
  });
});

/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://184.172.242.210:31090/api/visitors
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
app.get("/api/visitors", function (request, response) {
  var names = [];
  if(!mydb) {
    response.json(names);
    return;
  }

  mydb.list({ include_docs: true }, function(err, body) {
    if (!err) {
      body.rows.forEach(function(row) {
        if(row.doc.name)
          names.push(row.doc.name);
      });
      response.json(names);
    }
  });
});


function createGuid()  
{  
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
      return v.toString(16);  
   });  
} 


/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://184.172.242.210:31090/api/visitors
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
app.get("/api/lmatid", function (request, response) {
  var theGuid = createGuid();
  var names = {lmatid:theGuid};
  if(true) {
    response.json(names);
    return;
  }

});





/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://184.172.242.210:31090/api/visitors
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
app.get("/api/registerIdentity", function (request, response) {
  var theGuid = createGuid();
  var r = response
  var theType = request.query['type'];

  var theValue = request.query['value'];
    console.log ("value = " + theValue);
  if (theValue == ""){
      theValue = createGuid();
  }//request.query['value'];
  var theMetaData = request.query['metaData'];//request.query['metaData'];
 var theBody = '{"$class": "com.integraledger.identityregistry.RegisterIdentity","identityId":"' + theGuid + '","identityType":"' + theType+ '","metaData":"'+theMetaData+'","value":"' + theValue+ '"}';
 console.log (theBody);
  var cb = function callback(error, response, body) {
    //if (!error && response.statusCode == 200) {
      //var info = JSON.parse(body);
     // console.log(info.stargazers_count + " Stars");
     // console.log(info.forks_count + " Forks");
     var names = {'identityId':theGuid}; //, 'identityType':theType,'value':theValue, 'metaData': theMetaData 
     r.json(names);
     // r.send({'LMATID', theGuid});
      return;
   // }
  }

  if(true) {
   // console.log ('x ' + theMetaData);
    var request = require('request');
    var options = {
      url: serverAd + '/api/RegisterIdentity',
      headers: {
        'Content-Type': 'application/json',  'Accept': 'application/json'
      },
    body:theBody//,"metaData":"md1", "value":"v1"
    };


    request
      .post(options,cb)
      .on('response', function(response) {

  })
  }

});





app.get("/api/registerKey", function (request, response) {
    //   o String keyValue
    // --> User   owner
    var r = response;
    var theOwner = request.query['owner'];
    var theValue = request.query['value'];
    var theBody = '{"$class": "com.integraledger.identityregistry.RegisterKey","owner":"'+theOwner+'","keyValue":"' + theValue+ '"}';

    var cb = function callback(error, response, body) {

        var theResponse = {'theKey':theValue}; //, 'identityType':theType,'value':theValue, 'metaData': theMetaData
        r.json(theResponse);

        return;

    }

    if(true) {
        // console.log ('x ' + theMetaData);
        var request = require('request');
        var options = {
            url: serverAd + '/api/RegisterKey',
            headers: {
                'Content-Type': 'application/json',  'Accept': 'application/json'
            },
            body:theBody//,"metaData":"md1", "value":"v1"
        };


        request
            .post(options,cb)
            .on('response', function(response) {

            })
    }

});
app.get("/api/postToClio", function (request, response) {

  var r = response
  var theLMAT = request.query['LMAT'];

  var cb = function callback(error, response, body) {

   var theJSON = JSON.parse(body)
   var theData= theJSON['data']['id'];
   console.log (`${body} |||||| ${theData}`);

     var names = {'ClioID':theData};
     r.json(names);

      return;
  }

  if(true) {

    var request = require('request');
    var options = {
      url: `https://app.goclio.com/api/v4/matters?data[client][id]=941888686&data[description]=${encodeURIComponent('Created from Integra API Call')}&data[client_reference]=${theLMAT}`,
      headers: {
        'Content-Type': 'application/json',  'Authorization': 'Bearer UskTXxAGVeQwulmfirrCYVMcdztfy1zEaXY7TA26'
      }
    };


    request
      .post(options,cb)
      .on('response', function(response) {

  })
  }

});


app.get("/api/identityExists", function (request, response) {

    var r = response
    var theId = request.query['id'];


    var cb = function callback(error, response, body) {
        //if (!error && response.statusCode == 200) {
        //var info = JSON.parse(body);
        // console.log(info.stargazers_count + " Stars");
        // console.log(info.forks_count + " Forks");
        // console.log(response);
        // console.log(body);
        // var names = {'exists':'x' + body};
        var res= JSON.parse(body);
        var exists = res.length==0?false:true
        var names = {'exists':exists};
        r.json(names);
        // r.send({'LMATID', theGuid});
        return;
        // }
    }
//url: 'http://18.221.90.80:3000/api/queries/idExists?identityId=' + theId

    var component = encodeURIComponent(`{"where":{"identityId": "${theId}"}}`);
console.log ('xxxxxhttp://18.221.90.80:3000/api/IntegraIdentity?filter=' + component)

    if(true) {
        var request = require('request');
        var options = {
            url: serverAd + '/api/IntegraIdentity?filter=' + component,
            headers: {
                'Content-Type': 'application/json',  'Accept': 'application/json'
            }
        };


        request
            .get(options,cb)
            .on('response', function(response) {

            })
    }

});

app.get("/api/valueExists", function (request, response) {

  var r = response
var theId = request.query['value'];


  var cb = function callback(error, response, body) {
    //if (!error && response.statusCode == 200) {
      //var info = JSON.parse(body);
     // console.log(info.stargazers_count + " Stars");
     // console.log(info.forks_count + " Forks");
    // console.log(response);
    // console.log(body);
    // var names = {'exists':'x' + body};
   // console.log (body);
    var res= JSON.parse(body);
    var exists = res.length==0?false:true
    var names = {'exists':exists};
     r.json(names);
     // r.send({'LMATID', theGuid});
      return;
   // }
  }
    var component = encodeURIComponent(`{"where":{"value": "${theId}"}}`);
  //http://18.221.90.80:3000/api/queries/valueExists?value=

  if(true) {
    var request = require('request');
    var options = {
      url:serverAd + '/api/HashVal?filter=' + component,
      headers: {
        'Content-Type': 'application/json',  'Accept': 'application/json'
      }
    };


    request
      .get(options,cb)
      .on('response', function(response) {

  })
  }

});


app.get("/api/keyForOwner", function (request, response) {

    var r = response
    var theOwner = request.query['owner'];


    var cb = function callback(error, response, body) {

        var res= JSON.parse(body);
        console.log(res);
        //var exists = res.length==0?false:true;
       if (res.length > 0){
          var rec = res[0];
           console.log(rec);
          var theKey = rec['keyValue'];
           var names = {'key':theKey};
           r.json(names);
       }
       else{
          r.json({'key':'No Key'}) ;
       }

        // r.send({'LMATID', theGuid});
        return;
        // }
    }
//http://18.221.90.80:3000/api/queries/keyForOwner?owner=' + 'resource%3Acom.integraledger.identityregistry.User%23' + theOwner

    var component = `{"where":{"owner": "${theOwner}"}}`;

    if(true) {
        var request = require('request');
        var options = {
            url: serverAd + '/api/Key?filter=' + component,
            headers: {
                'Content-Type': 'application/json',  'Accept': 'application/json'
            }
        };


        request
            .get(options,cb)
            .on('response', function(response) {

            })
    }

});
=======
>>>>>>> Stashed changes

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);



//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));



<<<<<<< Updated upstream
var port = process.env.PORT || 3001;
=======
var port = process.env.PORT || 3004;
>>>>>>> Stashed changes
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: Use Port" + port);
});
