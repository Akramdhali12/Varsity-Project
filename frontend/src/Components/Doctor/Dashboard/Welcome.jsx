import { Avatar } from '@mantine/core';
import React from 'react'
import {useSelector} from 'react-redux';

const Welcome = () => {
    const user = useSelector((state)=>state.user);
  return (
    <div>
        <div>
            <div>
                <div>WelCome Back</div>
                <div>{user.name}</div>
                <div>Surgery, Cardiology</div>
            </div>
            <Avatar src={user?.image} alt="It's me" radius="xl" size="lg"/>
        </div>
    </div>
  )
}

export default Welcome