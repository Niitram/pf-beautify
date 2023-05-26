import { useParams } from "react-router-dom";
import { getServiceById, getServices } from "../../request/services";
import { useEffect, useState } from "react";

function DetailService() {
  const [service, setService] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      getServices().then((res) => {
        console.log(res.data);
      });
      getServiceById(id).then((res) => {
        console.log(res.data);
        setService(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }

    return () => {
      setService({});
    };
  }, []);
  console.log(service);
  return (
    <div>
      {service && (
        <div>
          <h1>{service.name}</h1>
          <p>{service.description}</p>
          <span>Price: {service.price}</span>
          <span>Duration: {service.duration}</span>
          <span>Rating: {service.rate}</span>
          <img src={service.image} alt={service.name} />
        </div>
      )}
    </div>
  );
}

export default DetailService;
