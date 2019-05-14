import React from 'react';
import './App.css';
import { Form, Text, useFormApi, BasicText, asField, Scope } from 'informed';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Remember! This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.setFormApi = this.setFormApi.bind(this);
    this.state = {
      data: {}
    }
  }

  handleClick() {
    console.log(this.formApi.getState());
    this.setState({
      data: {...this.formApi.getState()}
    })
  }

  handleReset = () => {
    this.formApi.setError('second', 'some error')
  }

  setFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    return (
      <div>
        { /*<Form getApi={this.setFormApi}>
          <Text field="hello" />
          <button type="submit">Submit</button>
    </Form>  */}
        <Some />
        <Form 
          getApi={this.setFormApi}  
          onSubmit = {() => { console.log('form submit')}}
          onChange = { (value) => console.log(value) }
          onBlur = {  this.handleClick }
        >
          {() => (
            <div>

              <label>
                test
                <Text
                  field = 'test'
                 
                  validate= { (value) => {
                    return value.length< 7 ? 'Field must be at least five characters' : undefined;
                  }}
                  validateOnBlur
                  maintainCursor
                  type='tel'
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  placeholder='placeholder'
                  required
                  className = 'some'
                />
              </label>

              <label>
                First name:
                <Text field="name"/>
                { this.state.data.errors &&
                  <span>{this.state.data.errors.name}</span>
                }
              </label>
              <label>
               second name:
                <Text field="second"/>
              </label>
              <label>
                three name:
                <Text field="three"/>
              </label>
              <button type="submit">Submit</button>
              <label>Values:</label>
            </div>
          )}
        </Form>
        <button onClick={this.handleClick}>Print Form State</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

/*function App() {
  return (

<Form>
  {({ formState }) => (
    <div>
      <label>
        First name:
        <Text field="name"/>
      </label>
      <button type="submit">Submit</button>
      <label>Values:</label>
      <code>{JSON.stringify(formState.values)}</code>
      <label>Touched:</label>
      <code>{JSON.stringify(formState.touched)}</code>
    </div>
  )}
</Form>
  );
}*/

/*const ComponentWithFormApi = () => {
  const formApi = useFormApi();
  return <button type="button" onClick={()=>formApi.setValue('hello', 'world!')}/>
};

function App(){
  return(
    <Form>
      <div>
        <Text field="hello" />
        <button type="submit">Submit</button>
        <ComponentWithFormApi />
      </div>
    </Form>
  )
}*/

const basicValidation = value => {
  return !value || value.length < 5 ? 'Field must be longer than five characters' : undefined;
}

const duplicateValidation = ( value, values ) => {
  console.log(values)
  return values.filter( v => v === value ).length > 1 ? 'This field must be unique.' : undefined;
}

const friendValidation = ( value, values ) => {
  return basicValidation(value) || duplicateValidation( value, values.friends )
}

class Some extends React.Component {

  handleClick() {
    console.log(this.formApi.getState());
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  render(){
    return (
      <Form id="complex-validate-form" getApi={this.setFormApi} onSubmit = {() => this.formApi.getState()} >
        <label htmlFor="complex-name">First name:</label>
        <Text field="name" id="complex-name" validate={basicValidation} />
        <Scope scope="favorite">
          <label htmlFor="complex-color">Favorite color:</label>
          <Text field="color" id="complex-color" validate={basicValidation} />undefined
          <label htmlFor="complex-food">Favorite food:</label>
          <Text field="food" id="complex-food" validate={basicValidation} />
        </Scope>
        <label htmlFor="complex-friend-0">Friend 1:</label>
        <Text field="friends[0]" id="complex-friend-0" validate={friendValidation} />
        <label htmlFor="complex-friend-1">Friend 2:</label>
        <Text field="friends[1]" id="complex-friend-1" validate={friendValidation} />
        <label htmlFor="complex-friend-2">Friend 3:</label>
        <Text field="friends[2]" id="complex-friend-2" validate={friendValidation} />
        <button type="submit">
          Submit
        </button>
      </Form>
    )
}
}
export default App;
