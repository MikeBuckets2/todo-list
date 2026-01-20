import './styles.css';
import {addProject, getProjects} from './app.js';

if (getProjects().length === 0) {
    addProject('Default');
}