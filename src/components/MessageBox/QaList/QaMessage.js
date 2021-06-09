import { Text, Image, Flex } from "rebass";
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'

// 助教端 提问消息列表
const QaMessage = (props) => {
    const teacher = useSelector(state => state.loginInfo.ext);
    const isTeacher = (Number(teacher) === 1 || Number(teacher) === 3);
    const qaList = useSelector(state => state.messages.qaList) || [];
    const [newUser, setNewUser] = useState([]);
    useEffect(() => {
        setNewUser(qaList[props.currentUser]?.msg)
    }, [qaList[props.currentUser]])

    return (
        <div className='qa'>
            {
                newUser && newUser.map((message, index) => {
                    let isText = message.type === "txt" || message.contentsType === "TEXT"
                    let isPic = message.type === "img" || message.contentsType === "IMAGE"
                    return (
                        <div key={index} className='qa-msg' style={{paddingLeft: isTeacher ? 12 : 0}}>
                            {/* <div>
                                <Image src={message.ext.avatarUrl}
                                    className='qa-msg-img'
                                />
                            </div> */}
                            <Flex>
                                {(message.ext.role === 1) && <Tag className='tags'><Text className='tags-txt' m='4px' mt='1px'>主讲老师</Text></Tag>}
                                {(message.ext.role === 3) && <Tag className='tags'><Text className='tags-txt' ml='4px' mt='1px'>辅导老师</Text></Tag>}
                                <Text className='msg-sender' mb='5px'>{message.ext.nickName || message.from}</Text>
                            </Flex>
                            {isText && <Text className='msg-text'>{message.msg || message.data}</Text>}
                            {isPic && <Image src={message.url || message.body.url} style={{ width: '180px' }} />}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QaMessage;