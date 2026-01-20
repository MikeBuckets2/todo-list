import {createProject} from './project.js';
import {createTodo} from './todo.js';
import {saveProjects, loadProjects} from './storage.js';

const projects = [];

function loadApp() {
    const stored = loadProjects();

    stored.forEach(projectData => {
        const project = createProject(projectData.name);

        projectData.todos.forEach(todoData => {
            const todo = createTodo(
                todoData.title, 
                todoData.description, 
                todoData.dueDate, 
                todoData.priority, 
                todoData.notes, 
                todoData.checklist
            );
            todo.completed = todoData.completed;
            project.addTodo(todo);
        });
        
        projects.push(project);
    });

    if (projects.length === 0) {
        addProject('Default');
    };
};

function saveApp() {
    saveProjects(projects);
};

function addProject(name) {
    projects.push(createProject(name));
    saveApp();
};

function getProjects() {
    return projects;
};

export {loadApp, saveApp, getProjects, addProject};