import { useSelector } from 'react-redux'
import { Flex, Text, Image } from 'rebass'
import { Switch, Tag } from 'antd';

const SearchList = ({ roomListInfo, searchUser, onSetMute }) => {

    const roomOwner = useSelector((state) => state.room.info.owner);
    const roomAdmins = useSelector((state) => state.room.admins);

    // 新的空数组，存用户头像，昵称，环信ID
    const newArr = [];
    Object.keys(roomListInfo).forEach(item => {
        const userName = roomListInfo[item].nickname;
        const avatarUrl = roomListInfo[item].avatarurl
        newArr.push([userName, avatarUrl, item]);
        return newArr;
    })

    return (
        <div>
            {
                newArr.map((member, key) => {
                    if (member[0] && member[0].indexOf(searchUser) !== -1) {
                        return (
                            <Flex justifyContent='space-between' alignItems='center' mt='8px' key={key}>
                                <Flex ml='8px' alignItems='center'>
                                    <Image src={member[1]} className='msg-img' />
                                    <Flex ml='8px'>
                                        {member[2] === roomOwner && <Tag className='tags' ><Text className='tags-txt' ml='4px' mt='1px'>主讲老师</Text></Tag>}
                                        {roomAdmins.includes(member[2]) && <Tag className='tags' ><Text className='tags-txt' ml='4px' mt='1px'>辅导老师</Text></Tag>}
                                        <Text className='username' ml='5px' >{member[0]}</Text>
                                    </Flex>
                                </Flex>
                                <Switch
                                    size="small"
                                    title="禁言"
                                    onChange={onSetMute}
                                />
                            </Flex>
                        )
                    }
                })
            }
        </div>
    )
}

export default SearchList;