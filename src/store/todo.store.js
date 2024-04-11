import { Todo } from "../todos/models/todo.model";


const Filters = {
    all: 'all',
    completed: 'completed',
    pending: 'pending',
}


const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra de la realidad'),
    ],
    filter: Filters.all,
}


const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}


const loadStore = () => {
    if ( !localStorage.getItem('state') ) return;

    const { todos = [], filter = Filters.all } = JSON.parse( localStorage.getItem('state') ); // Se debe desestructurar para guardar las variables dentro del objeto declarado como constante
    state.todos = todos;
    state.filter = filter;
}


const saveStateToLocalStorage = () => {
    // console.log( JSON.stringify(state) ); // Convierte un objeto en strings tipo JSON
    localStorage.setItem('state',JSON.stringify(state));
}


/**
 * 
 * @param {String} filter 
 */
const getTodos = ( filter = Filters.all ) => {
    switch( filter ) {
        case Filters.all:
            return [...state.todos];
        case Filters.completed:
            return state.todos.filter( todo => todo.done );
        case Filters.pending:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    // El siguiente método no es el más eficiente, pues mapea todo el arreglo states
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );

    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.all ) => {
    if ( !Object.keys(Filters).includes(newFilter) ) throw new Error(`Filtro ${newFilter} is not valid`);
    state.filter = newFilter;

    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,    
    deleteCompleted,    
    deleteTodo, 
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,  
    toggleTodo, 
}