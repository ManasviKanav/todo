window.addEventListener('load' , () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newtodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })
    //this will help to put your name at the start of the to do list

    newtodoForm.addEventListener('submit', e =>{
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            //an input named content(html) is being targeted here
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        //json.stringify to convertit into a strinng
        //local storage only allows you to save primitive values in it- like string int number etc.

        e.target.reset();
        //resetting so that its no longer filled out now

        DisplayTodos();
    })
    
})
// JSON.parse()to convert text into a JavaScript object
//todos is a global variable because we didn't declare it using let, const etc.

function DisplayTodos(){
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if(todo.category == 'personal'){
            span.classList.add('personal');
        }
        else{
            span.classList.add('business');
        }
        
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML='Edit';
        deleteButton.innerHTML='Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if(todo.done){
            todoItem.classList.add('done');
        }

        input.addEventListener('click'  , e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add('done');
            }
            else{
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', e =>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur' , e => {
                input.setAttribute('readOnly' , true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })
        deleteButton.addEventListener('click' , e =>{
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    })
}