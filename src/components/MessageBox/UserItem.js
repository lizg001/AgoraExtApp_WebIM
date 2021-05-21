
import { Input, Switch, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Text, Image } from 'rebass'
import { useSelector } from 'react-redux'
import './styles/userList.css'
const onSearch = e => console.log(e.target.value);
const onMute = checked => console.log('checked----', checked);

const UserItem = ({ userList }) => {
    const loginName = useSelector((state) => state.loginName);
    const roomOwner = useSelector((state) => state.room.info.owner);
    const roomAdmins = useSelector((state) => state.room.admins);
    return (
        <div>
            <div className='search-back'>
                <Input placeholder='请输入用户名' className='search-user' onChange={onSearch} />
                <SearchOutlined className='search-icon' />
            </div>
            <Flex justifyContent='flex-start' alignItems='center' mt='8px'>
                <Switch
                    size="small"
                    title="禁言"
                    onChange={onMute}
                />
                <Text className='only-mute'>只看禁言</Text>
            </Flex>

            {
                userList.map(item => {
                    return <Flex key={item.member} mt='10px'>
                        <Flex alignItems='center'>
                            <Image className='msg-img'
                                src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'
                            />
                            {loginName === roomOwner && <Tag className='tags'>主讲老师</Tag>}
                            {roomAdmins.includes(item.member) && <Tag className='tags'>助教老师</Tag>}
                            <Text className='username' ml='5px' >{item.member}</Text>
                        </Flex>
                        <Flex>

                        </Flex>
                    </Flex>
                })
            }

        </div>
    )
}

export default UserItem;