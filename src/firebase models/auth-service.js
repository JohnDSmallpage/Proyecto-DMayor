import { 
  createUserWithEmailAndPassword, 
  getAdditionalUserInfo, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut } from "@firebase/auth";
import { auth } from "./Config";
import { createUserProfile } from "./user-service";

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
    await createUserProfile(result.user.uid,{
      uid:result.user.uid,
      email,
      password,
      ...extraData,
    })
  } catch (error) {
  } 
};
export const logInWithEmailAndPassword = async(email,password)=>{
  try {
    const result = await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {  
  }
};

export const logout = async()=>{
  try {
    await signOut(auth);
  } catch (error) {
  }
};
