import React from 'react';
import { Text } from 'informed';

export const Item = ({label, field, placeholder}) => {
    return(
        <label>
            {label}
            <Text field={field}
                  placeholder={placeholder} />
        </label>
    );
}

export default function MainOrder(props){
    return(
        <div>
            <Item 
                label='Имя'
                field='name'
                placeholder='Имя'
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
        </div>
    );
}