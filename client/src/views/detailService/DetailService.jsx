import { useParams } from "react-router-dom";
import { getServiceById } from "../../request/services";
import { useEffect, useState } from "react";

function DetailService() {
  const [service, setService] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      getServiceById(id).then((res) => {
        setService(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }

    return () => {
      setService({});
    };
  }, []);
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
