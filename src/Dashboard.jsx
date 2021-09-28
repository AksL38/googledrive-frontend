import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { serverURI } from "./config";
import { UserContext } from "./context";

export default function Dashboard() {
  const content = useRef("");
  const { authorization, isLogged } = useContext(UserContext);
  useEffect(() => {
    if (!isLogged) {
      content.current.innerHTML =
        "<h1>Welcome! Sign in to view your data!</h1>";
      return;
    }
    axios
      .get(serverURI + "/", { headers: { authorization } })
      .then((response) => {
        content.current.innerHTML = response.data;
      })
      .catch((err) => {
        content.current.innerHTML = "Unable to retrieve data from the server!";
        console.log(err.response.data);
      });
  });

  return <div ref={content}></div>;
}
