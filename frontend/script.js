const apiUrl = 'http://localhost:8000/tasks';
let allTasks = [];

// async function fetchTasks() {
//     const res = await fetch(apiUrl);
//     allTasks = await res.json();
//     renderTasks(allTasks);
// }

async function fetchTasks() {
    const res = await fetch(apiUrl);
    allTasks = await res.json();
    console.log("Fetched tasks:", allTasks);  // 🔍 Lihat isinya
    applyFilters();
}

function renderTasks(tasks) {
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.onclick = (e) => {
            e.stopPropagation();
            toggleTask(task.id, checkbox.checked);
        };

        // Span title
        const span = document.createElement('span');
        span.textContent = task.title;
        span.onclick = () => toggleTask(task.id, !task.done);

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.className = 'edit';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            renderEditMode(li, task);
        };

        // Delete Button
        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑️';
        delBtn.className = 'delete';
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function renderEditMode(li, task) {
    li.innerHTML = '';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.title;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = '✅';
    saveBtn.className = 'save';
    saveBtn.onclick = async () => {
        await fetch(`${apiUrl}/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: input.value })
        });
        fetchTasks();
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '❌';
    cancelBtn.onclick = () => fetchTasks();

    li.appendChild(input);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);
}

async function addTask() {
    const input = document.getElementById('new-task');
    const pushoverCheckbox = document.getElementById('pushover');
    const pushover = pushoverCheckbox ? pushoverCheckbox.checked : false;

    const task = {
        id: Date.now(),
        title: input.value,
        done: false,
        pushover: pushover
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });

    input.value = '';
    if (pushoverCheckbox) pushoverCheckbox.checked = false;
    fetchTasks();
}

async function toggleTask(id, done) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: done })
    });
    console.log(`Toggled task ${id} to ${done}`);
    fetchTasks();
}



async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchTasks();
}


document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();

    // Pencarian
    const searchInput = document.getElementById('search-task');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    // Dropdown filter
    const filterSelect = document.getElementById('filter-status');
    if (filterSelect) {
        filterSelect.addEventListener('change', applyFilters);
    }
});


// document.addEventListener('DOMContentLoaded', () => {
//     fetchTasks();

    // Optional search & filter (kalau ada di HTML-mu)
//     const searchInput = document.getElementById('search-task');
//     const filterDone = document.getElementById('filter-done');

//     if (searchInput) {
//         searchInput.addEventListener('input', applyFilters);
//     }
//     if (filterDone) {
//         filterDone.addEventListener('change', applyFilters);
//     }
// });

// function applyFilters() {
//     const search = document.getElementById('search-task')?.value.toLowerCase() || '';
//     const showDoneOnly = document.getElementById('filter-done')?.checked;

//     let filtered = allTasks;

//     if (search) {
//         filtered = filtered.filter(t => t.title.toLowerCase().includes(search));
//     }

//     if (showDoneOnly) {
//         filtered = filtered.filter(t => t.done);
//     }

//     renderTasks(filtered);
// }

function applyFilters() {
    const search = document.getElementById('search-task')?.value.toLowerCase() || '';
    const status = document.getElementById('filter-status')?.value;

    let filtered = allTasks;

    if (search) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(search));
    }

    if (status === 'active') {
        filtered = filtered.filter(t => !t.done);
    } else if (status === 'done') {
        filtered = filtered.filter(t => t.done);
    }

    renderTasks(filtered);
}



