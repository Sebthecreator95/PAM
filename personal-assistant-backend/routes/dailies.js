"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUser } = require("../middleware/authentication");
const Daily = require("../models/daily");
const dailySchema = require("../schemas/dailySchema.json");


const router = express.Router({ mergeParams: true });

//create daily
router.post("/", ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, dailySchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const daily = await Daily.createDaily(req.body);
    return res.status(201).json({ daily });
  } catch (err) {
    return next(err);
  }
});

//get users dailies
router.get("/:userId", ensureCorrectUser, async function (req, res, next) {
  try {
    const dailies = await Daily.getDailies(req.params.userId);
    return res.json({ dailies });
  } catch (err) {
    return next(err);
  }
});


//remove by daily id
router.delete("/:id", async function (req, res, next) {
  try {
    await Daily.removeDaily(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
