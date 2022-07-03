const express = require('express');
const {v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('./logic/db');
const auth = require('./logic/auth');
const COLLECTION_NAME = 'users';
router.get('/', async(req, res) => {
    const isAdmin = await auth.isAdmin(req.header('auth'));
    let result = [];
    if(isAdmin){
        result = Object.values(await db.getItems(COLLECTION_NAME));
    }
    res.send(result);
});

router.post('/', async(req, res)=>{
    const authUser  = await auth.getUser(req.header('auth'));
    const dbUser = await db.getItemById(COLLECTION_NAME, authUser.googleId);
    if(dbUser){
        authUser.role = dbUser.role;
    }
    else{
        await db.setItem(COLLECTION_NAME, authUser, authUser.googleId);
    }
    res.json(authUser);
});


router.patch('/', async(req, res)=>{
    const isAdmin = await auth.isAdmin(req.header('auth'));
    const result = [];
    if(isAdmin){
        result = await db.updateItem(COLLECTION_NAME, req.body)
    }
    res.send(result);
});

router.delete('/:id', async(req, res)=>{
    const isAdmin = await auth.isAdmin(req.header('auth'));
    const result = [];
    if(isAdmin){
        result = await db.deleteItem(COLLECTION_NAME, req.params.id);
    }
    res.send(result);
});
module.exports = router;