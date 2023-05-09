import { Stack, Rating } from "@mui/material";

function Card({ image, price, name, rate }) {
  return (
    <>
      <img src={image} alt={name} />
      <span>{name}</span>
      <Stack>
        <Rating
          name="half-rating-read"
          defaultValue={rate}
          precision={0.5}
          readOnly
        />
      </Stack>

      <span>${price}</span>
    </>
  );
}

export default Card;
