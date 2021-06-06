import { useState, useEffect } from 'react'
import { Input, Switch, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Text, Image } from 'rebass'
import { useSelector } from 'react-redux'
import { getRoomWhileList } from '../../../api/chatroom'
import WebIM from '../../../utils/WebIM'
import SearchList from './SearchList'
import MuteList from './MuteList'
import './userList.css'
import avatarUrl from '../../../themes/img/avatar-big@2x.png'

const UserList = ({ roomUserList }) => {
    // 禁言列表
    const [isMute, setIsMute] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [muteMembers, setMuteMembers] = useState([]);
    const [loading, setLoading] = useState(false)
    const roomId = useSelector((state) => state.room.info.id)
    const roomMuteList = useSelector((state) => state.room.muteList);
    const roomListInfo = useSelector((state) => state.userListInfo);

    useEffect(() => {
        let ary = []
        roomMuteList.forEach((item) => {
            ary.push(item)
        })
        setMuteMembers(ary);
    }, [roomMuteList])
    // 设置个人禁言
    const setUserMute = (roomId, val) => {
        let options = {
            chatRoomId: roomId,   // 聊天室id
            users: [val]   // 成员id列表
        };
        WebIM.conn.addUsersToChatRoomWhitelist(options).then((res) => {
            setLoading(false)
            getRoomWhileList(roomId)
            // store.dispatch(roomMuteUsers(true))
        }).catch(() => { setLoading(false) });
    }
    // 移除个人禁言
    const removeUserMute = (roomId, val) => {
        let options = {
            chatRoomId: roomId,  // 群组id
            userName: val           // 要移除的成员
        }
        WebIM.conn.rmUsersFromChatRoomWhitelist(options).then((res) => {
            setLoading(false)
            getRoomWhileList(roomId)
            // store.dispatch(roomMuteUsers(false))
        }).catch(() => { setLoading(false) });
    }
    // 禁言开关
    const onMuteList = checked => {
        setIsMute(checked);
    }
    // 搜索值
    const onSearch = e => {
        setSearchUser(e.target.value)
    }
    // 是否禁言
    const onSetMute = val => (e) => {
        let checked = muteMembers.includes(val)
        setLoading(true)
        if (!checked) {
            setUserMute(roomId, val);
        } else {
            removeUserMute(roomId, val);
        }
    }

    return (
        <div style={{ height: '100%' }}>
            <div className='search-back'>
                <Input placeholder='请输入用户名' className='search-user' onChange={onSearch} />
                <SearchOutlined className='search-icon' />
            </div>
            {
                !searchUser && <Flex justifyContent='flex-start' alignItems='center' mt='8px'>
                <Switch
                    size="small"
                    title="禁言"
                    checked={isMute}
                    onChange={onMuteList}
                />
                <Text className='only-mute'>只看禁言</Text>
            </Flex>
}
            {
                <div>
                    {/* 是否展示搜索列表 */}
                    {searchUser && <SearchList roomListInfo={roomListInfo} searchUser={searchUser} onSetMute={onSetMute} muteMembers={muteMembers} />}
                    {!searchUser && isMute && <MuteList roomListInfo={roomListInfo} muteMembers={muteMembers} onSetMute={onSetMute} />}
                    {/* 展示列表及搜索结果列表 */}
                    {!searchUser && !isMute && roomUserList.map((item, key) => {
                        // if (!isMute || (isMute && muteMembers.includes(item.id))) {
                        return (
                            <Flex key={key} justifyContent='space-between' mt='10px' alignItems='center'>
                                <Flex alignItems='center'>
                                    <Image className='lsit-user-img'
                                        src={item.avatarurl || avatarUrl}
                                    />
                                    <Flex ml='8px'>
                                        {Number(item.ext) === 1 && <Tag className='tags' ><Text className='tags-txt' ml='4px' mt='1px'>主讲老师</Text></Tag>}
                                        {Number(item.ext) === 3 && <Tag className='tags' ><Text className='tags-txt' ml='4px' mt='1px'>辅导老师</Text></Tag>}
                                        <Text className='username' ml='5px' >{item.nickname || item.id}</Text>
                                    </Flex>
                                </Flex>
                                {Number(item.ext) === 2 && <Switch
                                    size="small"
                                    title="禁言"
                                    checked={muteMembers.includes(item.id)}
                                    onClick={onSetMute(item.id)}
                                    loading={loading}
                                />}
                            </Flex>
                        )
                        // }
                    })}
                </div>
            }
        </div >
    )
}
export default UserList;