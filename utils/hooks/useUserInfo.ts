import { useLayoutEffect, useState } from "react";
import { UserType } from "../types/userTypes";
let lastFetch = 0;
let info: Promise<UserType>;
export const useUserInfo = (dep: number = 0) => {
  const [userInfo, setUserInfo] = useState(null as UserType | null);
  useLayoutEffect(() => {
    if (Date.now() - lastFetch > 500) {
      lastFetch = Date.now();
      info = new Promise(async (res, rej) => {
        const token = localStorage.getItem("token");
        const userData = await fetch(`${process.env.API_URL}/api/users/@me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((x) => x.json());
        if (userData.statusCode === 200) {
          res(userData.data);
        } else {
          rej(userData);
        }
      });
    }
    info.then((x) => setUserInfo(x));
  }, [dep]);
  return userInfo;
};
