import { useState, useEffect } from 'react'
import { Input, Switch, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Text, Image } from 'rebass'
import { useSelector } from 'react-redux'
import { getRoomWhileList } from '../../../api/chatroom'
import WebIM from '../../../utils/WebIM'
import SearchList from './SearchList'
import MuteList from './MuteList'
import { getUserInfo } from '../../../api/userInfo'
import _ from 'lodash'
import './userList.css'

const UserList = () => {
    // 禁言列表
    const [isMute, setIsMute] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [muteMembers, setMuteMembers] = useState([]);
    const [loading, setLoading] = useState(false)
    const roomId = useSelector((state) => state.room.info.id)
    const roomUsers = useSelector(state => state.room.users)
    const roomMuteList = useSelector((state) => state.room.muteList);
    const roomListInfo = useSelector((state) => state.userListInfo);

    let speakerTeacher = []
    let coachTeacher = []
    let student = []

    const newRoomUsers = []
    roomUsers.map(item => {
        if (item.owner) {
            return null
        }
        return newRoomUsers.push(item.member);
    })

    // 遍历成员列表，拿到成员数据，结构和 roomAdmin 统一
    roomUsers.map((item) => {
        let val
        if (roomListInfo) {
            val = roomListInfo && roomListInfo[item.member]
        } else {
            return
        }
        let newVal = {}
        switch (val && val.ext) {
            case '1':
                newVal = _.assign(val, { id: item.member })
                speakerTeacher.push(newVal)
                break;
            case '2':
                newVal = _.assign(val, { id: item.member })
                student.push(newVal)
                break;
            case '3':
                newVal = _.assign(val, { id: item.member })
                coachTeacher.push(newVal)
                break;
            default:
                break;
        }
    })
    const roomUserList = _.concat(speakerTeacher, coachTeacher, _.reverse(student))
    useEffect(() => {
        getUserInfo(newRoomUsers)
    }, [roomUsers])



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
            <Flex justifyContent='flex-start' alignItems='center' mt='8px'>
                <Switch
                    size="small"
                    title="禁言"
                    onChange={onMuteList}
                />
                <Text className='only-mute'>只看禁言</Text>
            </Flex>
            {
                <div>
                    {/* 是否展示搜索列表 */}
                    {searchUser && <SearchList roomListInfo={roomListInfo} searchUser={searchUser} onSetMute={onSetMute} muteMembers={muteMembers} />}
                    {isMute && <MuteList roomListInfo={roomListInfo} muteMembers={muteMembers} onSetMute={onSetMute} />}
                    {/* 展示列表及搜索结果列表 */}
                    {!searchUser && !isMute && roomUserList.map((item, key) => {
                        // if (!isMute || (isMute && muteMembers.includes(item.id))) {
                        return (
                            <Flex key={key} justifyContent='space-between' mt='10px' alignItems='center'>
                                <Flex alignItems='center'>
                                    <Image className='lsit-user-img'
                                        src={item.avatarurl || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'}
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