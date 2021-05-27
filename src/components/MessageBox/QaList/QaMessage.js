import { Text, Image, Flex } from "rebass";
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'


const QaMessage = (props) => {
    const qaList = useSelector(state => state.messages.qaList) || [];
    const [newUser, setNewUser] = useState([]);
    useEffect(() => {
        setNewUser(qaList[props.currentUser])
    }, [qaList[props.currentUser]])

    return (
        <div className='qa'>
            {
                newUser && newUser.map((message, index) => {
                    let msgType = message.type === "txt" || message.contentsType === "TEXT"
                    return (
                        <div key={index} className='qa-msg'>
                            {/* <div>
                                <Image src={message.ext.avatarUrl}
                                    className='qa-msg-img'
                                />
                            </div> */}
                            <Flex>
                                {(message.ext.role === "0") && <Tag className='tags'><Text className='tags-txt' m='4px' mt='1px'>主讲老师</Text></Tag>}
                                {(message.ext.role === "3") && <Tag className='tags'><Text className='tags-txt' ml='4px' mt='1px'>辅导老师</Text></Tag>}
                                <Text className='msg-sender' mb='5px'>{message.ext.nickName || message.from}</Text>
                            </Flex>
                            {
                                msgType ? (
                                    <Text className='msg-text'>{message.msg || message.data}</Text>
                                ) : (
                                        <Image src={message.body.url} style={{ width: '180px' }} />
                                    )
                            }

                        </div>
                    )
                })
            }
        </div>
    )
}

export default QaMessage;