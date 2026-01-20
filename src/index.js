import './styles.css';
import {addProject, getProjects, loadApp} from './app.js';
import {renderProjects} from './ui.js';

renderProjects();

loadApp();

if (getProjects().length === 0) {
    addProject('Default');
}