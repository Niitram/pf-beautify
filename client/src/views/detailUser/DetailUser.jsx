import { useState } from "react";

function DetailUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    adress: "",
    phone: "",
    image: "",
  });
  const getUserData = () => {};
  return <div>DetailUser</div>;
}

export default DetailUser;
