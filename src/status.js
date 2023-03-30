const changeStatus = (id, checkboxElement, editElement) => {
  const list = JSON.parse(localStorage.getItem('todos')) || [];
  if (checkboxElement.hasAttribute('checked')) {
    checkboxElement.checked = false;
    list[id].completed = false;
    localStorage.setItem('todos', JSON.stringify(list));
    editElement.removeAttribute('style');
    checkboxElement.removeAttribute('checked');
  } else {
    checkboxElement.checked = true;
    list[id].completed = true;
    localStorage.setItem('todos', JSON.stringify(list));
    editElement.style = 'text-decoration: line-through;';
    checkboxElement.setAttribute('checked', true);
  }
};

export default changeStatus;
