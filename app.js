/*jshint esversion: 6*/


var http = require('http');
var url = require('url');
var qs = require('querystring');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://디비주소";
var mongoose = require('mongoose');

var app = express();

// 리다이렉션
app.get('/', function (req, res) {
  res.redirect('/board/list');
});
app.get('/board', function (req, res) {
  res.redirect('/board/list');
});

// 프론트엔드 전송
app.get('/board/list', function (req, res) {
  res.sendFile('./public/list.html');
});
app.get('/board/view', function (req, res) {
  res.sendFile('./public/view.html');
});
app.get('/board/edit', function (req, res) {
  res.sendFile('./public/edit.html');
});
app.get('/board/delete', function (req, res) {
  res.sendFile('./public/delete.html');
});

// 데이터 클라이언트 전송
app.get('/boardWork/list', function (req, res) {
  var board = req.query('board');
  var getter;
  if (board !== 'freeboard' && board !== 'notice' && board !== 'storage') res.send('존재하지 않는 게시판입니다.');
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("tb_board").find({"board": board}, function(err, result) {
      if (err) throw err;
      getter = result;
      db.close();
    });
  });
  var list = "";
  for (var i = 0; i < getter.length; i++) {
    // 제목, 이름, 게시일자, 조회수 순
    var wID = getter[i].writerID;
    if (getter[i].visible === false) {
      wID = "익명";
    }
    list += "<li>" + "<a href='/board/view?" + getter[i].postid + "'>" + "<div class='title'>" + getter[i].title + "</div>" + "<div class='name'>" + wID + "</div>" + "<div class='uploadDate'>" + getter[i].postTime + "</div>" + "<div class='hits'>" + getter[i].hits + "</div>" + "</a>" + "</li>";
  }
  res.send(list);
});

app.get('/boardWork/view', function (req, res) {
  var board = req.query('board');
  var postId = req.query('postid');
  var sendData;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("tb_board").findOne({"board": postid}, function(err, result) {
      if (err) throw err;

      sendData = result;
      if (sendData.visible === false) {
        sendData.writerID = "익명";
      }
    });
    dbo.collection("tb_board").updateOne({"board": postid}, { $set : {hits : sendData.hits + 1 } }, function(err, result) {
      if (err) throw err;
      db.close();
    });
  });

  // DB 데이터 받고
  //var sendData =
  //{
  //    'board': boardName,
  //    'boardNum': boardNum,
  //    'name': '글 제목',
  //    'postTime': '게시 시간',
  //    'visible': true,
  //    'writerID': '게시자 ID',
  //    'hits': 0,
  //    'content': ``
  //};
  res.send(sendData);
});
app.get('/boardWork/getPostName', function (req, res) {
  var name;
  var postId = req.query('postid');
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("tb_board").find({"boardNum": postid}, { projection:  {"name": 1 }}, function(err, result) {
      if (err) throw err;
      name = result;
      db.close();
    });
  });
  res.send(name);
});

//데이터베이스 전송
app.get('/boardWork/edit/function', function (req, res) {
  var postId = req.query('postid');
  var mode = req.query('mode');
  // POST로 2개 받아야됨
  var nameU;
  var contentU;
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { boardNum: postid };
  var newvalues = { $set: {name: nameU, address: contentU } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    db.close();
  });
});

  //DB 데이터 받고
  var sendData =
  {
      'name': '글 제목',
      'postTime': '게시 시간',
      'visible': true,
      'writerID': '게시 ID',
      'hits': 0,
      'content': ``
  };
  res.send(sendData);
});
app.get('/boardWork/delete/function', function (req, res) {
  var postId = req.query('postid');
  //DB 데이터 받고
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { boardNum: postId };
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      db.close();
    });
  });

  res.send(1);
});


// 에러 처리
app.get('/404', function (req, res) {

  res.send(404);
});
