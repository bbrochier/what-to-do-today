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
    updating: '',
    newTodo: {
      created: '',
      updated: '',
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
      rating: 0,
      comment: ''
    }
  },

  firebase: {
    todos: todosRef
  },

  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    truncate: function(value, limit) {
      truncValue = value.substring(0, Math.min(limit, value.length));
      if (value.length > limit) {
        truncValue = truncValue + '...';
      }
      return truncValue;
    }
  },

  methods: {
    addTodo: function() {
      //add created date
      this.newTodo.created = Date.now();
      this.newTodo.updated = Date.now();

      //split tags
      var tags = this.newTodo.tags;
      this.newTodo.tags = tags.replace(/(^,)|(,$)/g, '').replace(/ , /g, ',').replace(/, /g, ',').replace(/ ,/g, ',').split(',');

      //push data
      todosRef.push(this.newTodo);

      //notification
      toastr.success('"' + this.newTodo.title + '" added !');

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
      this.newTodo.rating = 0;
      this.newTodo.comment = '';
    },

    openUpdate: function(todo) {
      this.updating = todo['.key'];
    },

    closeUpdate: function(todo) {
      this.updating = '';
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
      todosRef.child(todo['.key']).child('rating').set(todo.rating);
      todosRef.child(todo['.key']).child('comment').set(todo.comment);
      
      //split tags
      var todotags = todo.tags.toString();
      //remove trailing commas and split on commas
      todo.tags = todotags.replace(/(^,)|(,$)/g, '').replace(/ , /g, ',').replace(/, /g, ',').replace(/ ,/g, ',').split(',');
      //set to firebase
      todosRef.child(todo['.key']).child('tags').set(todo.tags);
      
      //close edit
      this.updating = '';

      //notification
      toastr.success('"' + todo.title + '" updated !');
    },

    removeTodo: function(todo) {
      todosRef.child(todo['.key']).remove();
      //clean local variable
      this.updating = '';
    }
  }
});
