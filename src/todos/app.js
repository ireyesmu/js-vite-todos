import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';


const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedButton: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
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
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );

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


    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });


    filtersLIs.forEach( element => {

        element.addEventListener('click', ( event ) => {
            filtersLIs.forEach( el => el.classList.remove('selected'));
            event.target.classList.add('selected');

            switch( event.target.text ) {
                case 'Todos':
                    todoStore.setFilter( Filters.all )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.completed )
                break;
            }

            displayTodos();

        });
    });

    
}