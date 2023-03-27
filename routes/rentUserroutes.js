const express = require("express");
const rentUsermodel = require("../Model/rentUsermodel");
const router = express();

router.post("/rentflatgetuserform", async (req, res) => {
  // new user
  const user = new rentUsermodel({
    name: req.body.name,
    mobileno: req.body.mobileno,
    gender: req.body.gender,
    address: req.body.address,
    designation: req.body.designation,
  });

  // save user in the database
  await user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
});

router.get("/getlistrentflatusers", async (req, res) => {
  try {
    const getalluserlist = await rentUsermodel.find({});
    res.status(201).send(getalluserlist);
  } catch {
    res.status(400).send("list not found");
  }
});

router.delete("/deleteusersshowflat/:id", async (req, res) => {
  console.log("dd", req.params.id);
  try {
    const deletemylist = await rentUsermodel.findByIdAndDelete({
      id: req.params.id,
    });
    console.log(deletemylist);
    if (!task) {
      res.status(404).send("rentflat not found");
    }
    res.send(deletemylist);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/updaterentusercard/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const updatelist = await rentUsermodel.findByIdAndUpdate(id, req.body);
    console.log(updatelist);
    if (!updatelist) {
      return res.status(404).send();
    }
    res.send(updatelist);
    await updatelist.save();
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
