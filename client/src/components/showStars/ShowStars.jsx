import painterStars from "../../utils/painterStars";
import {
  StarRateIcon,
  StarHalfIcon,
  StarBorderIcon,
} from "@mui/icons-material";

// import StarRateIcon from "@mui/icons-material/StarRate"; //completa
// import StarHalfIcon from "@mui/icons-material/StarHalf"; //media
// import StarBorderIcon from "@mui/icons-material/StarBorder"; //vacia

function ShowStars({ rate }) {
  if (rate > 5) rate = 5;
  if (rate < 1) rate = 1;
  const arrStars = painterStars(rate);
  const showStartRate = () => {
    for (let index = 0; index < arrStars[0]; index++) {
      return <StarRateIcon />;
    }
    return;
  };
  const showStartHalf = () => {
    for (let index = 0; index < arrStars[1]; index++) {
      return <StarHalfIcon />;
    }
    return;
  };
  const showStartBorder = () => {
    for (let index = 0; index < arrStars[2]; index++) {
      return <StarBorderIcon />;
    }
    return;
  };
  return (
    <div>
      {showStartRate()} {showStartHalf()} {showStartBorder()}
    </div>
  );
}

export default ShowStars;
