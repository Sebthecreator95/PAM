"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUser } = require("../middleware/authentication");
const Event = require("../models/event");
const eventSchema = require("../schemas/eventSchema.json");


const router = express.Router({ mergeParams: true });
/*
Event routes 
adding event
viewing events by user id
viewing events by user id and date
removing event by eventID
*/


//add event
router.post("/",ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, eventSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const event = await Event.createEvent(req.body);
    return res.status(201).json({ event });
  } catch (err) {
    return next(err);
  }
});

//view user events
router.get("/:userId",ensureCorrectUser, async function (req, res, next) {
  try {
    const events = await Event.getEvents(req.params.userId);
    return res.json({ events });
  } catch (err) {
    return next(err);
  }
});


//view events by date
router.get("/:userId/:month/:day/:year",ensureCorrectUser, async function (req, res, next) {
  try {
    let date =`${req.params.year}-${req.params.month}-${req.params.day}`;
    const events = await Event.getDateEvents(req.params.userId, date);
    return res.json({ events });
  } catch (err) {
    return next(err);
  }
});



//remove event with eventID
router.delete("/:id", async function (req, res, next) {
  try {
    await Event.removeEvent(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
