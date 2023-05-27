// import React from "react";
import "./RatingProducts.module.css";

const RatingProducts = () => {
  const productos = [
    { nombre: 'Producto 1', imagen: 'https://images.pexels.com/photos/16839562/pexels-photo-16839562/free-photo-of-moda-zapatos-de-tacon-velo-vista-superior.jpeg?auto=compress&cs=tinysrgb&w=200&lazy=load', rate: 4 },
    { nombre: 'Producto 2', imagen: 'https://images.pexels.com/photos/16839562/pexels-photo-16839562/free-photo-of-moda-zapatos-de-tacon-velo-vista-superior.jpeg?auto=compress&cs=tinysrgb&w=200&lazy=load', rate: 4.2 },
    { nombre: 'Producto 3', imagen: 'https://images.pexels.com/photos/16839562/pexels-photo-16839562/free-photo-of-moda-zapatos-de-tacon-velo-vista-superior.jpeg?auto=compress&cs=tinysrgb&w=200&lazy=load', rate: 4.1 },
    { nombre: 'Producto 3', imagen: 'https://images.pexels.com/photos/16839562/pexels-photo-16839562/free-photo-of-moda-zapatos-de-tacon-velo-vista-superior.jpeg?auto=compress&cs=tinysrgb&w=200&lazy=load', rate: 2.5 }
  ];

  const maxRate = 4.5;

  return (
    <div className="container">
      <div className="top-ating">
        <h3>Top Rating Products</h3>
      </div>
      {productos.map((producto, index) => {
        const normalizedRate = (producto.rate / maxRate) * 100;
        return (
          <div key={index} className="product">
            <div className="product-image">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="product-info">
              <p className="product-name">{producto.nombre}</p>
            </div>
            <div className="chart-container">
              <svg viewBox="0 0 36 36">
                <path
                  className="circle"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle-progress"
                  strokeDasharray={`${normalizedRate} 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="18"
                  y="20.35"
                  className="percentage"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {producto.rate}
                </text>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingProducts;
