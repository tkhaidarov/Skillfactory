import { CommentSystem } from './commentSystem.js';
import { Dropdown } from './dropdown.js';

document.addEventListener('DOMContentLoaded', () => {
   console.log('DOMContentLoaded');
   new CommentSystem();
   new Dropdown();
});
