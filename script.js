let id = 0;
let tasks = {};

const onLoad = () => {
    
    console.log(tasks);
    let t = Cookies.get('tasks');
    if (t) {
        tasks = JSON.parse(t);
        for (let key in tasks) {
            id = Number(key);
            t = tasks[key].task
            s = tasks[key].status

            writeTasks(id, t, s);
        }
    }
}


const create = () => {
    // Get value from form
    let task = document.getElementById('task').value;
    if (!task.trim()) return;
    console.log(tasks);
    id++;
    tasks[id] = {
        'task': task,
        'status': 'pending'
    }
    Cookies.set('tasks', JSON.stringify(tasks));

    writeTasks(id, task, 'pending');
   
    // reset form
    document.forms['new-task'].reset();


}

const writeTasks = (num, task, stat) => {
    // get parent form
    let ul  = document.getElementById('todo-list');

    // create element for checkbox list
    let li = document.createElement('li');
    let input = document.createElement('input');
    let label = document.createElement('label');
    let br = document.createElement('br');
    let todoTask = document.createTextNode(task);

    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', num);
    label.setAttribute('for', num);

    if (stat === 'completed') input.checked = true;

    label.appendChild(todoTask);

    input.addEventListener('change', function() {
        tasks[num].status = this.checked ? 'completed' : 'pending';
        Cookies.set('tasks', JSON.stringify(tasks));
        console.log(`Task ${num} status:`, tasks[num].status);

        if (this.checked) {
            label.classList.add('completed');
        } else {
            label.classList.remove('completed');
            input.style.backgroundcolor = "transparent";
        }

    });

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(br);
    ul.appendChild(li);
}

