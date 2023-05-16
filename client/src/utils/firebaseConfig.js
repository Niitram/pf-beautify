import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import validateCreateProduct from "./validateCreateProduct";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAACot6qy29p4K1ra6oQ_1CGVjDTbe0dsw",
  authDomain: "beautify-386112.firebaseapp.com",
  projectId: "beautify-386112",
  storageBucket: "beautify-386112.appspot.com",
  messagingSenderId: "147710965841",
  appId: "1:147710965841:web:a513945b789016403ee070",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp)

const storage = getStorage(firebaseApp);

export const createUserWithMail = async (username, password) => {
  return await createUserWithEmailAndPassword(auth, username, password)
}

export const singUpWithMail = async (username, password) => {
  return await signInWithEmailAndPassword(auth, username, password)
}

export const upload = async (
  archivo,
  setProductData,
  productData,
  setErrors
) => {
  // crea una referencia al archivo
  const archivoRef = ref(storage, `images/${archivo.name}`);
  // sube el archivo a esa referencia
  await uploadBytes(archivoRef, archivo);
  // devuelve la url del archivo
  const url = await getDownloadURL(archivoRef);

  setProductData({ ...productData, image: url });
  validateCreateProduct({ ...productData, image: url }, setErrors);
};

