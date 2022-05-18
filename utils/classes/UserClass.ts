import EventEmitter from "events";
import { UserType } from "../types/userTypes";

export class UserClass extends EventEmitter {
  static instance: UserClass;
  static getInstance() {
    if (!UserClass.instance) {
      UserClass.instance = new UserClass();
    }
    return UserClass.instance;
  }
  self: UserType;
  private constructor() {
    super();
    const user = localStorage.getItem("user");
    if (user) {
      this.self = JSON.parse(user);
    }
    this.getUser();
  }
  async getUser() {
    const token = localStorage.getItem("token");
    const userData = await fetch(`/api/users/@me`, {
      headers: {
        Authorization: `${token}`,
      },
    }).then((x) => x.ok && x.json());
    if (userData) {
      this.self = userData;
      this.emit("userUpdate", this.self);
      localStorage.setItem("user", JSON.stringify(this.self));
    }
  }
}
