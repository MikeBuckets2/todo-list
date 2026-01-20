import { de } from "date-fns/locale";
import {setCurrentProject, getCurrentProject, getProjects, saveApp, addProject} from "./app.js";
import {createTodo} from './todo.js';
import {format} from 'date-fns';

const app = document.querySelector('#app');

function render() {
    app.innerHTML = '';

    const layout = document.createElement('div');
    layout.classList.add('layout');

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    sidebar.appendChild(renderProjects());

    const main = document.createElement('div');
    main.classList.add('main');
    main.appendChild(renderTodoForm());
    main.appendChild(renderTodos());

    layout.append(sidebar, main);
    app.appendChild(layout);
}

function renderProjects() {
  const container = document.createElement('div');

  const form = document.createElement('form');
  form.classList.add('project-form');

  form.innerHTML = `
    <input name="projectName" placeholder="New Project" required />
    <button type="submit">Add</button>
  `;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = new FormData(form).get('projectName').trim();
    if (!name) return;

    addProject(name);
    setCurrentProject(getProjects().length - 1); // switch to new project
    saveApp();
    render();
  });

  container.appendChild(form);

  getProjects().forEach((project, index) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-item');

    const btn = document.createElement('button');
    btn.classList.add('project-btn');
    btn.textContent = project.name;

    if (getCurrentProject() === project) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
      setCurrentProject(index);
      render();
    });

    projectDiv.appendChild(btn);

    if (index !== 0) {
      const delBtn = document.createElement('button');
      delBtn.textContent = '×';
      delBtn.classList.add('project-delete-btn');
      delBtn.addEventListener('click', e => {
        e.stopPropagation();
        getProjects().splice(index, 1);

        if (getCurrentProject() === project) {
          setCurrentProject(0);
        }

        saveApp();
        render();
      });

      projectDiv.appendChild(delBtn);
    }

    container.appendChild(projectDiv);
  });

  return container;
}

function renderTodos() {
    const container = document.createElement('div');
    const project = getCurrentProject();

    project.todos.forEach((todo, index) => {
        const div = document.createElement('div');
        div.classList.add('todo', todo.priority.toLowerCase());
        
        if (todo.completed) {
            div.classList.add('completed');
        }

        div.appendChild(createTodoHeader(todo, index));
        container.appendChild(div);
    });

    return container;
}

function createTodoHeader(todo, index) {
    const header = document.createElement('div');

    const title = document.createElement('span');
    title.textContent = `${todo.title} (${format(
        new Date(todo.dueDate), 
        'MMM dd'
    )})`;

    header.appendChild(title);
    header.appendChild(createDeleteButton(todo));
    header.appendChild(createExpandButton(todo));

    return header;
}

function createDeleteButton(todo) {
    const btn = document.createElement('button');
    btn.textContent = 'Delete';

    btn.addEventListener('click', e => {
        e.stopPropagation();

        const project = getCurrentProject();
        const todoIndex = project.todos.indexOf(todo);

        if (todoIndex > -1) {
            project.removeTodo(todoIndex);
            saveApp();
            render();
        }
    });

    return btn;
}

function createExpandButton(todo) {
    const btn = document.createElement('button');
    btn.textContent = 'Details';

    btn.addEventListener('click', e => {
        e.stopPropagation();

        const parent = btn.parentElement;
        const existing = parent.querySelector('.todo-details');

        if (existing) {
            existing.remove();
        } else {
            parent.appendChild(renderTodoDetails(todo));
        }
    });

    return btn;
}

function renderTodoDetails(todo) {
    const details = document.createElement('div');
    details.classList.add('todo-details');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
        todo.toggleComplete();
        saveApp();
        render();
    });

    const priority = document.createElement('select');
    ['Low', 'Medium', 'High'].forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        option.selected = todo.priority === level;
        priority.appendChild(option);
    });

    priority.addEventListener('change', e => {
        todo.updatePriority(e.target.value);
        saveApp();
        render();
    });

    details.append(checkbox, priority);
    return details;
}

function renderTodoForm() {
    const form = document.createElement('form');

    form.innerHTML = `
    <input name ="title" placeholder="Title" required />
    <input type="date" name="dueDate" required /> 
    <select name="priority">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
    </select>
    <button>Add</button>
    `;

    form.addEventListener('submit', handleTodoSubmit);

    return form;
}

function handleTodoSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    const todo = createTodo(
        data.get('title'),
        '',
        data.get('dueDate'),
        data.get('priority')
    );

    getCurrentProject().addTodo(todo);
    saveApp();
    render();
}

export {render};