// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Add body parser middleware
app.use(bodyParser.json());

// Add cors middleware
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route for getting comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route for posting comments by post id
app.post('/posts/:id/comments', (req, res) => {
  // Get post id
  const postId = req.params.id;

  // Get comment id
  const commentId = randomBytes(4).toString('hex');

  // Get comment
  const {content} = req.body;

  // Get comments for post id
  const comments = commentsByPostId[postId] || [];

  // Add comment to comments
  comments.push({id: commentId, content});

  // Update comments for post id
  commentsByPostId[postId] = comments;

  // Send response
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});