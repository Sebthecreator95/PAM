import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PamApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PamApi.token}` };
    const params = (method === "get") ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getUser(userId) {
    let res = await this.request(`users/${userId}`);
    return res.user;
  }

  static async getDailies(userId) {
    let res = await this.request(`dailies/${userId}`);
    return res.dailies;
  }
  static async addDaily(userId, data) {
    let dailyId = uuidv4();
    let res = await this.request(`dailies`, { userId, ...data, dailyId }, "post");
    return res.daily;
  }

  static async  deleteDaily(id){
    let res = await this.request(`dailies/${id}`, {}, "delete");
    return res.deleted;
  }

  static async getDateEvents(userId, month, day, year) {
    let res = await this.request(`events/${userId}/${month}/${day}/${year}`);
    return res.events;
  }

  static async getEvents(userId) {
    let res = await this.request(`events/${userId}`);
    return res.events;
  }

  static async addEvent( userId, data) {
    let eventId=uuidv4();
    let res = await this.request(`events`, { userId, ...data, eventId }, "post");
    return res.daily;
  }

  static async  deleteEvent(id){
    let res = await this.request(`events/${id}`, {}, "delete");
    return res.deleted;
  }


  static async login(data) {
    let res = await this.request(`login`, data, "post");
    return res.token;
  }

  static async signup(data) {
    let userId=uuidv4();
    let res = await this.request(`signup`, {...data, userId }, "post");
    return res.token;
  }

}

export default PamApi;