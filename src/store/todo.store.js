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
    console.log(state);
    console.log('InitStore 🥑');
}


const loadStore = () => {
    throw new Error('Not implemented');
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
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done );
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.all ) => {
    if ( !Object.keys(Filters).includes(newFilter) ) throw new Error(`Filtro ${newFilter} is not valid`);
    state.filter = newFilter;
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