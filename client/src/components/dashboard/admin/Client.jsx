//* este componente renderiza un listado de clientes con la opcion de que el administrador le envie un correo a cada cliente si lo desea.
//! faltan agregar funcionalidades
import styles from "./Client.module.css";

export default function Client() {
  const clientes = [
    { id: 1, nombre: "Juan Perez", email: "juan@example.com" },
    { id: 2, nombre: "María Rodríguez", email: "maria@example.com" },
    { id: 3, nombre: "Pedro Gómez", email: "pedro@example.com" },
    { id: 4, nombre: "Ana Martínez", email: "ana@example.com" },
    { id: 5, nombre: "José García", email: "jose@example.com" },
    { id: 6, nombre: "Carla Fernández", email: "carla@example.com" },
    { id: 7, nombre: "Miguel López", email: "miguel@example.com" },
  ];

  return (
    <div className={styles.lista_clientes}>
      <h2>Clients</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>phone</th>
            <th>Send</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <th>phone</th>

              <td>
                <button>Enviar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}