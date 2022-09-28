let posts = [
  {id: '1', topic: 'test1', text: 'test text1'},
  {id: '2', topic: 'test2', text: 'test text2'},
  {id: '3', topic: 'test3', text: 'test text3'},
];


const getPosts = (req, res) => {
  res.json({posts, status: 'success'});
};

const getPostById = (req, res) => {
  const id = req.params.id;

  const [post] = posts.filter((item) => item.id === id);
  if (post) {
    return res.json({post, status: 'success'});
  }
  return res.status(404).json({status: 'undefinded'});
};

const addPost = (req, res) => {
  const {
    topic,
    text,
  } = req.body;

  posts.push({
    id: new Date,
    topic,
    text,
  });
  res.json({posts, status: 'success'});
};

const changePostById = (req, res) => {
  const id = req.params.id;
  const {
    topic,
    text,
  } = req.body;

  const [post] = posts.filter((item) => item.id === id);
  if (post) {
    posts.forEach((item) => {
      if (item.id === id) {
        item.topic = topic;
        item.text = text;
      }
    });
    return res.json({posts, status: 'success'});
  }

  return res.status(404).json({status: 'undefinded'});
};

const deletePostById =(req, res) => {
  const id = req.params.id;
  const [post] = posts.filter((item) => item.id === id);
  if (!post) {
    return res.status(404).json({status: 'undefinded'});
  }
  posts = posts.filter((item) => item.id !== id);
  res.json({posts, status: 'success'});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
};
