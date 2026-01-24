let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (localStorage.getItem('tasks')) {
		JSON.parse(localStorage.getItem('tasks')).forEach(function(key) {
			listElement.append(createItem(key));
		})
	} else {
		items.forEach(function(key) {
			listElement.append(createItem(key));
		});
	};
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");
  	textElement.textContent = item;
	
  	deleteButton.addEventListener('click', function() {
		clone.remove(textElement);
		const items = getTasksFromDOM();
		saveTasks(items);
  	});
  
  	duplicateButton.addEventListener('click', function() {
		const newItem = createItem(item);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
  	});
  
  	editButton.addEventListener('click', function() {
		textElement.setAttribute('contenteditable', true);
		textElement.focus();
  	});
  
  	textElement.addEventListener('blur', function() {
		textElement.setAttribute('contenteditable', false);
		const items = getTasksFromDOM();
		saveTasks(items);
  	});
  
  	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach(function(key) {
		tasks.push(key.textContent);
	})

	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasks();

formElement.addEventListener('submit', function(evt) {
	evt.preventDefault();

	taskValue = inputElement.value;
	listElement.prepend(createItem(taskValue));
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
})