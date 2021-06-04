import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from 'antd'
import { Flex, Text, Button } from 'rebass'
import { LeftOutlined } from '@ant-design/icons'
import { updateRoomNotice } from '../../api/chatroom'

const { TextArea } = Input;

const EditNotice = ({ hasEditPermisson, roomAnnouncement, onView }) => {
    const roomId = useSelector((state) => state.room.info.id);
    // 公告栏编辑字数
    const [count, setCount] = useState(roomAnnouncement.length);
    // 公告栏内容
    const [newContent, setNewContent] = useState(roomAnnouncement)
    // 公告内容修改
    const changeContent = (e) => {
        let content = e.target.value;
        setCount(content.length);
        setNewContent(content);
    }
    return (
        <div>
            <Flex alignItems="center" color="#A8ADB2" mb="10px">
                <LeftOutlined onClick={onView} />
                <Text ml='90px' className="title_center">公告</Text>
            </Flex>
            <TextArea placeholder="请输入公告..." onChange={changeContent}
                className='update-content' maxLength={300} defaultValue={roomAnnouncement}
            ></TextArea>
            {
                hasEditPermisson && <div>
                    <Flex justifyContent='flex-end' mb='5px' color='#999999'>{count}/300</Flex>
                    <Button variant='primary' className='save-btn' onClick={() => {
                        updateRoomNotice(roomId, newContent);
                        onView();
                    }}
                    >保存</Button>
                </div>
            }

        </div>
    )
}

export default EditNotice;