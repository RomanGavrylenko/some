import React, { useEffect} from 'react';
import './App.css';
import { Form, Text, useFormApi, BasicText, asField, Radio,  Scope, withFormApi, RadioGroup } from 'informed';
import MainOrder from './formOrder/mainOrder';
import DeliveryOrder from './formOrder/DeliveryOrder';
import Map from './formOrder/map'


class App extends React.Component {

  state={
    showTarif: false,
    showAddress: false,
    addressValue: ''
  }

  getApi = (formApi) => {
    this.formApi = formApi;
  }

  getState = () => {
    console.log(this.formApi.getState().values.form)
  }

  //для отображения или скрытия блока с тарифом
  tarifChange = (bol, value) => {
    this.setState({
      showTarif: bol,
      addressValue: value
    })
  }
  //для отображения или скрытия блока с адресом
  changeTarif = (value) => {
    this.setState({
      showAddress: value
    })
  }

  render(){
    return(
      <>
      <Form getApi={this.getApi} >
        <Scope scope='form'>
          <MainOrder/>
          <DeliveryOrder 
            change={this.tarifChange}
            showTarif={this.state.showTarif}
            changeTarif={this.changeTarif}
            showAddress={this.state.showAddress}
            addressValue={this.state.addressValue}
          />
        </Scope>
      </Form>
      <button onClick={this.getState}>
        getState
      </button>
      </>
    );
  }
}


/*class App extends React.Component {

  state ={
    show: true
  }

  getApi = (formApi) => {
    this.formApi = formApi;
  }

  do = () => {
    this.formApi.setValue('form.one', null)
    console.log(this.formApi.getState());
  }

  more = () => {
    this.formApi.setValue('form.one_more.more', 'more')
    this.setState((state) => {
      return {
        show: !state.show
      }
    })
  }

  getState = () => {
    console.log(this.formApi.getState().values)
  }


  change = (value) => {
    if(value === 'male'){
     this.setState({
       show:true
     })
    }
    if(value === 'female'){
      this.setState({
        show:false
      })
   }
  }

  render(){
    return (
      <>
        <Form getApi={this.getApi} >
          <Scope scope='form'>
            <Text field='one' initialValue='one'/>
            <Text field='two' initialValue='two' />
            <RadioGroup field='gender' onValueChange={this.change} initialValue='male'>
              <label>Male <Radio value='male' /></label>
              <label>Female <Radio value='female' /></label>
            </RadioGroup>
            { this.state.show && <Seconds /> }
            <Scope scope='one_more'>
              <Text field='more' initialValue={55}/>
            </Scope>
          </Scope>

        </Form>
        <button onClick={this.do}>
          click first
        </button>
        <button onClick={this.more}>
          more
        </button>
        <button onClick={this.getState}>
          getState
        </button>
      </>
    );
  }
}

class Second extends React.Component{
  do = () => {
    this.props.formApi.setValue('three', 55)
    console.log(this.props.formApi.getState());
  }

  componentWillUnmount(){
    this.props.formApi.setValue('three', 100)
    console.log(this.props.formApi.getState());
  }

  componentDidMount(){
    this.props.formApi.setValue('three', 'Seconds that will appeat=r===')
  }


  render(){
    return (
      <>
      <div>
          <Text field='three' initialValue='three'/>
      </div>
      <button onClick={this.do}>
        click
      </button>
    </>
    );
  }
}

const Seconds = withFormApi(Second)
/*
  useEffect(()=> {
    return () =>{
      formApi.setValue()
    }
  }, [show]);*/

  


export default App;