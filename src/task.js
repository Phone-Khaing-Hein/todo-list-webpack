import changeStatus from './status.js';

const initUI = () => {
  const test = document.getElementById('test');
  test.remove();
  const body = document.getElementsByTagName('body')[0];
  const ul = document.createElement('ul');
  ul.classList = 'list-group shadow';
  ul.id = 'todoList';
  const li1 = document.createElement('li');
  li1.classList = 'list-group-item d-flex align-items-center justify-content-between p-3';
  const span = document.createElement('span');
  span.innerHTML = "Today's To Do";
  const rotate = document.createElement('i');
  rotate.classList = 'fa-solid fa-rotate fa-lg cursor-pointer';
  rotate.style = 'color: #000000;';
  li1.appendChild(span);
  li1.appendChild(rotate);
  const li2 = document.createElement('li');
  li2.classList = 'list-group-item d-flex align-items-start justify-content-between p-3';
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'task';
  input.classList = 'custom-input';
  input.placeholder = 'Add your list ...';
  li2.appendChild(input);
  const addBtn = document.createElement('i');
  addBtn.classList = 'fa-solid fa-arrow-turn-down fa-rotate-90 cursor-pointer';
  addBtn.style = 'color: #000000;';
  addBtn.id = 'add';
  const parentDiv = document.createElement('div');
  parentDiv.id = 'taskList';
  li2.appendChild(addBtn);
  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(parentDiv);
  body.appendChild(ul);
  const listForm = document.getElementById('todoList');
  const completeBtn = document.createElement('li');
  completeBtn.classList = 'list-group-item text-center bg-light cursor-pointer p-3';
  completeBtn.innerHTML = 'Clear All Complete';
  completeBtn.id = 'clearCompleted';
  listForm.appendChild(completeBtn);
};

const resetIndex = (list) => {
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i + 1;
  }
};

const showList = () => {
  const list = JSON.parse(localStorage.getItem('todos')) || [];
  const parentDiv = document.getElementById('taskList');
  parentDiv.innerHTML = '';
  list
    .sort((a, b) => a.index - b.index)
    .forEach((l) => {
      const li3 = document.createElement('li');
      li3.classList = 'list-group-item d-flex align-items-center justify-content-between p-3';
      li3.id = `list${l.index}`;
      const div = document.createElement('div');
      div.classList = 'd-flex align-items-center gap-3';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.classList = 'form-check-input';
      input.id = `checkbox${l.index}`;
      if (l.complete) {
        input.setAttribute('checked', true);
      }
      div.appendChild(input);
      const input2 = document.createElement('input');
      input2.maxLength = 255;
      input2.classList = 'custom-input';
      input2.id = `edit${l.index}`;
      input2.setAttribute('value', l.description);
      div.appendChild(input2);
      li3.appendChild(div);
      const icon = document.createElement('i');
      icon.classList = 'fas fa-ellipsis-v vertical-icon cursor-pointer';
      icon.id = `dropdownMenuButton${l.index}`;
      icon.setAttribute('data-bs-toggle', 'dropdown');
      icon.setAttribute('aria-expanded', 'false');
      const dropdown = document.createElement('ul');
      dropdown.classList = 'dropdown-menu';
      dropdown.setAttribute('aria-labelledby', `dropdownMenuButton${l.index}`);
      const dropList = document.createElement('li');
      dropList.classList = 'dropdown-item fa-regular fa-trash-can';
      dropList.style = 'color: #000000;';
      dropList.id = `remove${l.index}`;
      dropdown.appendChild(dropList);
      li3.appendChild(icon);
      li3.appendChild(dropdown);
      parentDiv.appendChild(li3);
    });

  list.forEach((l) => {
    document
      .getElementById(`remove${l.index}`)
      .addEventListener('click', () => {
        list.splice(list.indexOf(l), 1);
        resetIndex(list);
        localStorage.setItem('todos', JSON.stringify(list));
        showList(list);
      });
  });

  list.forEach((l) => {
    document
      .getElementById(`edit${l.index}`)
      .addEventListener('change', (e) => {
        list[list.indexOf(l)] = { ...l, description: e.target.value };
        localStorage.setItem('todos', JSON.stringify(list));
        showList(list);
      });
  });

  list.forEach((l) => {
    const checkbox = document.getElementById(`checkbox${l.index}`);
    const editElement = document.getElementById(`edit${l.index}`);
    checkbox.addEventListener('change', () => {
      changeStatus(list.indexOf(l), checkbox, editElement);
    });
  });
};

const addbook = (todo) => {
  const list = JSON.parse(localStorage.getItem('todos')) || [];
  if (todo.trim().length !== 0) {
    const task = {
      description: todo.trim(),
      completed: false,
      index: list.length + 1,
    };
    list.push(task);
    localStorage.setItem('todos', JSON.stringify(list));
    showList(list);
  }
};

const clearCompleted = () => {
  let list = JSON.parse(localStorage.getItem('todos')) || [];
  list = list.filter((l) => !l.completed);
  resetIndex(list);
  localStorage.setItem('todos', JSON.stringify(list));
  showList(list);
};

export {
  addbook, showList, initUI, clearCompleted,
};
