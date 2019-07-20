//  OpenShift sample Node application
var express = require('express'),
  app = express(),
  morgan = require('morgan');

Object.assign = require('object-assign')
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
  mongoURLLabel = "";

if (mongoURL == null) {
  var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
  // If using plane old env vars via service discovery
  if (process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
    mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
    mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
    mongoUser = process.env[mongoServiceName + '_USER'];

    // If using env vars from secret from service binding  
  } else if (process.env.database_name) {
    mongoDatabase = process.env.database_name;
    mongoPassword = process.env.password;
    mongoUser = process.env.username;
    var mongoUriParts = process.env.uri && process.env.uri.split("//");
    if (mongoUriParts.length == 2) {
      mongoUriParts = mongoUriParts[1].split(":");
      if (mongoUriParts && mongoUriParts.length == 2) {
        mongoHost = mongoUriParts[0];
        mongoPort = mongoUriParts[1];
      }
    }
  }

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
  }
}
var db = null,
  dbDetails = new Object();

var initDb = function (callback) {
  if (mongoURL == null) return;

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function (err, conn) {
    if (err) {
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

console.log("this is working----------------------------------")
app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function (err) { });
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ ip: req.ip, date: Date.now() });
    col.count(function (err, count) {
      if (err) {
        console.log('Error running count. Message:\n' + err);
      }
      res.render('index.html', { pageCountMessage: count, dbInfo: dbDetails });
    });
  } else {
    res.render('index.html', { pageCountMessage: null });
  }
});















const path = require('path');


app.use('/public', express.static(path.join(__dirname, 'public')));






















const request = require('request');



app.get('/getpersonalloan', function (req, res) {
  try {
    request(
      {
        url: 'https://apigateway.mandiriwhatthehack.com/gateway/ProductAPI/1.0/product/personalLoan',
        headers: {
          'Authorization': 'Bearer eyJraWQiOiJqd3RrZXkiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MDNmZDYzNy0zMmFhLTRkNjUtYWQ3NS0zNjRmNGNhMTEyZjQiLCJhdWQiOlsiODk2YTlhYWUtZjE2ZS00NGU2LWFkNTUtYWU1MmJlOWM0YzEwIiwibWFuZGlyaV9oYWNrYXRob25fdGVhbSJdLCJuYmYiOjE1NjM2MjA3MDksImlzcyI6Imh0dHBzOlwvXC93d3cuYmFua21hbmRpcmkuY28uaWRcLyIsImV4cCI6MTU2MzgzNjcwOSwiaWF0IjoxNTYzNjIwNzA5LCJhcHBfaWQiOiI4OTZhOWFhZS1mMTZlLTQ0ZTYtYWQ1NS1hZTUyYmU5YzRjMTAifQ.Mh7ZO490dJOZtb2EfKCbRRQthJpmuTYEACphDm2DMkEGx0eXVulBi3ihw5wkHpBBBSeB2_zGTmtI-KfwP4h6mjnYEPtBzBKCoGQbHTlM3fF9WhRCmiO5Zv_1XK7NbanSY5bVksqqUkab950YKZOp4AhPAuQjivRTSnHZDZf1W1g'
        }
      }
      ,
      (err, ress, body) => {
        console.log(err);
        console.log(ress);
        console.log(body);
        if (err) {
          res.send([]);
        }else{
          res.send(body);
        }
      });
  } catch (error) {
    res.send([])
  }
});


app.get('/getdeposito', function (req, res) {
  try {
    request(
      {
        url: 'https://apigateway.mandiriwhatthehack.com/gateway/ProductAPI/1.0/product/timeDeposit',
        headers: {
          'Authorization': 'Bearer eyJraWQiOiJqd3RrZXkiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MDNmZDYzNy0zMmFhLTRkNjUtYWQ3NS0zNjRmNGNhMTEyZjQiLCJhdWQiOlsiODk2YTlhYWUtZjE2ZS00NGU2LWFkNTUtYWU1MmJlOWM0YzEwIiwibWFuZGlyaV9oYWNrYXRob25fdGVhbSJdLCJuYmYiOjE1NjM2MjA3MDksImlzcyI6Imh0dHBzOlwvXC93d3cuYmFua21hbmRpcmkuY28uaWRcLyIsImV4cCI6MTU2MzgzNjcwOSwiaWF0IjoxNTYzNjIwNzA5LCJhcHBfaWQiOiI4OTZhOWFhZS1mMTZlLTQ0ZTYtYWQ1NS1hZTUyYmU5YzRjMTAifQ.Mh7ZO490dJOZtb2EfKCbRRQthJpmuTYEACphDm2DMkEGx0eXVulBi3ihw5wkHpBBBSeB2_zGTmtI-KfwP4h6mjnYEPtBzBKCoGQbHTlM3fF9WhRCmiO5Zv_1XK7NbanSY5bVksqqUkab950YKZOp4AhPAuQjivRTSnHZDZf1W1g'
        }
      }
      ,
      (err, ress, body) => {
        console.log(err);
        console.log(ress);
        console.log(body);
        if (err) {
          res.send([]);
        }else{
          res.send(body);
        }
      });
  } catch (error) {
    res.send([])
  }
});











app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function (err) { });
  }
  if (db) {
    db.collection('counts').count(function (err, count) {
      res.send('{ pageCount: ' + count + '}');
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function (err) {
  console.log('Error connecting to Mongo. Message:\n' + err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
