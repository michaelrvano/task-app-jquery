var APP = APP || {};

var Task = function() {
	
}


APP = {
	current_view: 'standard',
	sort_order: 'latest',
	init: function() {
		$('[nav-button], [close-nav]').click(function() {
			$('nav').toggleClass('display');
		});
		console.log('Lets Go!');
		console.log(this);
	},
	getTemplate: function(name) {

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