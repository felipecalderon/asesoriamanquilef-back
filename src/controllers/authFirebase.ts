import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export const authenticateUserEmailPassword = async ({ email, password }: { email: string, password: string}) => {
    try {
        if(!email || !password) throw 'Falta correo o contraseña'
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Inicio de sesión exitoso
        const user = userCredential.user;
        return user;
    } catch (error) {
        throw error
    }
  };

  export const createUserEmailAndPassword = async ({ email, password }: { email: string, password: string}) => {
    try {
        if(!email || !password) throw 'Falta correo o contraseña'
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Inicio de sesión exitoso
        const user = userCredential.user;
        return user;
    } catch (error) {
        throw error
    }
  };

