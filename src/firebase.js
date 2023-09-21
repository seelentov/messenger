import { initializeApp } from "firebase/app"

// Оставлю свои токены для вашего теста
const firebaseConfig = {
  apiKey: 'AIzaSyBB0K-BM55EFuDlfKHXxYda_Pce1SdJLeI',
  authDomain: 'auth-system-daa3a.firebaseapp.com',
  projectId: 'auth-system-daa3a',
  storageBucket: 'auth-system-daa3a.appspot.com',
  messagingSenderId: '1072996347122',
  appId: '1:1072996347122:web:bf2be4677d32a59cf6346b',
}




export const app = initializeApp(firebaseConfig)