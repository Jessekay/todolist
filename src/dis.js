import {
    getTodoList, removeItem, editItem, markCompleted,
  } from './todolist.js';
  
  const listContainer = document.querySelector('.list');
  const displayToDoList = (todoList) => {
    listContainer.innerHTML = '';
    todoList.forEach((item, index) => {
      const listItem = document.createElement('div');
      listItem.className = 'properties-list';
      listItem.innerHTML = `
            <div class="sides">
              <span class="items-left">
                <input type="checkbox" ${item.completed ? 'checked' : ''} data-index="${index}">
                <input type="text" value="${item.description}" class="input2">
              </span>
              <span class="items-right">
                <div class="edit-item" data-index="${index}"></div>
                <div class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></div>
              </span>
            </div>
            <hr class="line-one">
          `;
      const checkBox = listItem.querySelector('input[type="checkbox"]');
      checkBox.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        markCompleted(index);
        displayToDoList(getTodoList());
      });
      const description = listItem.querySelector('input[type="text"]');
      description.addEventListener('input', (event) => {
        const index = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').getAttribute('data-index');
        editItem(index, event.target.value);
      });
      description.addEventListener('blur', (event) => {
        const index = event.target.parentNode.parentNode.querySelector('input[type="checkbox"]').getAttribute('data-index');
        editItem(index, event.target.value);
        description.setAttribute('readonly', true);
        displayToDoList(getTodoList());
      });
      const editButton = listItem.querySelector('.edit-item');
      editButton.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        const descriptionInput = listItem.querySelector('input[type="text"]');
        descriptionInput[index].removeAttribute('readonly');
        descriptionInput[index].focus();
      });
      const removeButton = listItem.querySelector('.remove-item');
      removeButton.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        removeItem(index);
        displayToDoList(getTodoList());
      });
      listContainer.appendChild(listItem);
    });
  };
  export default displayToDoList;