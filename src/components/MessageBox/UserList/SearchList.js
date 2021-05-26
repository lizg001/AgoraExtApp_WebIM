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
                    if (searchUser === member[0]) {
                        return (
                            <Flex justifyContent='space-between' alignItems='center' mt='8px' key={key}>
                                <Flex alignItems='center'>
                                    <Image src={member[1]} className='msg-img' />
                                    {member[2] === roomOwner && <Tag className='tags'>主讲老师</Tag>}
                                    {roomAdmins.includes(member[2]) && <Tag className='tags'>助教老师</Tag>}
                                    <Text className='username' ml='8px' >{member[0]}</Text>
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