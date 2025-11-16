import { 
  addTask, 
  incrementScore, 
  listenUserTasks, 
  listenRanking 
} from './firebase.js';

const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");

const userNameEl = document.getElementById("userName");
const myScoreEl = document.getElementById("myScore");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskForm = document.getElementById("taskForm");
const saveTaskBtn = document.getElementById("saveTask");
const taskListEl = document.getElementById("taskList");
const rankingListEl = document.getElementById("rankingList");
const taskNameInput = document.getElementById("taskName");
const taskDeadlineInput = document.getElementById("taskDeadline");
const taskTagsSelect = document.getElementById("taskTags");

// Mostrar nome do jogador
userNameEl.textContent = userName;

// Toggle formulário
addTaskBtn.onclick = () => {
  taskForm.style.display = taskForm.style.display === "none" ? "block" : "none";
};

// Salvar tarefa
saveTaskBtn.onclick = async () => {
  const name = taskNameInput.value.trim();
  const deadline = taskDeadlineInput.value;
  const tags = Array.from(taskTagsSelect.selectedOptions).map(o => o.value);

  if (!name || !deadline) {
    alert("Preencha nome e deadline!");
    return;
  }

  await addTask(name, deadline, tags, userId);
  await incrementScore(userId, 1); // incrementa 1 ponto por tarefa criada

  // limpar formulário
  taskNameInput.value = "";
  taskDeadlineInput.value = "";
  taskTagsSelect.selectedIndex = -1;
  taskForm.style.display = "none";
};

// Escutar tarefas do usuário em tempo real
listenUserTasks(userId, (snapshot) => {
  taskListEl.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.name} | ${data.deadline} | ${data.tags.join(", ")}`;
    taskListEl.appendChild(li);
  });
});

// Escutar ranking top 5
listenRanking((snapshot) => {
  rankingListEl.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.name} - ${data.score} pts`;
    rankingListEl.appendChild(li);

    // atualizar pontuação do jogador atual
    if (doc.id === userId) {
      myScoreEl.textContent = data.score;
    }
  });
});
