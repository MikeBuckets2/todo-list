import {getProjects} from "./app.js";
import {format} from 'date-fns';

const appDiv = document.querySelector('#app');

function renderProjects() {
    appDiv.innerHTML = '';

    getProjects().forEach((project, index) => {
        const div = document.createElement('div');
        div.textContent = project.name;
        div.dataset.index = index;
        appDiv.appendChild(div);
    });
};

function renderTodos(project) {
    project.todos.forEach(todo => {
        project.todos.forEach(todo => {
            const div = document.createElement('div');
            div.textContent = `${todo.title} - ${format(new Date(todo.dueDate), 'MMM dd')}`;
            appDiv.appendChild(div);
        });
    });
}

export {renderProjects};