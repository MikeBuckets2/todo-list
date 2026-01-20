export function createProject(name) {
    const todos = [];

    return {
        name, 
        todos, 
        addTodo(todo) {
            todos.push(todo);
        },
        removeTodo(index) {
            todos.splice(index, 1);
        }
    };
}