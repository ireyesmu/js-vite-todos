import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./";

let element; // Para evitar el querySelector cada vez que se llama renderTodos

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {

    // Verifica que exista element, si no existe, lo define
    if ( !element )
        element = document.querySelector( elementId );

    if ( !element ) throw Error(`Element ${ elementId } not found`);

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHTML( todo ) );
    });
}