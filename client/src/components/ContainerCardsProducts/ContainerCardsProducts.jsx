import Card from "../card/Card";

function ContainerCardsProducts({ arrayItems }) {
  return (
    <div>
      {arrayItems.map(({ image, price, name, rate }, index) => {
        return (
          <Card
            key={index}
            image={image}
            price={price}
            name={name}
            rate={rate}
          />
        );
      })}
    </div>
  );
}

export default ContainerCardsProducts;
