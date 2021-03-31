# Building Reusable Components

::: tip
Switching from Blaze to React is really easy because of the similarities they both have but their are some caveat to this similarities.
We are going to start simple to advanced way of building reusable component in Meteor Blaze and React.
:::

## Select

**Blaze SelectBox**

```SelectBox.html```

```handlebars
  <template name="SelectBox">
    <select class="js-select">
      {{#each option in options}}
        <option value={{option.value}}>{{option.label}}</option>
      {{/each}}
    </select>
  </template>
```

```SelectBox.js```

```js
  Template.SelectBox.events({
    'click .js-select' (e, template) {
        e.preventDefault();
        template.onSelect(e.target.value);
    }
  })
```

```hello.html```

```handlebars
  <template name="hello">
    {{> SelectBox selectOptions=selectOptions}}
  </template>
```

```hello.js```

```js
  Template.hello.helpers({
    selectOptions (text) {
      return {
        options: [
          {label: '1', value: 1},
          {label: '2', value: 2}
          {label: '3', value: 3}
          {label: '4', value: 4}
        ],
        onSelect(value) {
          console.log(value)
        }
      }
    }
  })
```

**React SelectBox**

```SelectBox.js```

```jsx
  export default function SelectBox(props) {
    const { options, handleOnChange } = props;
    return (
      <select onChange={handleOnChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    );
  }
```

```App.js```

```jsx
import SelectBox from "./SelectBox";

const options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" }
];

export default function App() {
  function handleOnChange(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  return (
    <div className="App">
      <SelectBox options={options} handleOnChange={handleOnChange} />
    </div>
  );
}
```
