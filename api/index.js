const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const config = {
  apiKey: "AIzaSyCQKvHBvSCOW0gcfFpZ3S8MzdrYc29X8yI",
  authDomain: "customers-fbe7b.firebaseapp.com",
  databaseURL: "https://customers-fbe7b.firebaseio.com",
  projectId: "customers-fbe7b",
  storageBucket: "customers-fbe7b.appspot.com",
  messagingSenderId: "539604460734"
};
const database = firebase.initializeApp(config).database();
const fs = require('fs');
const store = database.ref();
const customersRef = '-LKwzSI5oSw6pWlOpb-n';

const getCustomerID = () => {
  customers = store.child(customersRef);
  return customers.once('value').then(snapshot => {
    const arry = snapshot.val();
    return Number(arry[arry.length-1].customerID) +1;
  });
};

const formatData = data => {
  return {
    customerID: data.customerID,
    name: data.name,
    birthday: data.birthday,
    gender: data.gender,
    lastContact: data.lastContact,
    customerLifetimeValue: data.customerLifetimeValue
  };
};

router.get('/', (req, res) => {
  customers = store.child(customersRef);
  customers.once('value').then(snapshot => {
    const customers = snapshot.val()
        .filter(val => val !== 0);
    res.send(customers);
    }, err => {
      throw new Error(`Something was wrong, try later`);
  });
});

router.put('/', (req, res, next) => {
  const customer = formatData(req.body);
  try {
    store.child(`${customersRef}/${customer.customerID}`)
      .update(customer, (err, data) => {
        if (err) {
          res.status(500);
          res.render('error', { error: 'Something was wrong proccesing your request.' })
        }
        res.send(data);
      });
  } catch (e) {
    next(e);
  }
});

router.post('/', (req, res, next) => {
  const customer = formatData(req.body);

  getCustomerID().then(id => {
    customer.customerID = id;
    customer.lastContact = Date.now();
    store.child(`${customersRef}/${customer.customerID}`)
      .update(customer, (err, data) => {
        if (err) {
          res.status(500);
          res.render('error', { error: 'Something was wrong proccesing your request.' })
        }
        res.send();
      });
  }).catch(next);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  store.child(`${customersRef}/${id}`)
    .set(null)
    .then(msg => {
      res.send({message: `Customer with id ${id} was deleted succesfull`});
    });
});

module.exports = router;
