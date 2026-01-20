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

function renderTodos(project) {
    project.todos.forEach(todo => {
        project.todos.forEach(todo => {
            const div = document.createElement('div');
            div.textContent = `${todo.title} - ${format(new Date(todo.dueDate), 'MMM dd')}`;
            appDiv.appendChild(div);
        });
    });
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