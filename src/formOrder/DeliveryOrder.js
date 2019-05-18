import React, { useState, useEffect } from 'react';
import { RadioGroup, Radio, Text, Scope, withFormApi } from 'informed';
import { Item } from './mainOrder';

export default class DeliveryOrder extends React.Component {
    render() {

        const { showTarif, change, showAddress, changeTarif, addressValue } = this.props;

        return (
            <>
                <DeliveryTypeWith change={change} />
                { showTarif && <Tarif changeTarif={changeTarif}/>}
                { (showTarif && showAddress)  && <AddressItemWith addressValue={addressValue}/>}
            </>
        );
    }
}

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
                <button ></button>
            </Scope>
        </div>
    );

}

const AddressItemWith = withFormApi(AddressItem)