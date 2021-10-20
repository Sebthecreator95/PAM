"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");





class Daily {
  
//create daily
  static async createDaily(data) {
    const result = await db.query(
          `INSERT INTO dailies (user_id, text, id)
           VALUES ($1, $2, $3)
           RETURNING user_id AS userId, text, id AS dailyId`,
        [
          data.userId,
          data.text,
          data.dailyId
        ]);
    let daily = result.rows[0];

    return daily;
  }

//get users dailies
  static async getDailies(userId) {

    const dailiesRes = await db.query(
      `SELECT user_id AS "userId",
              text,
              id AS dailyId
      FROM dailies
      WHERE user_id = $1`, [userId]
    );
    return dailiesRes.rows;
  }

 

//remove daily with daily id
  static async removeDaily(id) {
    const result = await db.query(
          `DELETE
           FROM dailies
           WHERE id = $1
           RETURNING id`, [id]);
    const daily = result.rows[0];

    if (!daily) throw new NotFoundError(`No daily: ${id}`);
  }
}

module.exports = Daily;
