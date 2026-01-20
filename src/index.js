import './styles.css';
import {addProject, getProjects, loadApp} from './app.js';
import {render} from './ui.js';

loadApp();
render();

if (getProjects().length === 0) {
    addProject('Default');
}