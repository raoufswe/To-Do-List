'use strict'

// Fetch existing todos from localStorage
const getSavedTodos =  () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    }
    catch (e) {
        return []
    }    
}

// Save todos to localStorage
const saveTodos =  (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos =  (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
     
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter( (todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))


    if (filteredTodos.length >0) {
    filteredTodos.forEach( (todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })

    } else {

        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        document.querySelector('#todos').appendChild(messageEl)

    }
}

const removeTodo =  (id)=> {
    const toDoIndex = todos.findIndex( (todo)=> todo.id === id)
    if (toDoIndex > -1){
        todos.splice(toDoIndex, 1)
    }
}

/// change the checkbox state 

const toggleTodo =  (id) => {

    const findTheid = todos.find( (todo) => todo.id === id)
    if (findTheid) {
        findTheid.completed = !findTheid.completed
    }
}
// Get the DOM elements for an individual note
const generateTodoDOM =  (todo) => {
    const newEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const newText = document.createElement('span')
    const button = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', ()=>{

        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)

    })
    
    newText.textContent = todo.text
    containerEl.appendChild(newText)

    newEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    newEl.appendChild(containerEl)


    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    newEl.appendChild(button)
    button.addEventListener('click', function(){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return newEl
}

// Get the DOM elements for list summary
const generateSummaryDOM =  (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '': 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}