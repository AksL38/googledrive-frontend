import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

export default function Activation() {
  const infoRef = useRef(null);
  const { jwt } = useParams();
  useEffect(() => {
    axios
      .post(
        "https://googledrive-backend-aksl38.herokuapp.com/auth/activation",
        { token: jwt }
      )
      .then((response) => {
        infoRef.current.textContent = response.data.error
          ? response.data.error
          : response.data.message;
      });
  });

  return <p ref={infoRef}></p>;
}
