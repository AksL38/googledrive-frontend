import { useContext, useEffect } from "react";
import { UserContext } from "./context";

export default function Signout() {
  const userInfo = useContext(UserContext);
  useEffect(() => {
    userInfo.setAuthorization("");
    userInfo.setLogged(false);
  });

  return <h3>Good Bye!</h3>;
}
