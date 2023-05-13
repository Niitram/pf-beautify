import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { orderProducts } from "../../redux/actions";

function Order({ ordered, setOrdered }) {
  const dispatch = useDispatch();
  const handleChangeOrder = (e) => {
    setOrdered(e.target.value);
    dispatch(orderProducts(e.target.value));
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
