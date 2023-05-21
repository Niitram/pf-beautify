import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PurchaseSuccess() {
  const userData = useSelector((state) => state.userData);
  return (
    <div>
      <h1>Congratulations! The purchase has been successfully completed</h1>
      <Link to="/home">Go to Home</Link>
    </div>
  );
}

export default PurchaseSuccess;
