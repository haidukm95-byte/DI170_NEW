//Exercise 4: Todo List using ES6 module syntax
//Instructions

//Create a directory named todoApp.
//Inside the todoApp directory, create two files: todo.js and app.js.
//In todo.js, define an ES6 module that exports a TodoList class.
//The TodoList class should have methods to add tasks, mark tasks as complete, and list all tasks.
//Export the TodoList class.
//In app.js, import the TodoList class from the todo.js module.
//Create an instance of the TodoList class.
//Add a few tasks, mark some as complete, and list all tasks.
//Run app.js and verify that the todo list operations are working correctly.

export class TodoList{
    constructor(name){
        this.name=name;
        this.listPending=[];
        this.listDone=[];
    };
    addTask(name){
        this.listPending.push(name);
        console.log(`Task \'${name}\' has been succesfully added!`);
    };
    taskDone(name){
        const idx = this.listPending.indexOf(name);
        if(idx!==-1){
            this.listDone.push(name);
            this.listPending.splice(idx, 1);
            console.log(`Task ${name} has been completed.`);
        };
    };
    displayAll(){
        if(this.listPending.length===0 && this.listDone.length===0){
            console.log('Task list is empty!')
        } else {
            if(this.listPending.length===0){
                console.log('No pending tasks!');
            } else {console.log(`Tasks pending: ${this.listPending}`);};
            if(this.listDone.length===0){
            console.log('No done tasks yet!');
            } else {console.log(`Tasks done: ${this.listDone}`);};
        };
        
        
    };
    removeTaskPending(name){
        const idx = this.listPending.indexOf(name);
        if(idx!==-1){
            this.listPending.splice(idx, 1);
            console.log(`Task \'${name}\' has been removed from the pending list.`)
        } else {console.log('Task is not present in the list!')};
    };
    removeTaskDone(name){
        const idx = this.listDone.indexOf(name);
        if(idx!==-1){
            this.listDone.splice(idx, 1);
            console.log(`Task\'${name}\' has been removed from the done list.`)
        } else {console.log('Task is not present in the list!')}
    };
    removeAllPending(){
        this.listPending=[];
        console.log('All pending tasks have been successfully removed!');
    };
    removeAllDone(){
        this.listDone=[];
        console.log('All done tasks have been succesfully removed!');
    };
    removeAll(){
        this.listPending=[];
        this.listDone=[];
        console.log('Task list has been successfully cleared!');
    };
    };

