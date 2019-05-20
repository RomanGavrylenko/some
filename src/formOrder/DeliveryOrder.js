import React, { useState, useEffect, forwardRef } from 'react';
import { RadioGroup, Radio, Text, Scope, withFormApi, BasicRadioGroup, BasicRadio,
BasicText, BasicTextArea, BasicSelect, asField, Option, Select , withFieldApi, withRadioGroup } from 'informed';
import { Item } from './mainOrder';

const data = [
    {
        label: 'адресс1',
        value: 'адресс1'
    },
    {
        label: 'адресс2',
        value: 'адресс2'
    },
    {
        label: 'адресс3',
        value: 'адресс3'
    }
]

const Input = asField(
    ({
      fieldState,
      formApi,
      fieldApi, 
      field,
      required = false,
      type = "text",
      options = [],
      ...rest
    }) => (
      <div className="">
        <div className="Modal_form_field_label" htmlFor={field}>
         
        </div>
        { console.log(rest) }
       
        {(() => {
           
          switch (type) {
            case "text":
              return (
                <BasicText
                  {...rest}
                  fieldState={fieldState}
                  field={field}
                  className="Modal_form_field_input"
                  fieldApi={fieldApi}
                  style={fieldState.error ? { border: "solid 1px red" } : null}
                />
              );
  
            case "textarea":
              return (
                <BasicTextArea
                  {...rest}
                  fieldState={fieldState}
                  field={field}
                  fieldApi={fieldApi}
                  className="Modal_form_field_input"
                />
              );
  
            case "select":
              return (
                <Select field={field} 
                        className="Modal_form_field_input" 
                        fieldApi={fieldApi}>
                  {options.map(opt => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              );

              case "radio":
                return (
                    <label>
                        <BasicRadio type='radio' {...rest}
                                    formApi={formApi}
                                    fieldState={fieldState}
                                    fieldApi={fieldApi}
                                    {...rest}  />
                        {rest.label}
                    </label>  
                );
            
            case 'BasicRadioGroup':
                return(
                   <BasicRadioGroup field={field}  
                                    formApi={formApi}
                                    fieldState={fieldState}
                                    fieldApi={fieldApi}
                                    {...rest} >
                        { rest.children}
                   </BasicRadioGroup> 
                );
  
            default:
              break;
          }
        })()}
        
      </div>
    )
  );

  const SomeRadio = forwardRef(( props, ref)=> {
    return (
        <label>
            <BasicRadio ref={ref} {...props}/>
        </label>
    );
  })

  const SomeRadio2 = asField(({ fieldState, ...props }) => (
      <BasicRadio
        fieldState={fieldState}
        {...props}
      />
  ));

  const WithRadioGroup = withRadioGroup(SomeRadio2)

  
class getMyGroup extends React.Component {
    render(){
        return(
            <BasicRadioGroup {...this.props} >
                {this.props.children}
            </BasicRadioGroup>
        );
    }
  }

  const GetMyGroupWith = asField(getMyGroup);

 
export default class DeliveryOrder extends React.Component {

    renderRadio = (data) => {
        return data.map((item, i)=>{
            return <BasicRadio value={item.value} {...item}  key={i} />
        })
    }

    render() {

        const { showTarif, change, showAddress, changeTarif, addressValue } = this.props;

        return (
            <>
                {/*<DeliveryTypeWith change={change} />
                { showTarif && <Tarif changeTarif={changeTarif}/>}
                { (showTarif && showAddress)  && <AddressItemWith addressValue={addressValue}/>}
                <Input type='text' field="description" />
                <Input  type="select"
                        field="currency"
                        options={[
                            {
                                value: "mxn",
                                label: "MXN"
                            },
                            {
                                value: "usd",
                                label: "USD"
                            }
                        ]}
                    />*/}
                { /*<Input  type="radio"
                        field="ssq"
                        options={[
                            {
                                value: "mxn",
                                label: "MXN"
                            },
                            {
                                value: "usd",
                                label: "USD"
                            }
                        ]}
                    />*/}
                <Input type='BasicRadioGroup' 
                        field='qqq'
                        fieldState={this.props.fieldState}
                        formApi={this.props.formApi} >
                       {
                           () => {
                            return (
                            <>
                                <WithRadioGroup type='radio' 
                                fieldState={this.props.fieldState}
                                formApi={this.props.formApi}
                                formState={this.props.formState}
                                value='some' />
                                 <WithRadioGroup type='radio' 
                                fieldState={this.props.fieldState}
                                formApi={this.props.formApi}
                                formState={this.props.formState}
                                value='some2' />
                            </>
                            )
                           }
                       }
                </Input>
                <BasicRadioGroup field='sdsad' value=''>
                   
                </BasicRadioGroup>

                <GetMyGroupWith field='mycustom'>
                    <Radio value='one' />
                    <Radio value='two' />
                </GetMyGroupWith>
                <RadioGroup field='sdsadsss' initialValue='mxn'>
                    <Radio type='radio' label='one' value="mxn"/> 
                    <Radio type='radio' label='two' value="mxsddsn"/> 
                </RadioGroup>

                {/*<RadioGroup field='customS'>
                    <label>Male <Radio value="male"/></label>
                    <label>Female <Radio value="female"/></label>
                    </RadioGroup>*/}
                {
                /*<RadioGroup field='radio' data={data}>
                { 
                    this.renderRadio(data)
                }
            </RadioGroup>*/}
            </>
        );
    }
}
// withFieldApi(DeliveryOrder)

const MyRadio = ({ value, label }) => {
    return (
        <label>
            {label}
            <Radio value={value} />
        </label>
    );
}

const SelfPickup = ({ show }) => {

    const data = [
        {
            label: 'адресс1',
            value: 'адресс1'
        },
        {
            label: 'адресс2',
            value: 'адресс2'
        },
        {
            label: 'адресс3',
            value: 'адресс3'
        }
    ]

    const getList = (data) => {
        return data.map((item, i) => {
            return <MyRadio {...item} key={i} />
        })
    }

    return (
        <>
            <MyRadio label='самовывоз'
                value='self_pick' />
            {show === 'self_pick' &&
                <RadioGroup field='self_pick_address'>
                    {getList(data)}
                </RadioGroup>
            }
        </>
    );
}

const DeliveryTo = ({ show, textChange }) => {
    return (
        <>
            <MyRadio label='Доствка курьером'
                value='dpd' />
            {show === 'dpd' &&
                <Text field='address_id' initialValue='' onValueChange={textChange} />
            }
        </>
    );
}

const DeliveryType = ({ formApi, change }) => {

    const [deliv, setDeliv] = useState(null);
    const [count, setCount] = useState(0);

    const changeValue = (value) => {
        setDeliv(value);
        if (value !== 'dpd' && count) {
            formApi.getState().values.form.hasOwnProperty('address_id') && formApi.setValue('address_id', '');
            formApi.getState().values.form.hasOwnProperty('tarif') && formApi.setValue('tarif', null)
        }
        if (value !== 'dpd') {
            setCount(count + 1);
        }
    }

    const textChange = (value) => {
        let bol = value ? true : false
        change(bol, value)
    }

    return (
        <RadioGroup field='delivery_type' initialValue={null} onValueChange={changeValue}>
            <SelfPickup show={deliv} />
            <DeliveryTo show={deliv} textChange={textChange} />
            <button onClick={() => console.log(formApi.getState())}>
                click
            </button>
        </RadioGroup>
    );
}

const DeliveryTypeWith = withFormApi(DeliveryType)

const Tarif = ({ change, changeTarif }) => {

    const data = [
        {
            label: 'type 1',
            value: 'to_home'
        },
        {
            label: 'type 2',
            value: 'to_home'
        },
        {
            label: 'type 3',
            value: 'to_us'
        }
    ]

    const getList = (data) => {
        return data.map((item, i) => {
            return <MyRadio {...item} key={i} />
        })
    }
    const [ count, setCount ] = useState(0);
    const changeValue = (value) => {
        let bol = value ? true : false;
        changeTarif(bol);
    }

    return (
        <div>
        <RadioGroup field='tarif' onValueChange={changeValue}>
            {getList(data)}
        </RadioGroup>
        </div>
    );
}

const AddressItem = ({addressValue, formApi}) => {

    useEffect(()=> {
        console.log(1)
        formApi.setValue('addres_item.name',addressValue )
    }, [addressValue]);  
    
    const setSome = () => {
        formApi.setValue('addres_item.name', 'my')
    }

    return (
        <div>
            <Scope scope='addres_item'>
                <Item
                    label='Имя'
                    field='name'
                    placeholder='Имя'
                    initialValue='ssw'
                />
                <Item
                    label='Email'
                    field='email'
                    placeholder='email'
                />
                <Item
                    label='phone'
                    field='phone'
                    placeholder='tel'
                />
                <button onClick={setSome}>setSome</button>
            </Scope>
        </div>
    );

}

const AddressItemWith = withFormApi(AddressItem)

