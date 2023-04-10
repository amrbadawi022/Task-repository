const express = require('express');
const logger = require('morgan');
const cors = require('cors');



const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let reminders = [];

app.get('/home', function(req, res) {
  console.log('Inside Home Login');
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  console.log('Reminders : ', JSON.stringify(reminders));
  res.end(JSON.stringify(reminders));
});

app.post('/create', function(req, res) {
  const newReminder = {
    reminderMed: req.body.medication,
    reminderTime: req.body.time,
  };

  reminders.push(newReminder);
  console.log(reminders);
});

//start your server on port 3001
app.listen(3001, () => {
  console.log('Server Listening on port 3001');
});
