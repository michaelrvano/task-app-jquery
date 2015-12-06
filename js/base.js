var APP = APP || {};

/* ========================
	Task Class
==========================*/
var Task = function(data) {
	var _this = this;
	_this.id = data.id;
	_this.background_color = data.background_color;
	_this.category_name = data.category;
	_this.category_id = data.category_id;
	_this.date_created = data.date_created;
	_this.description = data.description;
	_this.is_complete = data.is_complete;
	_this.title = data.title;
	_this.buildHTML();
};
Task.prototype.buildHTML = function() {
	var _this = this;
	if (typeof APP.templates['task'] !== typeof undefined)
	{
		_this.html = APP.templates['task'].clone(true);
	}
};

/* ========================
	Task Form Class
==========================*/
var TaskForm = function(data) {
	var _this = this;
	_this.buildHTML();
	APP.popout.addClass('display');
};
TaskForm.prototype.loadCategories = function() {
	var _this = this;
	var target = _this.html.find('[categories]');
	if (APP.categories.length > 0)
	{
		target.html('<option value="">Select Category</option>');
		for(i=0; i < APP.categories.length; i++)
		{
			var category = APP.categories[i];
			var option = '<option value="'+category.id+'">'+category.name+'</option>';
			target.append(option);
		}
	}
};
TaskForm.prototype.buildHTML = function() {
	var _this = this;
	var target = $('[popout] [content]');
	_this.html = APP.templates['task-form'].clone(true);
	_this.loadCategories();
	if (typeof _this.id !== typeof undefined && _this.id != '') 
	{
		_this.html.find('[title]').html('<i class="fa fa-edit"></i> Edit Task');
		_this.html.find('button').html('Edit Task');
	}
	else
	{
		_this.html.find('[title]').html('<i class="fa fa-plus"></i> Add Task');
		_this.html.find('button').html('Add Task');
	}
	_this.html.find('button').click(function() { _this.prepare(); });
	target.html(_this.html);
	APP.formEffects();
};
TaskForm.prototype.prepare = function() {
	var _this = this;
	var _html = _this.html;
	_this.name = _html.find('[name]').val();
	_this.description = _html.find('[description]').val();
	_this.category = _html.find('[categories]').val();
	_this.validate();
};
TaskForm.prototype.validate = function() {
	var _this = this;
	_this.valid = true;
	if (_this.category == '') {
		_this.html.find('[categories]').addClass('error');
		_this.valid = false;
	}
	else {
		_this.html.find('[name]').removeClass('error');
	} 
	if (_this.name == '') {
		_this.html.find('[name]').addClass('error');
		_this.valid = false;
	}
	else {
		_this.html.find('[name]').removeClass('error'); 
	} 
	if (_this.description == '') {
		_this.html.find('[description]').addClass('error');
		_this.valid = false;
	}
	else {
		_this.html.find('[description]').removeClass('error');
	}
	if (_this.valid)
	{
		_this.html.find('[error-message]').hide();
		_this.submit();
	}
	else
	{
		_this.showError('All fields are required');
		
	}
}
TaskForm.prototype.submit = function() {
	var _this = this;
	var button = _this.html.find('button');
	var button_text = button.html();
	button.html(APP.saving);
	if (typeof _this.id !== typeof undefined && _this.id != '')
	{
	}
	else {
		var post_data = {
			class: 'tasks',
			action: 'addTask',
			options: {
				name: _this.name,
				description: _this.description,
				category: _this.category
			}
		};
		$.post(APP.url_api, post_data, function(data){
			if (!$.isEmptyObject(data)) 
			{
				if (!data.error)
				{
					_this.id = data.id;
					APP.loadTasks();
					APP.popout.removeClass('display');
					_this.html.html('');
					_this.html.find('[error-message]').hide();
				}
				else
				{
					_this.showError('There was an error in saving this task. Please try again');
				}
			}
		},'JSON');
	}
}
TaskForm.prototype.showError = function(message) {
	_this.html.find('[error-message]').html(message);
	_this.html.find('[error-message]').show();
}
// TaskForm.prototype.getTask = function() {
// 	var _this = this;
// 	if (typeof _this.id !== typeof undefined && _this.id != '')
// 	{
// 		var post_data = {
// 			class: 'tasks',
// 			action: 'getTasks',
// 			options: { id: _this.id }
// 		};
// 		$.post(APP.url_api, post_data, function(data){
// 			if (!$.isEmptyObject(data))
// 			{
// 				var task = new Task();
// 				console.log(data[0]);
// 			}
// 		},'JSON');
// 	}
// }

/* ========================
	Category Class
==========================*/
var Category = function(v) {
	this.id = v.id;	
	this.name = v.name;
	this.font_color = v.font_color;
	this.color = v.color;
	this.buildHTML();
};
Category.prototype.buildHTML = function() {
	if (typeof APP.templates['category'] !== typeof undefined)
	{
		var styles = '';
		var $html = APP.templates['category'].clone(true);
		$html.find('[name]').html(this.name);
		if (this.color != '') {styles += 'background-color:'+this.color+'; '}
		if (this.font_color != '') {styles += 'color:'+this.font_color+'; '}
		$html.find('[colors]').attr('style', styles);
		this.html = $html;
	}
	else
	{
		console.log('No HTML template defined for the category');
	}
};
Category.prototype.editBGColor = function() {

};


APP = {
	current_view: 'standard',
	sort_order: 'latest',
	url_api: '/api/',
	templates: [],
	categories: [],
	tasks: [],
	saving: 'Saving...<i class="fa fa-circle-o-notch fa-spin"></i>',
	popout: $('[popout]'),
	init: function() {
		$('[nav-button], [close-nav]').click(function() {
			$('nav').toggleClass('display');
		});
		$('[close-popout]').click(function() {
			APP.popout.removeClass('display');
		});
		$('[add-task]').click(function() {
			new TaskForm();
		});
		this.loadTemplates();
		this.loadCategories();
		this.loadTasks();
		window.addEventListener('mouseup', this.clickEffect.bind(this), true);
		console.log('Lets Go!');
	},
	loadCategories: function() {
		var post_data = {
			class: 'tasks',
			action: 'getCategory'
		};
		$.getJSON(this.url_api, post_data, function(data){
			if (!$.isEmptyObject(data)) 
			{
				$.each(data, function(k,v) {
					var category = new Category(v);
					APP.categories.push(category);
				});
				APP.displayCategories();
			}
		});
	},
	displayCategories: function() {
		console.log('Displaying Categories!');
		var $target = $('[category-legend]');
		if (this.categories.length > 0)
		{
			for(i=0; i < this.categories.length; i++) {
				if (i == 0) 
				{
					$target.html(this.categories[i].html);	
				}
				else
				{
					$target.append(this.categories[i].html);
				}
			};
		}
		else
		{
			$target.html('No Categories');
		}
	},
	loadTasks: function() {
		var _this = this;
		var post_data = {
			class: 'tasks',
			action: 'getTasks'
		};
		$.getJSON(_this.url_api, post_data, function(data){
			if (!$.isEmptyObject(data)) 
			{
				$.each(data, function(k,v) {
					var task = new Task(v);
					_this.tasks.push(task);
				});
				_this.displayTasks();
			}
		});
	},
	displayTasks: function() {
		console.log('Displaying Tasks!');
		var _this = this;
		var $target = $('[tasks]');
		$target.html('');
		if (_this.tasks.length > 0)
		{
			for(i=0; i<_this.tasks.length; i++)
			{
				var task = _this.tasks[i];
				if (task.is_complete == 1) { continue; }
				else 
				{

				}
			}
		}
	},
	displayCompleteTasks: function() {
		console.log('Displaying Completed Tasks!');
		var $target = $('[tasks]');
		if (this.tasks.length > 0)
		{

		}
		else
		{

		}
	},
	loadTemplates: function() {
		console.log('Loading Templates');
		var $templates = $('[template]');
		if ($templates.length > 0)
		{
			for(i=0; i<$templates.length; i++)
			{
				var $obj = $($templates[i]);
				var name = $obj.attr('template');
				$obj.removeAttr('template');
				this.templates[name] = $obj;
				$obj.remove();
			};
		}
	},
	formEffects: function() {
		$('[custom-form] input[type="text"], [custom-form] textarea, [custom-form] select').blur(function() {
			if ($(this).val() != '') { $(this).addClass('active'); $(this).removeClass('error'); }
			else { $(this).removeClass('active'); }
		});
	},
	showTaskView: function() {

	},
	orderTasks: function() {
		
	},
	clickEffect: function(e) {
		var target = $('[clicked]');
		var top = e.clientY-5;
		var left = e.clientX-5;
		var style = 'top:'+top+'px; left:'+left+'px';
		target.attr('style', style);
		target.addClass('animate');
		setTimeout(function() {
			target.removeClass('animate');
		}, 310);		
	}
};




APP.init();

// var VANO = VANO || {};

// VANO = {
// 	init: function () {
// 		var something = 'Asadfasda';
// 		$('[show-info]').unbind('click').click(function() {
// 			console.log('asdfasdfa');
// 			var el = $(this);
// 			if (el.hasClass('paused'))
// 			{
// 				el.removeClass('paused');	
// 			}
// 			else
// 			{
// 				el.addClass('paused');		
// 			}
// 		});
// 		return something;
// 	},
// }

// var Person = function(firstName) {
// 	this.firstName = firstName;
// 	this.age = 10;
// };

// Person.prototype.walk = function() {
// 	console.log(this.firstName + ' is starting to walk');
// }
// Person.prototype.sayHello = function() {
// 	console.log("Hello, I'm "+ this.firstName + " and I'm " + this.age + " years old");
// }


// function Student(firstName, subject) {
// 	Person.call(this, firstName);

// 	this.subject = subject;
// }

// Student.prototype = Object.create(Person.prototype);

// Student.prototype.constructor = Student;

// Student.prototype.sayHello = function() {
// 	console.log("Hello, I'm "+this.firstName+". I'm studying " + this.subject+ '.');
// }

// Student.prototype.sayGoodbye = function() {
// 	console.log('Goodbye!');
// }

// var student1 = new Student('Sherycl', 'Applied Physics');
// student1.sayHello();
// student1.walk();
// student1.sayGoodbye();

// console.log(student1 instanceof Person);
// console.log(student1 instanceof Student);


// var person1 = new Person('Alice');
// var person2 = new Person('Bob');
// var helloFunction = person1.sayHello;

// // person1.sayHello();
// // person2.sayHello();

// helloFunction();

// console.log(helloFunction === person1.sayHello);

// console.log(helloFunction === Person.prototype.sayHello);

// helloFunction.call(person1);