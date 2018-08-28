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
    const arry = snapshot.val()
    return Number(arry[arry.length-1].customerID) +1;
  });
};

router.get('/', (req, res) => {
  customers = store.child(customersRef);
  customers.once('value').then(snapshot => {
    const customers = snapshot.val()
        .filter(val => val !== null)
        .map(obj => obj);
    res.send(Array.from(customers));
  });
});

router.post('/', (req, res, next) => {
  const customer = {
    customerID: req.body.customerID,
    name: req.body.name,
    birthday: req.body.birthday,
    gender: req.body.gender,
    lastContact: req.body.lastContact,
    customerLifetimeValue: req.body.customerLifetimeValue
  };
  try {
    if (customer.customerID == -1) {
      getCustomerID().then(id => {
        customer.customerID = id;
        customer.lastContact = Date.now();
        store.child(`${customersRef}/${customer.customerID}`)
          .update(customer, (error, data) => {
            res.send(data);
          });
      });
    } else {
      store.child(`${customersRef}/${customer.customerID}`)
        .update(customer, (error, data) => {
          res.send(data);
        });
    }
  } catch (e) {
    next(e);
  }
});

router.put('/', (req, res, next) => {
  try {
    // getCustomerID().then(id => res.send({id: id}));
    store.child(customersRef).push(req.body);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
