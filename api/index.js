const express = require("express");
const router = express.Router();

const getCustomerID = () => {
  customers = [];
  return customers.once("value").then((snapshot) => {
    const arry = snapshot.val();
    return Number(arry[arry.length - 1].customerID) + 1;
  });
};

const formatData = (data) => {
  return {
    customerID: data.customerID,
    name: data.name,
    birthday: data.birthday,
    gender: data.gender,
    lastContact: data.lastContact,
    customerLifetimeValue: data.customerLifetimeValue,
  };
};

router.get("/", (req, res) => {
  customers = [];
  console.log("Atemping get users");
});

router.put("/", (req, res, next) => {
  const customer = formatData(req.body);
  try {
    console.log("Atempping to uodate user");
  } catch (e) {
    next(e);
  }
});

router.post("/", (req, res, next) => {
  const customer = formatData(req.body);
  console.log("Atemping creating user");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log("Atemping deleting user");
});

module.exports = router;
