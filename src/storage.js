const STORAGE_KEY = 'todo-projects';

function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
};

export {saveProjects, loadProjects};