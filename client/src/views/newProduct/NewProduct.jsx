import FormCreateProduct from "../../components/formCreateProduct/FormCreateProduct";
import paleta from '../../assets/images/Paleta'
import styles from './NewProduct.module.css'

function NewProduct() {
  return (
    <div className={styles.container}>
      <FormCreateProduct />
    </div>
  );
}

export default NewProduct;
