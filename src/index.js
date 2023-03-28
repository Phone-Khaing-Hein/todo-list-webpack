import './style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

const listForm = document.getElementById('todoList');

const list = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'complete todo list project',
    completed: false,
    index: 1,
  },
];

const showList = (list) => {
  list
    .sort((a, b) => a.index - b.index)
    .forEach((l) => {
      listForm.innerHTML += `
        <li for="${l.index}" class="list-group-item d-flex align-items-center justify-content-between p-3" id="list${l.index}">
          <div class="d-flex align-items-center gap-3">
            <input type="checkbox" class="form-check-input" id="${l.index}" ${l.completed ? 'checked' : ''} />
            <input maxlength="255" class="custom-input" value="${l.description}">
          </div>
          <i class="bi bi-three-dots-vertical cursor-pointer"></i>
        </li>`;
    });
};

showList(list);

listForm.innerHTML += '<li class="list-group-item text-center bg-light cursor-pointer p-3">Clear All Complete</li>';
