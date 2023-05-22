const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const path = require("path");
const envSetting = require('dotenv');

if (process.env.NODE_ENV == 'production') {
  envSetting.config({ path: '.env.production' });
}
else if (process.env.NODE_ENV == 'development') {
  envSetting.config({ path: '.env.development' });
}

const connection = mysql.createConnection(
  {
    host: process.env.REACT_APP_DB_HOST,
    user: 'root',
    password: '1234',
    database: 'hirobaDb'
  }
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// configuration =========================
app.set('port', process.env.PORT || 8000);

// cors
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// ==========================================

app.use(express.static(path.join(__dirname, "build")));

// ==========================================

app.get('/board', (req, res) => {
  connection.query('SELECT * from topic', (error, rows) => {
    if (error) {
      throw error;
    }

    console.log('User info is: ', rows);
    res.send(rows);
  });

});


app.post('/board', (req, res) => {

  connection.query(`INSERT INTO topic (title)  values (?);`, [req.body.title], (error, rows) => {
    if (error) throw error;
    res.status(200).send('성공');
  });
});

app.put('/board', (req, res) => {

  connection.query(`UPDATE topic SET title="?" WHERE id=?;`, [req.body.title, req.body.id], (error, rows) => {
    if (error) throw error;
    res.status(200).send('성공');
  });
});

app.delete('/board/:id', (req, res) => {

  let sql = `DELETE FROM topic WHERE id=${Number.parseInt(req.params.id)}`;

  connection.query(sql, [], (error, rows) => {
    if (error) throw error;
    res.status(200).send('성공');
  });
});


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});