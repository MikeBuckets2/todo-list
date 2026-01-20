import './styles.css';
import {addProject, getProjects, loadApp} from './app.js';

loadApp();

if (getProjects().length === 0) {
    addProject('Default');
}