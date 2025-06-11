// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB11PZ7wip1_0uJtGLP7sl3TbU5WDV-CQ4",
  authDomain: "newsapp-bf240.firebaseapp.com",
  projectId: "newsapp-bf240",
  storageBucket: "newsapp-bf240.appspot.com",
 messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
