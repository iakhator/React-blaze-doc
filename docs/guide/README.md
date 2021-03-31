# Blaze/React

## Blaze

::: tip
Blaze is a library for creating user interfaces by writing reactive HTML templates. Compared to using a combination of traditional templates and jQuery, Blaze eliminates the need for all the “update logic” in your app that listens for data changes and manipulates the DOM

```handlebars
    <!-- simple blaze hello template -->

    <template name="HelloWorld">
        <h1>Hello World</h1>
    </template>
  ```

  ```handlebars
    <!-- Using a standard Blaze component -->
    {{> HelloWorld}}
  ```

:::

## React

::: tip
 React is a javascript framework, it makes it painless to create interactive UI.  React will efficiently update and render just the right components when your data changes and it allows for building encapsulated components that manage their own state, then compose them to make complex UIs

  ```jsx
    // Simple React Hello component
    export default function HelloWorld () {
      return <h1>Hello World</h1>
    }
     
  ```

  ```jsx
    // Using a standard React Component
     <HelloWorld />
  ```

:::

## Using Javascript in React and Meteor

Blaze has promised to allow the use of javascript syntax in it's template literals. It looks like this won't be available because the meteor community is moving towards using either `React` or `Vue` to build UI.

Lets say I have a Blaze template like below and I want to make the `text` upper case.

```html
  <template name="hello">
    <h1>{{'text'.toUpperCase()}}</h1>
  </template>
```

::: warning
 The above will thrown an error. For a simple thing like turning a text to upperCase we would have to create a `template helper`  like the below
:::

```js
  // hello.js

    Template.hello.helpers({
      capitalize (text) {
        return text.toUpperCase()
      }
    })
  ```

  ```html
    <!-- hello.html -->
    <template name="hello">
      <h1>{{capitalize 'text'}}</h1>
    </template>
  ```

::: tip
React Way

```js
  // React hello.js
  export default function hello () {
    return <h1>{'text'.toUpperCase()}</h2>
  }
  ```

:::

In the next chapter, we will do an in-depth comparison between Blaze and React using building Reusable components.
