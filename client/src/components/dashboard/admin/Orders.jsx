//* este componente renderiza un listado de pedidos con la opcion de que el administrador visualice los detalles de la compra.
//! faltan agregar funcionalidades


import styles from "./Orders.module.css";

export default function Orders() {
    const orders = [
      {
        id: 1,
        client: "Juan Perez",
        phone:123456,
        address: "Calle 123",
        amount: 100,
      },
      {
        id: 2,
        client: "Maria Gomez",
        phone:123456,
        address: "Avenida 456",
        amount: 200,
      },
      {
        id: 3,
        client: "Pedro Rodriguez",
        phone:123456,
        address: "Calle 789",
        amount: 150,
      },
      {
        id: 4,
        client: "Ana Martinez",
        phone:123456,
        address: "Avenida 987",
        amount: 300,
      },
      {
        id: 5,
        client: "Luisa Hernandez",
        phone:123456,
        address: "Calle 654",
        amount: 250,
      },
      {
        id: 6,
        client: "Jorge Ramirez",
        phone:123456,
        address: "Avenida 321",
        amount: 180,
      },
      {
        id: 7,
        client: "Sofia Torres",
        phone:123456,
        address: "Calle 246",
        amount: 120,
      },
    ];
  
    return (
      <div className={styles.pedidos}>
        <h2>Orders</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Client</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Monto</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{order.amount}</td>
                <td>
                  <button>Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  