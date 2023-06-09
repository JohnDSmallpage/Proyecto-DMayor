import { 
  createUserWithEmailAndPassword, 
  getAdditionalUserInfo, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut } from "@firebase/auth";
import { auth } from "./Config";
import { addProductToCatalog, createSupplierProfile, createUserProfile } from "./user-service";
import { v4 } from "uuid";
import { addNewProduct } from "./user-service";


  export const signInWithGoogle = async()=>{
     const googleProvider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth,googleProvider)//abre la ventana de login de google
        const {isNewUser}=getAdditionalUserInfo(result);
        if(isNewUser){
          await createUserProfile(result.user.uid,{
            uid:result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            phone: "", 
            ID:"",

          })
        }
    } catch (error) { 
    }
};
export const registerWithEmailAndPassword = async(
  email,
  password,
  extraData
  )=>{
  try {
    const result = await createUserWithEmailAndPassword(auth,email,password,extraData);
    if(extraData?.Company != undefined){
      await createSupplierProfile(result.user.uid,{
        uid:result.user.uid,
        email,
        password,
        ...extraData,
      })
    }else{
      await createUserProfile(result.user.uid,{
        uid:result.user.uid,
        email,
        password,
        ...extraData,
      })
    }
  } catch (error) {
    if(error.code === "auth/email-already-in-use"){
      return ("El email ya está en uso.")
    }
  } 
};
export const logInWithEmailAndPassword = async(email,password)=>{
  try {
    const result = await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {  
    if (error.code === 'auth/user-not-found' || 'auth/wrong-password') {
      return ('El correo o contraseña ingresados son incorrectos.');
    }if(error.code === 'too-many-requests'){
      return ('Muchos intentos, porfavor espere un momento y pruebe mas tarde')
    } else {
      return ('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.');
    };
  }
};

export const logout = async()=>{
  try {
    await signOut(auth);
  } catch (error) {
  }
};


export const registerProduct = async(
  data,
  user
  )=>{
    console.log(data);
    let id = v4();
    console.log(id);
  try {
    console.log(data);
    await addNewProduct(id,{
      id:id,
      ...data,
    })
    await addProductToCatalog(id, user);
    console.log("Producto registrado");
  } catch (error) {
    console.log(error);
  } 
};
