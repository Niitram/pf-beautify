
import { useEffect, useState } from "react";
import { getClient } from "../../request/clients";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function DetailUser() {
  const globalUserData = useSelector((state) => state.userData);
  const getDataFromDb = async (email) => {
    const data = await getClient(email);
    const userFromDb = data.data;
     const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    import { logout } from "../../redux/actions";
    
  const onLogout = async () => {
      dispatch(logout());
      await signOut(auth);
      navigate("/");
  };
    console.log(userFromDb);
    setUserData({
      name: userFromDb.fullName,
      email: userFromDb.email,
      adress: userFromDb.adress,
      phone: userFromDb.phone,
      image: userFromDb.image,
    });
  };
  useEffect(() => {
    getDataFromDb(globalUserData.email);
  }, []);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    adress: "",
    phone: "",
    image: "",
  });
  return (
    <div>
      <button onClick={onLogout}>Log out</button>
      <h1>{userData.name}</h1>
      <h3>{userData.email}</h3>
      <img src={userData.image} />
    </div>
  );
