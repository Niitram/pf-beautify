import { useDispatch } from "react-redux";
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import { orderProducts } from "../../redux/actions";
import styles from './Order.module.css'


function Order({ ordered, setOrdered }) {
  const dispatch = useDispatch();
  const handleChangeOrder = (e) => {
    setOrdered(e.target.value);
    dispatch(orderProducts(e.target.value));
  };
  return (
    <div>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          value={ordered.price}
          name="radio-buttons-group"
          onChange={handleChangeOrder}
          className={styles.Order}
        >
          <FormLabel id="demo-radio-buttons-group-label">Order by price</FormLabel>
          <FormControlLabel value={"maxPrice"} name="price" control={<Radio />} label="Max price" />
          <FormControlLabel value={"minPrice"} name="price" control={<Radio />} label="Min price" />
          <FormLabel id="demo-radio-buttons-group-label">Order by rating</FormLabel>
          <FormControlLabel value={"maxRate"} name="rate" control={<Radio />} label="Max rate" />
          <FormControlLabel value={"minRate"} name="rate" control={<Radio />} label="Min rate" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Order;
