# Simple Todo List

We are going to buid a simple app that makes use of user input and events so as to see Blaze and React work side by side.
::: tip
  Let assume we are using both React and Blaze in a Meteor app and also install all the necessary packages.
:::

## Templates

**Blaze Template**

`body.html`

```handlebars
<body>
  <div>
    <header>
      <h1>Todo List</h1>
    </header>
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

`body.js`

```js
import { Template } from 'meteor/templating';
import './body.html';
 
Template.body.helpers({
  tasks: [
    { text: 'This is task 1' },
    { text: 'This is task 2' },
    { text: 'This is task 3' },
  ],
});
```

`starter file main.js`

```js
import '../imports/ui/body.js';
```

**React Components**

`imports/ui/App.jsx`

```jsx
import React from 'react';
import { Task } from './Task';
 
const tasks = [
  {_id: 1, text: 'First Task'},
  {_id: 2, text: 'Second Task'},
  {_id: 3, text: 'Third Task'},
];

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <ul>
      { tasks.map(task => <Task key={ task._id } task={ task }/>) }
    </ul>
  </div>
);
```

`imports/ui/Task.jsx`

```jsx
import React from 'react';

export const Task = ({ task }) => {
  return <li>{task.text}</li>
};
```

## Collections

:::tip
Both React and Blaze create `Collections` same way

```js
//imports/api/tasks/ui
import { Mongo } from 'meteor/mongo';
export const Tasks = new Mongo.Collection('tasks');
```

:::

## Render Tasks Collection

**Blaze**
`imports/ui/body.js`

```js
import { Template } from 'meteor/templating';
 
**import { Tasks } from '../api/tasks.js';**
 
import './body.html';

Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});
```

**React**

```jsx
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
 
export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());
 
  return (
    <div>
      <h1>Welcome to Meteor!</h1>
 
      <ul>
        { tasks.map(task => <Task key={ task._id } task={ task }/>) }
      </ul>
    </div>
  );
};
```

:::tip
 The `useTracker` function exported by `react-meteor-data` is a React Hook that allows you to have reactivity in your React components. Every time the data changes through reactivity your component will re-render. Cool, right?
:::
