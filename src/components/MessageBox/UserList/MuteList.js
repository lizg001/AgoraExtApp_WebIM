
import { Switch } from 'antd'
import { Flex, Text, Image } from 'rebass'

const MuteList = ({ roomListInfo, muteMembers, onSetMute }) => {
    return (
        <div>
            {muteMembers.map((member, key) => {
                const isTeacher = Number(roomListInfo[member].ext) === 3 || Number(roomListInfo[member].ext) === 1;
                if (!isTeacher) {
                    return <Flex justifyContent='space-between' alignItems='center' mt='10px' key={key}>
                        <Flex ml='8px' alignItems='center'>
                            <Image src={roomListInfo[member].avatarurl || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'} className='lsit-user-img' />
                            <Text className='username' ml='5px' >{roomListInfo[member].nickname || roomListInfo[member].id}</Text>
                        </Flex>
                        <Switch
                            size="small"
                            title="禁言"
                            checked={muteMembers.includes(roomListInfo[member].id)}
                            onClick={onSetMute(roomListInfo[member].id)}
                        />
                    </Flex>
                }
            })}
        </div>
    )
}

export default MuteList;