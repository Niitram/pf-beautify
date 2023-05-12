const postProductsValidation = (req, res, next) => {
  const {
    name,
    description,
    image,
    price,
    discount,
    stock,
    state,
    category,
    rate,
  } = req.body;
  const stringVars = [name, description, image, category];
  const numericVars = [price, discount, stock];

  //*checking there's no missing data
  if (!stringVars.every(Boolean))
    return res.status(400).json({ error: "Incomplete Data" });
  if (!numericVars.every((numericVar) => typeof numericVar === "number"))
    return res.status(400).json({ error: "Incomplete Data" });

  //* checking status is a boolean
  if (typeof state !== "boolean")
    return res.status(400).json({ error: "State must be a boolean" });

  //* checking string vars come as strings
  if (!stringVars.every((data) => typeof data === "string"))
    return res.status(400).json({
      error: "Name, description, image and state must come in strings",
    });

  //* checking none string is larger than 255 characters
  if (!stringVars.every((data) => data.length <= 255))
    return res.status(400).json({
      error: "String must not be larger than 255 characters",
    });

  //* checking stock is an integer
  if (stock !== Math.floor(stock))
    return res.status(400).json({ error: "stock must be an integer number" });

  next();
};

module.exports = postProductsValidation;
