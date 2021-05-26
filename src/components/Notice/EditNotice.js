import { useState } from 'react'
import { Input } from 'antd'
import { Flex, Text, Button } from 'rebass'
import { LeftOutlined } from '@ant-design/icons'
import { updateRoomNotice } from '../../api/chatroom'

const { TextArea } = Input;

const EditNotice = ({ roomId, noticeContent, onView }) => {
    console.log('---noticeContent', noticeContent);
    console.log('roomId', roomId);
    // 公告栏编辑字数
    const [count, setCount] = useState(0);
    // 公告栏内容
    const [newContent, setNewContent] = useState('')
    // 公告内容修改
    const changeCentent = (e) => {
        console.log('e.target.value', e.target.value);
        let content = e.target.value;
        setCount(content.length);
        setNewContent(content);
    }
    return (
        <div>
            <Flex alignItems="center" color="#A8ADB2" mb="10px">
                <LeftOutlined onClick={onView} />
                <Text ml='90px' fontSize="14px" fontWeight="500" color="#D3D6D8" className="title_center">公告</Text>
            </Flex>
            <TextArea
                placeholder="请输入公告..."
                onChange={(e) => changeCentent(e)}
                className='update-content'
            ></TextArea>
            <Flex justifyContent='flex-end' mb='5px' color='#999999'>{count}/300</Flex>
            <Button
                variant='primary'
                css={{
                    borderRadius: '18px',
                    width: '100%',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    updateRoomNotice(roomId, newContent);
                    onView();
                }}
            >保存</Button>
        </div>
    )
}

export default EditNotice;