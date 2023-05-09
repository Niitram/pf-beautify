/* import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder"; */

const painterStars = (rate) => {
  const totalStars = 5;
  let cantidadEstrellasPintadas = 0;
  let cantidadEstrellasAMedia = 0;
  let cantidadEstrellasVacias = 0;
  if (rate === 5) {
    cantidadEstrellasPintadas = rate;
    return [
      cantidadEstrellasPintadas,
      cantidadEstrellasAMedia,
      cantidadEstrellasVacias,
    ];
  }

  //convierto el numero al mas cercano sea entero o .5
  const numeroAproximado = Math.round(rate * 2) / 2;
  //si es entero
  if (Number.isInteger(numeroAproximado)) {
    cantidadEstrellasPintadas = numeroAproximado;
    cantidadEstrellasVacias = totalStars - cantidadEstrellasPintadas;
  } else {
    cantidadEstrellasAMedia = 1;
    cantidadEstrellasPintadas = Math.floor(numeroAproximado);
    cantidadEstrellasVacias = totalStars - Math.ceil(numeroAproximado);
  }
  return [
    cantidadEstrellasPintadas,
    cantidadEstrellasAMedia,
    cantidadEstrellasVacias,
  ];
};

console.log(painterStars(1.5));
// export default painterStars;
