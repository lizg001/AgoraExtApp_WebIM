
import { useSelector } from 'react-redux'
import { Text } from 'rebass'
const UserItem = ({ userList }) => {
    console.log('userList', userList);
    const roomOwner = useSelector((state) => state.room.info.owner);
    const roomAdmins = useSelector((state) => state.room.admins);
    console.log('admins---', roomAdmins);
    return (
        <div>
            {
                userList.map(item => {
                    return <div key={item.member}>
                        <Text>{item.member}</Text>
                    </div>
                })
            }
        </div>
    )
}

export default UserItem;