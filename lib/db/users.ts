import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export interface UserRegistration {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  createdAt: Date;
}

export async function registerUser(userData: Omit<UserRegistration, 'createdAt'>) {
  try {
    // Check if user already exists
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', userData.email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error('User with this email already exists');
    }

    // Add new user
    const docRef = await addDoc(usersRef, {
      ...userData,
      createdAt: new Date(),
    });

    return { id: docRef.id, ...userData };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}