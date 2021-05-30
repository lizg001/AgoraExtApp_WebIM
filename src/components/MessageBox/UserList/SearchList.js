import { useSelector } from 'react-redux'
import { Flex, Text, Image } from 'rebass'
import { Switch, Tag } from 'antd';

const SearchList = ({ roomListInfo, searchUser, onSetMute }) => {
    const roomOwner = useSelector((state) => state.room.info.owner);
    // const roomAdmins = useSelector((state) => state.room.admins);

    // 新的空数组，存用户头像，昵称，环信ID
    const aryList = [];
    Object.keys(roomListInfo).forEach(item => {
        const userName = roomListInfo[item].nickname;
        const avatarUrl = roomListInfo[item].avatarurl;
        const roleType = roomListInfo[item].ext;
        aryList.push([userName, avatarUrl, item, roleType]);
        return aryList;
    })

    return (
        <div>
            {
                aryList.map((member, key) => {
                    if (member[2] === roomOwner) {
                        return null
                    } else {
                        if (member[0] && member[0].indexOf(searchUser) !== -1) {
                            return (
                                <Flex justifyContent='space-between' alignItems='center' mt='8px' key={key}>
                                    <Flex ml='8px' alignItems='center'>
                                        <Image src={member[1] || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'} className='lsit-user-img' />
                                        <Flex ml='8px'>
                                            {Number(member[3]) === 1 && <Tag className='tags' ><Text className='tags-txt' ml='4px' mt='1px'>主讲老师</Text></Tag>}
                                            {Number(member[3]) === 3 && <Tag className='tags' ><Text className='tags-txt' ml='4px' mt='1px'>辅导老师</Text></Tag>}
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
                    }
                })
            }
        </div>
    )
}

export default SearchList;