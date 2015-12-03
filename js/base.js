var APP = APP || {};

var Task = function() {
	
};

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
	init: function() {
		$('[nav-button], [close-nav]').click(function() {
			$('nav').toggleClass('display');
		});
		this.loadTemplates();
		this.loadCategories();
		this.loadTasks();
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
	loadTasks: function() {
		var post_data = {
			class: 'tasks',
			action: 'getTasks'
		};
		$.getJSON(this.url_api, post_data, function(data){
			if (!$.isEmptyObject(data)) 
			{
				$.each(data, function(k,v) {
					var task = new Task(v);
					APP.tasks.push(task);
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
	showTaskView: function() {

	},
	orderTasks: function() {
		
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