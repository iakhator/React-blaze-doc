# Form and Events

## Task Form

**Blaze Form**

`import/ui/body.html`

```handlebars{7-9}
<!-- Add form input -->
<body>
  <div>
    <header>
      <h1>Todo List</h1>
    </header>
    <form class="new-task">
      <input type="text" name="text" placeholder="Type to add new tasks" />
    </form>
    <ul>
      {{#each tasks}}
        {{> task}}
      {{/each}}
    </ul>
  </div>
</body>
  
<template name="task">
  <li>{{text}}</li>
</template>
```

**React Form**

:::tip
We will create a form component and use the `useState` hook. `[text, setText]` is an array destructure where where text is the stored value which we want to use, which in this case will be a string; and setText is a function used to update that value.
:::
`imports/ui/TaskForm.jsx`

```jsx
import React, { useState } from 'react';
 
export const TaskForm = () => {
  const [text, setText] = useState("");
 
  return (
    <form className="task-form">
      <input
        type="text"
        placeholder="Type to add new tasks"
      />
 
      <button type="submit">Add Task</button>
    </form>
  );
};
```

`imports/ui/App.jsx`

```jsx{4,13}
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from './TaskForm';
 
export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm/>

      <ul>
        { tasks.map(task => <Task key={ task._id } task={ task }/>) }
      </ul>
    </div>
  );
};
```

## Add Submit Handler

**Blaze**
:::tip
 Here we use the event `submit` to handle the form submit.
:::
`import/ui/body.js`

```js
// Add form events
import { Template } from 'meteor/templating';
import './body.html';
 
.... 

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date()
    });

    // Clear form
    target.text.value = '';
  },
});
```

**React**
:::tip
Now you can attach a submit handler to your form using the `onSubmit` event; and also plug the React Hook into the `onChange` event present in the input element.
:::
imports/ui/TaskForm.jsx

```jsx
import React, { useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
 
export const TaskForm = () => {
  const [text, setText] = useState("");
  
  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date()
    });

    setText("");
  };
 
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
 
      <button type="submit">Add Task</button>
    </form>
  );
};
```

## Show Newest Tasks First

**React**
imports/ui/App.jsx

```jsx
..

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

 ..
```
