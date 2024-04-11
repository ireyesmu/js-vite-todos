import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
    }

    // Cuando la función App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append ( app );
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );

    // ========= Listeners =========
    newDescriptionInput.addEventListener('keyup', ( event ) => {

        // Validaciones de input
        if ( event.key !== 'Enter' ) return;
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    
    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        // console.log( event.target );

        // Togglear un Todo
        if ( event.target.getAttribute('type') == 'checkbox' ) {
            todoStore.toggleTodo( element.getAttribute('data-id') );
        }
        
        // Eliminar un Todo
        if ( event.target.getAttribute('class') == 'destroy' ) {
            todoStore.deleteTodo( element.getAttribute('data-id') );
        }

        displayTodos();
    });

    
}