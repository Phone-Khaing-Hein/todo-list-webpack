import './style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

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
  const listForm = document.getElementById('todoList');

  list
    .sort((a, b) => a.index - b.index)
    .forEach((l) => {
      listForm.innerHTML += `
        <li for="${l.index}" class="list-group-item d-flex align-items-center justify-content-between" id="list${l.index}">
          <div class="d-flex align-items-center gap-3">
            <input type="checkbox" class="form-check-input" id="${l.index}" ${l.completed ? 'checked' : ''} />
            <input maxlength="255" class="custom-input" value="${l.description}">
          </div>
          <i class="bi bi-three-dots-vertical"></i>
        </li>`;
    });
};

showList(list);
