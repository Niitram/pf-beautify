// import React from 'react';
import styles from './Services.module.css';

export default function Services() {
  const orders = [
    {
      id: 1,
      name: 'Manicure',
      price: 50,
      client: 'Pablo Escobar',
      status: 'Pendiente',
    },
    {
      id: 2,
      name: 'Manicure',
      price: 50,
      client: 'Pablo Escobar',
      status: 'Pendiente',
    },
    {
      id: 3,
      name: 'Manicure',
      price: 50,
      client: 'Pablo Escobar',
      status: 'Pendiente',
    },
    {
      id: 4,
      name: 'Manicure',
      price: 50,
      client: 'Pablo Escobar',
      status: 'Pendiente',
    },
    {
      id: 5,
      name: 'Manicure',
      price: 50,
      client: 'Pablo Escobar',
      status: 'Pendiente',
    },
    {
      id: 6,
      name: 'Manicure',
      price: 50,
      client: 'Pablo Escobar',
      status: 'Pendiente',
    },
    {
      id: 7,
      name: 'Manicure',
      price: 50,
      client: 'Pablo Escobar',
      status: 'Pendiente',
    },
  ];

  return (
    <div className={styles.pedidos}>
      <h2>Services Contrated</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>N° ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Client</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.client}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
