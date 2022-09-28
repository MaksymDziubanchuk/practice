const express = require('express');
const Joi = require('joi');
const router = express.Router();

let posts = [
    {id: '1', topic: 'test1', text: 'test text1'},
    {id: '2', topic: 'test2', text: 'test text2'},
    {id: '3', topic: 'test3', text: 'test text3'},
]; 

router.get('/', (req, res) => {
    res.json({posts, status: 'success'});
})

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const [post] = posts.filter(item => item.id === id);
    if(post){
       return res.json({post, status: 'success'});
    }
    return  res.status(404).json({status: 'undefinded'});
})

router.post('/', (req, res) => {


    const schema = Joi.object({
        topic: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        text: Joi.string()
            .alphanum()
            .min(10)
            .max(400)
            .required(),
    })        

    const validationResult = schema.validate(req.body);

    if(validationResult.error) {
        return  res.status(404).json({status: validationResult.error.details});
    }

    const {
        topic,
        text
    } = req.body;

    posts.push({
        id: new Date,
        topic,
        text
    });
    res.json({posts, status: 'success'});
})

router.put('/:id', (req, res) => {
    const schema = Joi.object({
        topic: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        text: Joi.string()
            .alphanum()
            .min(10)
            .max(400)
            .required(),
    })        

    const validationResult = schema.validate(req.body);

    if(validationResult.error) {
        return  res.status(404).json({status: validationResult.error.details});
    }

    const id = req.params.id;
    const {
        topic,
        text
    } = req.body;

    const [post] = posts.filter(item => item.id === id);
    if(post){
        posts.forEach(item => {
            if(item.id === id){
                item.topic = topic;
                item.text = text;
            }
        });
       return res.json({posts, status: 'success'});
    }
    
    return  res.status(404).json({status: 'undefinded'});

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const [post] = posts.filter(item => item.id === id);
    if(!post){
        return  res.status(404).json({status: 'undefinded'});
    }
    posts = posts.filter(item => item.id !== id); 
    res.json({posts, status: 'success'});
})

module.exports = {
    postsRouter: router
}
 