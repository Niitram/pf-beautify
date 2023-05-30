import axios from "axios";

const URL_BASE = "http://localhost:3001";

export async function getTopFiveRatingProducts() {
  try {
    const response = await axios.get(`${URL_BASE}/products`);
    const products = response.data;


    products.sort((a, b) => b.rate - a.rate);


    const roundedProducts = products.map((product) => {
      return {
        ...product,
        rate: Number(product.rate.toFixed(1)),
      };
    });


    const topFiveProducts = roundedProducts.slice(0, 5);

    return topFiveProducts;
  } catch (error) {
    console.error("Error while retrieving the top-rated products:", error);
    return [];
  }
}

export async function getTotalClientes() {
  try {
    const response = await axios.get(`${URL_BASE}/client`);
    const totalClientes = response.data.length;
    return totalClientes;
  } catch (error) {
    console.error("Error while retrieving the total number of clients:", error);
    return 0;
  }
}
export async function getTotalProductos() {


  try {
    const response = await axios.get(`${URL_BASE}/products`);
    const totalProductos = response.data.length;
    return totalProductos;
  } catch (error) {
    console.error("Error while retrieving the total number of products:", error);
    return 0;
  }
}

export async function getTotalServices() {

  try {
    const response = await axios.get(`${URL_BASE}/services`);
    const totalServices = response.data.length;
    return totalServices;
  } catch (error) {
    console.error("Error al obtener el total de servicios:", error);
    return 0;
  }
}

export async function getTotalAppointments() {
  try {
    const response = await axios.get(`${URL_BASE}/appointments`);
    const totalAppointments = response.data.length;
    return totalAppointments;
  } catch (error) {
    console.error("Error fetching total appointments:", error);
    return 0;
  }
}

export async function getTotalProfesionales() {
  try {
    const response = await axios.get(`${URL_BASE}/profesionals`);
    const totalProfesionales = response.data.length;
    return totalProfesionales;
  } catch (error) {
    console.error("Error al obtener el total de profesionales:", error);
    return 0;
  }
}



export async function getProductsByCategories() {
  try {
    const response = await axios.get(`${URL_BASE}/products`);

    const productos = response.data;

    const numeroProductosPorCategoria = {};

    productos.forEach((producto) => {
      const { category } = producto;

      if (numeroProductosPorCategoria[category]) {
        numeroProductosPorCategoria[category]++;
      } else {
        numeroProductosPorCategoria[category] = 1;
      }
    });

    return numeroProductosPorCategoria;
  } catch (error) {
    console.error('Error when retrieving the number of products per category:', error);
    return {};
  }
}

export async function getProductosMinMaxPrecio() {
  try {
    const response = await axios.get(`${URL_BASE}/products`);

    const productos = response.data;

    productos.sort((a, b) => b.price - a.price);

    const productoMasCaro = productos[0];
    const productoMasBarato = productos[productos.length - 1];

    return {
     " higher Price": productoMasCaro.price,
      "Lower Price": productoMasBarato.price,
    };
  } catch (error) {
    console.error("Error al obtener el producto más caro y más barato", error);
    return null;
  }
}



export async function getStaticsAppointments() {
  const appointments = await axios.get(`${URL_BASE}/appointments`);
  const appointmentsData = appointments.data;

  const appointmentTypesCount = {};

  appointmentsData.forEach((appointment) => {
    const { name } = appointment.Service;
    if (appointmentTypesCount[name]) {
      appointmentTypesCount[name]++;
    } else {
      appointmentTypesCount[name] = 1;
    }
  });

  const maxCount = Math.max(...Object.values(appointmentTypesCount));
  const mostFrequentAppointment = Object.keys(appointmentTypesCount).find(
    (name) => appointmentTypesCount[name] === maxCount
  );

  return {
    [mostFrequentAppointment]: maxCount
  };
}
