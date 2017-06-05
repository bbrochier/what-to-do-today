// Setup Firebase (see js/config.js)
// var config = {
//     apiKey: "xxxxxxx",
//     authDomain: "xxxxxxx.firebaseapp.com",
//     databaseURL: "https://xxxxxxx.firebaseio.com",
//     projectId: "xxxxxxx",
//     storageBucket: "xxxxxxx.appspot.com",
//     messagingSenderId: "xxxxxxx"
//   };

firebase.initializeApp(config);

var todosRef = firebase.database().ref('todos');

// Vue
var app = new Vue({
  el: '#app',

  data: {
    version: '1.0',
    newTodo: {
      created: '',
      updated: '',
      updating: false,
      status: 'todo',
      title: '',
      description: '',
      location: '',
      dates: '',
      duration: '',
      links: '',
      price: '',
      tags: '',
      photos: '',
      rating: '0'
    }
  },

  firebase: {
    todos: todosRef
  },

  methods: {
    addTodo: function() {
      //add created date
      this.newTodo.created = Date.now();
      this.newTodo.updating = false;

      //split tags
      var tags = this.newTodo.tags;
      this.newTodo.tags = tags.replace(/, /g, ',').replace(/ ,/g, ',').split(',');

      //push data
      todosRef.push(this.newTodo);

      //reset display
      this.newTodo.title = '';
      this.newTodo.description = '';
      this.newTodo.location = '';
      this.newTodo.dates = '';
      this.newTodo.duration = '';
      this.newTodo.links = '';
      this.newTodo.price = '';
      this.newTodo.tags = '';
      this.newTodo.photos = '';
      this.newTodo.status = 'todo';
      this.newTodo.rating = '0';
    },

    toggleUpdate: function(todo) {
      todo.updating = !todo.updating;
    },

    updateTodo: function(todo) {
      todosRef.child(todo['.key']).child('updated').set(Date.now());
      todosRef.child(todo['.key']).child('title').set(todo.title);
      todosRef.child(todo['.key']).child('description').set(todo.description);
      todosRef.child(todo['.key']).child('location').set(todo.location);
      todosRef.child(todo['.key']).child('dates').set(todo.dates);
      todosRef.child(todo['.key']).child('duration').set(todo.duration);
      todosRef.child(todo['.key']).child('links').set(todo.links);
      todosRef.child(todo['.key']).child('price').set(todo.price);
      todosRef.child(todo['.key']).child('status').set(todo.status);
      //split tags
      var tags = todo.tags;
      todo.tags = tags.replace(/, /g, ',').replace(/ ,/g, ',').split(',');
      todosRef.child(todo['.key']).child('tags').set(todo.tags);
    },

    removeTodo: function(todo) {
      todosRef.child(todo['.key']).remove();
    }
  }
});
