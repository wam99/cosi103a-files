/*
  todo.js -- Router for the ToDoList
*/
const express = require('express');
const router = express.Router();
const TransactionItem = require('../models/TransactionItem')
const User = require('../models/User')


/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

// get the value associated to the key
router.get('/transactions/',
  isLoggedIn,
  async (req, res, next) => {
      let items=[]
      items = 
        await TransactionItem.find({userId:req.user._id})
      res.render('transactionList',{items});
});

/* add the value in the body to the list associated to the key */
router.post('/transactions',
  isLoggedIn,
  async (req, res, next) => {
      const transaction = new TransactionItem(
        {description:req.body.desc,
         amount:req.body.amount,
         category:req.body.cat,
         date:req.body.date,
         userId:req.user._id
        })
      await transaction.save();
      res.redirect('/transactions')
});

router.get('/transactions/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transactions/remove/:itemId")
      await TransactionItem.deleteOne({_id:req.params.itemId});
      res.redirect('/transactions')
});

router.get('/transactions/edit/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transactions/edit/:itemId")
      const item = 
       await TransactionItem.findById(req.params.itemId);
      res.locals.item = item
      res.render('editTransaction')
});

router.post('/transactions/updateTransactionItem',
  isLoggedIn,
  async (req, res, next) => {
      const {itemId,description,amount,category,date} = req.body;
      console.log("inside /transactions/complete/:itemId");
      await TransactionItem.findOneAndUpdate(
        {_id:itemId},
        {$set: {description,amount,category,date}} );
      res.redirect('/transactions')
});

router.get('/transactions/groupByCategory/',
  isLoggedIn,
  async (req, res, next) => {
    let results =
        await TransactionItem.aggregate(
            [
                {$group:{
                _id:"$category",
                amount:{$sum:"$amount"}
                }},
                {$sort:{_id:1}}         
            ])

    //res.json(results)
    res.render('groupByCategory',{results})
});

module.exports = router;