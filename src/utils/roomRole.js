import { useSelector } from 'react-redux'

export const UserName = () => {
    const userName = useSelector((state) => state.loginName);
    console.log('userName--', userName);
}


// roomAdmins: useSelector((state) => state.room.admins);
// roomOwner: useSelector((state) => state.room.info.owner);