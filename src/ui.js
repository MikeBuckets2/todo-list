import {getProjects} from "./app.js";

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

export {renderProjects};