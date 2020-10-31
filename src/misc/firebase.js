import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyB_BMemPgLXgaL7Ph_3pb5Awo45xHWSss8",
    authDomain: "retro-lvh.firebaseapp.com",
    databaseURL: "https://retro-lvh.firebaseio.com",
    projectId: "retro-lvh",
    storageBucket: "retro-lvh.appspot.com",
    messagingSenderId: "846312670366",
    appId: "1:846312670366:web:112b3b187789e3c16a678f",
    measurementId: "G-GT0ML5NQ1C",
};
firebase.initializeApp(config);

const auth = firebase.auth();

const fs = firebase.firestore();
const database = firebase.database();
const boardsRef = fs.collection("Boards");
const columnsRef = fs.collection("Columns");
const cardsRef = fs.collection("Cards");
const usersRef = fs.collection("Users");
export { auth, database, usersRef, boardsRef, columnsRef, cardsRef };