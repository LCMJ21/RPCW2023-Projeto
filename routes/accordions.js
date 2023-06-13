var express = require("express");
var router = express.Router();
var accordions = require("../controllers/accordion");

function getUser() {
  return (example_user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    afiliation: "University of Toronto",
    role: "Student",
    access: "Admin",
    register_date: "2021-01-01",
    last_login: "2021-01-01",
    favorites: [1, 3],
  });
}

router.get("/", async function (req, res, next) {
  var logged_in = true;
  try {
    if (logged_in) {
      const page = Number(req.query.page || "1");
      const perPage = 10;
      const accordions_list = await accordions.list(page, perPage);
      console.log(accordions_list);
      res.render("homepage", {
        title: "Justice home",
        accordions: accordions_list,
        user: getUser(),
      });
    } else {
      res.redirect("/users/login");
    }
  } catch (err) {
    res.render("error", { error: err });
  }
});

module.exports = router;
