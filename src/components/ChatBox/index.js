import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import { Flex, Text } from 'rebass'

import { SendTextMessage } from '../../api/sendMessage'

import './index.css'

const ChatBox = () => {
    const [count, setCount] = useState(0)
    const [content, setContent] = useState('')
    const changeCount = (e) => {
        let msgCentent = e.target.value;
        let msgCount = msgCentent.length;
        setCount(msgCount);
        setContent(msgCentent);
    }

    return (
        <div>
            <SmileOutlined style={{
                width: '20px',
                height: '20px',
                color: '#D3D6D8',
                marginLeft: '5px',
                cursor: 'pointer'
            }} />

            <Input.TextArea
                placeholder="请输入内容..."
                onChange={(e) => changeCount(e)}
                className="msg-box"
            />
            <Flex alignItems="center" justifyContent="flex-end" color="#A8ADB2" m='5px' >
                <Text>{count}/100</Text>
                <Button
                    onClick={() => { SendTextMessage(content) }}
                    className="msg-btn"
                >
                    发送
                </Button>
            </Flex>

        </div >
    )
}

export default ChatBox;