// import { useState } from "react";
import { logout } from "../../redux/actions";
// import { INVITED, CLIENT } from "../../utils/roles";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function DetailUser() {
  // const userData = useSelector((state) => state.userData);
 const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = async () => {
      dispatch(logout());
      await signOut(auth);
      navigate("/");
  };
  return (<div>
    DetailUser
      <button onClick={onLogout}>Log out</button>
    </div>);
}

export default DetailUser;
