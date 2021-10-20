"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");


//user class, able to log in user, sign up user, view all users
//view, update, remove a user by ID


class User {

//login user
  static async login(username, password) {
    const result = await db.query(
      `SELECT username,
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              is_admin AS "isAdmin",
              user_id AS "userId"
      FROM users
      WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }


//signup user
  static async signup({ username, password, firstName, lastName, email, isAdmin, userId }) {
    const duplicateCheck = await db.query(
      `SELECT username
       FROM users
       WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            is_admin,
            user_id)
           VALUES ($1, $2, $3, $4, $5, $6,$7)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin", user_id AS "userId"`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        isAdmin,
        userId,
      ],
    );

    const user = result.rows[0];

    return user;
  }

  //get all users
static async findAll(){
  const users = await db.query(
    `SELECT username,
            first_name AS "firstName",
            last_name AS "lastName",
            email,
            is_admin AS "isAdmin",
            user_id AS "userId"
    FROM users`
  );
  return users.rows;
}

//get user by id

  static async get(userId) {
    const userRes = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              is_admin AS "isAdmin",
              user_id AS "userId"
       FROM users
       WHERE user_id = $1`,
      [userId],
    );

    const user = userRes.rows[0];
    console.log(user);
    if (!user) throw new NotFoundError(`No user with userId: ${userId}`);

    return user;
  }

 
//update user by id
  static async update(userId, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        firstName: "first_name",
        lastName: "last_name",
        isAdmin: "is_admin",
      });
    const userIdVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE userId = ${userIdVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"
                                user_id AS userId`;
    const result = await db.query(querySql, [...values, userId]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user with userId: ${userId}`);

    delete user.password;
    return user;
  }

//remove by username
  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }



}


module.exports = User;
