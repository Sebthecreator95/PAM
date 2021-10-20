"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");


class Event {
  
//CREATE EVENT
    static async createEvent(data) {
      const result = await db.query(
            `INSERT INTO events (
                user_id,
                name,
                time,
                date,
                icon,
                id)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING 
             user_id AS userId,
             name,
             time,
             date,
             icon,
             id AS eventId`,
          [
            data.userId,
            data.name,
            data.time,
            data.date,
            data.icon,
            data.eventId
          ]);
      let event = result.rows[0];
  
      return event;
    }
  
  //VIEW EVENTS BY USER ID
    static async getEvents(userId) {
        const eventsRes = await db.query(
          `SELECT *
          FROM events
          WHERE user_id = $1`, [userId]
        );
        return eventsRes.rows;

      
    }

    //VIEW EVENTS BY DATE
    static async getDateEvents(userId, date) {
      console.log("*******")
      console.log(userId);
      console.log("*******")
        const dateEventsRes = await db.query(
          `SELECT user_id,
                  name,
                  time,
                  date,
                  icon,
                  id
          FROM events
          WHERE user_id = $1 AND date = $2`, [userId, date]
        );
        return dateEventsRes.rows;
      
    }
  
  
    
  
  //REMOVE EVENT WITH EVENT ID
    static async removeEvent(id) {
      const result = await db.query(
            `DELETE
             FROM events
             WHERE id = $1
             RETURNING id`, [id]);
      const event = result.rows[0];
  
      if (!event) throw new NotFoundError(`No Event: ${id}`);
    }
  }
  
  module.exports = Event;
  