/*jshint esversion: 6*/

var http = require('http');
var url = require('url');
var qs = require('querystring');
var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.redirect('/board/list');
});
app.get('/board', function (req, res) {
  res.redirect('/board/list');
});
app.get('/board/view', function (req, res) {
  var board = req.query('board');
  var postId = req.query('postid');
  switch (board) {
    case 'freeboard':

      res.sendFile();
      break;
    case 'notice':

      break;
    case 'storage':

      break;
    default:
      res.redirect('/404');
  }

  res.send();
});

app.get('/board/list', function (req, res) {
  res.sendFile('./public/list.html');
});
app.get('/boardWork/list', function (req, res) {
  var list = "";
  for (var i = 0; i < array.length; i++) {
    //제목, 이름, 게시일자, 조회수 순
    // list += "<li>" + "<a href='/'>" + "<div class='title'>" + "</div>" + "<div class='name'>" + "</div>" + "<div class='uploadDate'>" + "</div>" + "<div class='hits'>" + "</div>" + "</a>" + "</li>";
  }
  res.send(list);
});

app.get('/boardWork/view', function (req, res) {
  var board = req.query('board');
  var postId = req.query('postid');
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
  res.send('./board/');
});
