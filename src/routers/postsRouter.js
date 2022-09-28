const express = require('express');
const router = new express.Router();
const {addPostValidation} = require('../middleWares/validationMiddleware');
const {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
} = require('../controllers/postControllers');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', addPostValidation, addPost);
router.put('/:id', addPostValidation, changePostById);
router.delete('/:id', deletePostById);

module.exports = {
  postsRouter: router,
};
