import {setCurrentProject, getCurrentProject, getProjects, saveApp} from "./app.js";
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

function renderTodoDetails(todo) {
    const details = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
        todo.toggleComplete();
        saveApp();
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