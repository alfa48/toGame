// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, onSnapshot, query, where, orderBy, increment, limit } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";



// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAmL-FwnG2wcSQbhZDHS097TMqPekYWA0",
  authDomain: "togame-1968e.firebaseapp.com",
  projectId: "togame-1968e",
  //projectId: "project-786484439486",
  storageBucket: "togame-1968e.firebasestorage.app",
  messagingSenderId: "786484439486",
  appId: "1:786484439486:web:5384a105835652e98ab1ef",
  measurementId: "G-PQJ7CN7WYB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const providerGoogle = new GoogleAuthProvider();

// ─── FUNÇÕES ÚTEIS ────────────────────────

// Login com Google
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, providerGoogle);
    return result.user;
  } catch(err) {
    console.error("Erro no login:", err);
    throw err;
  }
}

// Criar ou atualizar usuário no Firestore
export async function createOrUpdateUser(userId, name) {
  await setDoc(doc(db, "players", userId), {
    name,
    score: 0
  }, { merge: true });
}

// Adicionar tarefa
export async function addTask(name, deadline, tags, userId) {
  await addDoc(collection(db, "tasks"), {
    name,
    deadline,
    tags,
    completed: false,
    userId,
    createdAt: new Date()
  });
}

// Incrementar score
export async function incrementScore(userId, points = 1) {
  await updateDoc(doc(db, "players", userId), {
    score: increment(points)
  });
}

// Escutar tarefas do usuário
export function listenUserTasks(userId, callback) {
  const q = query(collection(db, "tasks"), where("userId", "==", userId), orderBy("deadline"));
  return onSnapshot(q, callback);
}

// Escutar ranking top 5
export function listenRanking(callback) {
  const q = query(collection(db, "players"), orderBy("score", "desc"), limit(5));
  return onSnapshot(q, callback);
}
