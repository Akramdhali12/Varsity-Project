import { ActionIcon } from '@mantine/core'
import { IconBellRinging, IconLayoutSidebarLeftCollapseFilled } from '@tabler/icons-react';
import ProfileMenu from './ProfileMenu';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeJwt } from '../../Slices/JwtSlice';
import { removeUser } from '../../Slices/UserSlice';

function Header() {
  const dispatch = useDispatch();
  const jwt=useSelector((state)=>state.jwt);

  const handleLogout=()=>{
    dispatch(removeJwt());
    dispatch(removeUser());
  }
  return (
    <div className='bg-green-200 w-full h-16 flex justify-between items-center px-4'>
      <ActionIcon variant="transparent" size="lg" aria-label="Settings">
      <IconLayoutSidebarLeftCollapseFilled style={{ width: '80%', height: '80%' }} stroke={1.5} />
      </ActionIcon>
      <div className='flex gap-5 items-center'>
        {jwt?<Button color='red' onClick={handleLogout}>Logout</Button>:<Link to="login"><Button>Login</Button></Link>}
        {jwt&&<><ActionIcon variant="transparent" size="md" aria-label="Settings">
        <IconBellRinging style={{ width: '80%', height: '80%' }} stroke={2} />
        </ActionIcon>
      <ProfileMenu/></>}
      </div>
    </div>
  )
}

export default Header