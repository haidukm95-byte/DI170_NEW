import { TodoList } from "./todo.js";
const list= new TodoList('My Tasks');

list.addTask('Finish homework');
list.addTask('Submit homework to GitHub');
list.addTask('Go to work tomorrow');
list.addTask('Delete CS 1.6');

list.displayAll();

list.taskDone('Delete CS 1.6');
list.taskDone('Finish homework');

list.displayAll();

list.removeTaskDone('Delete CS 1.6');
list.removeTaskPending('Finish homework');

list.removeTaskPending('Finish homework');

list.removeAllDone();
list.displayAll();
list.removeAllPending();
list.displayAll();

list.addTask('Buy groceries');
list.addTask('Launch washing machine');
list.addTask('Wash dishes');
list.addTask('Clean up the room');

list.taskDone('Buy groceries');
list.displayAll();

list.removeAll();
list.displayAll();