/*jshint esversion: 6*/

var http = require('http');
var url = require('url');
var qs = require('querystring');
var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.redirect('/board');
});

app.get('/board', function (req, res) {
  var board = req.query('board');
  var postId = req.query('postid');
  if (board == 'freeboard') {

  } else if (board == 'notice') {

  } else if (board == 'suggest') {

  } else if (board == 'storage') {

  } else {
    res.redirect('/404');
  }
  res.send();
});
