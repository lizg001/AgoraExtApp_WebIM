import { useState, useEffect } from 'react'
import { Input, Switch, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Text, Image } from 'rebass'
import { useSelector } from 'react-redux'
import { getRoomWhileList } from '../../../api/chatroom'
import WebIM from '../../../utils/WebIM'
import SearchList from './SearchList'
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
    const roomAdmins = useSelector((state) => state.room.admins);
    const roomUsers = useSelector(state => state.room.users)
    const roomMuteList = useSelector((state) => state.room.muteList);
    const roomListInfo = useSelector((state) => state.userListInfo);
    let speakerTeacher = []
    let coachTeacher = []
    let student = []
    _.forIn(roomListInfo, (val, key) => {
        let newVal = {}
        switch (val.ext) {
            case '1':
                newVal = _.assign(val, { id: key })
                speakerTeacher.push(newVal)
                break;
            case '2':
                newVal = _.assign(val, { id: key })
                student.push(newVal)
                break;
            case '3':
                newVal = _.assign(val, { id: key })
                coachTeacher.push(newVal)
                break;
            default:
                break;
        }
    })

    const roomUserList = _.concat(speakerTeacher, coachTeacher, student)


    // 遍历成员列表，拿到成员数据，结构和 roomAdmin 统一
    const newRoomUsers = []
    roomUsers.map(item => {
        if (item.owner) {
            return null
        }
        return newRoomUsers.push(item.member);
    })
    const roomAllUsers = roomAdmins.concat(newRoomUsers);

    useEffect(() => {
        console.log('我执行了');
        getUserInfo(Array.from(new Set(roomAllUsers)))
    }, [roomUsers])

    useEffect(() => {
        let ary = []
        roomMuteList.forEach((item) => {
            ary.push(item.user)
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
        <div className='user-list'>
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
                    {searchUser && <SearchList roomListInfo={roomListInfo} searchUser={searchUser} onSetMute={onSetMute} muteList={muteMembers} />}
                    {/* 展示列表及搜索结果列表 */}
                    {!searchUser && roomUserList.map((item, key) => {
                        if (!isMute || (isMute && muteMembers.includes(item.id))) {
                            return (
                                <Flex key={key} justifyContent='space-between' mt='10px'>
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
                                    <Switch
                                        size="small"
                                        title="禁言"
                                        checked={muteMembers.includes(item.id)}
                                        onClick={onSetMute(item.id)}
                                        loading={loading}
                                    />
                                </Flex>
                            )
                        }



                    })}
                </div>
            }
        </div >
    )
}

export default UserList;