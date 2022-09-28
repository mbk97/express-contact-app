const express = require("express");
const { users } = require("../../users/users");
const router = express.Router();
const uuid = require("uuid");

//get all members
router.get("/", (req, res) => {
  res.json(users);
});

//get single member
router.get("/:id", (req, res) => {
  //checks to see if the member id exists
  const found = users.some((user) => user.id === Number(req.params.id));

  //filters and return the single user
  const singleUser = users.filter((user) => user.id === Number(req.params.id));

  if (found) {
    res.json(singleUser);
  } else {
    res.status(400).json({ msg: "user not found" });
  }
});

//create member
router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({
      msg: "Please include a name and email",
    });
  }

  users.push(newUser);
  res.json({ msg: "New user created", users });
});

//update member
router.put("/:id", (req, res) => {
  //checks to see if the member id exists
  const found = users.some((user) => user.id === Number(req.params.id));

  //filters and return the single user
  const singleUser = users.filter((user) => user.id === Number(req.params.id));

  if (found) {
    const updateMember = req.body;
    users.forEach((user) => {
      if (user.id === Number(req.params.id)) {
        user.name = updateMember.name ? updateMember.name : user.name;
        user.email = updateMember.email ? updateMember.email : user.email;

        res.json({ msg: "User updated", user });
      }
    });
  } else {
    res.status(400).json({ msg: "user not found" });
  }
});

router.delete("/:id", (req, res) => {
  //checks to see if the member id exists
  const found = users.some((user) => user.id === Number(req.params.id));
  if (found) {
    res.json({
      msg: "user deleted successfully!!!",
      users: users.filter((user) => user.id !== Number(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
