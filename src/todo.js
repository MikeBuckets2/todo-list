export function createTodo(
    title, 
    description, 
    dueDate, 
    priority, 
    notes = '', 
    checklist = []
) {
    return {
        title, 
        description, 
        dueDate, 
        priority, 
        notes, 
        checklist, 
        completed: false, 
        toggleComplete() {
            this.completed = !this.completed;
        },
        updatePriority(newPriority) {
            this.priority = newPriority;
        }
    };
}