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

  if (board !== 'freeboard' && board !== 'notice' && board !== 'storage') res.send('존재하지 않는 게시판입니다.');
  var list = "";
  for (var i = 0; i < array.length; i++) {
    // 제목, 이름, 게시일자, 조회수 순
    // list += "<li>" + "<a href='/board/view?" + postid + "'>" + "<div class='title'>" + "</div>" + "<div class='name'>" + "</div>" + "<div class='uploadDate'>" + "</div>" + "<div class='hits'>" + "</div>" + "</a>" + "</li>";
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
    dbo.collection("tb_board").find({"board": board}, function(err, result) {
      if (err) throw err;
      sendData = result;
      db.close();
    });
  });
  // DB 데이터 받고
  //var sendData =
  //{
  //    'board': boardName,
  //    'name': '글 제목',
  //    'postTime': '게시 시간',
  //    'visible': true,
  //    'writerID': '게시 ID',
  //    'hits': 0,
  //    'content': ``
  //};
  res.send(sendData);
});
app.get('/boardWork/getPostName', function (req, res) {
  var name = 'DB 불러오기';
  res.send(name);
});

//데이터베이스 전송
app.get('/boardWork/edit/function', function (req, res) {
  var postId = req.query('postid');
  var mode = req.query('mode');
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
  // mongoose;
  res.send(sendData);
});


// 에러 처리
app.get('/404', function (req, res) {

  res.send(404);
});
