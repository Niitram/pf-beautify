import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { orderProductsByPrice, orderProductsByRate } from "../../redux/actions";

function Order({ ordered, setOrdered }) {
  const dispatch = useDispatch();
  const handleChangeOrder = (e) => {
    setOrdered({ ...ordered, [e.target.name]: e.target.value });
    if (e.target.name === "price") {
      dispatch(orderProductsByPrice(e.target.value));
    }
    if (e.target.name === "rate") {
      dispatch(orderProductsByRate(e.target.value));
    }
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 5, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Order by price
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={ordered.price}
          name="price"
          onChange={handleChangeOrder}
        >
          <MenuItem value={"maxPrice"} name="price">
            Max price
          </MenuItem>
          <MenuItem value={"minPrice"} name="price">
            Min price
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 5, minWidth: 120 }}>
        <InputLabel id="demo2-simple-select-standard-label">
          Order by rate
        </InputLabel>
        <Select
          labelId="demo2-simple-select-standard-label"
          id="demo2-simple-select-standard"
          value={ordered.rate}
          name="rate"
          onChange={handleChangeOrder}
        >
          <MenuItem value={"maxRate"} name="rate">
            Max rate
          </MenuItem>
          <MenuItem value={"minRate"} name="rate">
            Min rate
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Order;
