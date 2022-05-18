import { useLayoutEffect, useState } from "react";
import { UserClass } from "../classes/UserClass";
import { UserType } from "../types/userTypes";
export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null as UserType | null);
  useLayoutEffect(() => {
    const userClass = UserClass.getInstance();
    const updateUser = (user: UserType) => {
      setUserInfo(user);
    };
    userClass.on("userUpdate", updateUser);
    userClass.self ? setUserInfo(userClass.self) : userClass.getUser();
    return () => {
      userClass.off("userUpdate", updateUser);
    };
  }, []);
  return userInfo;
};
