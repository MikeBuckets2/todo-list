import {setCurrentProject, getCurrentProject, getProjects, saveApp} from "./app.js";
import {createTodo} from './todo.js';
import {format} from 'date-fns';

const app = document.querySelector('#app');

function render() {
    app.innerHTML = '';

    app.appendChild(renderProjects());
    app.appendChild(renderTodoForm());
    app.appendChild(renderTodos());
}

function renderProjects() {
    const container = document.createElement('div');

    getProjects().forEach((project, index) => {
        const btn = document.createElement('button');
        btn.textContent = project.name;

        btn.addEventListener('click', () => {
            setCurrentProject(index);
            render();
        });

        container.appendChild(btn);
    });

    return container;
}

function renderTodoForm() {
    const form = document.createElement('form');

    form.innerHTML = `
    <input name ="title" placeholder="Title required />
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

function renderTodos() {
    const container = document.createElement('div');
    const project = getCurrentProject();

    project.todos.forEach((todo, index) => {
        const div = document.createElement('div');
        div.classList.add('todo');

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
    header.appendChild(createDeleteButton(index));
    header.appendChild(createExpandButton(todo));

    return header;
}

function createDeleteButton(index) {
    const btn = document.createElement('button');
    btn.textContent = 'Delete';

    btn.addEventListener('click', () => {
        getCurrentProject(),removeTodo(index);
        saveApp();
        render();
    });

    return btn;
}

function createExpandButton(todo) {
    const btn = document.createElement('button');
    btn.textContent = 'Details';

    btn.addEventListener('click', () => {
        btn.parentElement.appendChild(renderTodoDetails(todo));
    });

    return btn;
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