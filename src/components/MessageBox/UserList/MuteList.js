import { Flex, Text } from 'rebass'

const MuteList = ({ roomMuteList, searchUser }) => {
    let showMuteList = searchUser === '' || roomMuteList === []
    if (!showMuteList) {
        return null
    }
    return (
        <div>
            {
                roomMuteList.map((member) => {
                    return <Flex key={member.user} mt='8px'>
                        <Text className='username' ml='5px' >{member.user}</Text>

                    </Flex>
                })
            }
        </div>
    )
}
export default MuteList;