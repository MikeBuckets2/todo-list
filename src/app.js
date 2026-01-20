import {createProject} from './project.js';

const projects = [];

function getProjects() {
    return projects;
};

function addProject(name) {
    projects.push(createProject(name));
};

function getProject(index) {
    return projects[index];
};

export {getProjects, addProject, getProject};