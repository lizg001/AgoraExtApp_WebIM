import { Flex, Text, Image } from "rebass";
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const ShowMenu = () => {
    return (
        <div style={{
            background: 'red'
        }}>
            <span>删除</span>
        </div>
    )
}

const onMenu = () => {
    return < ShowMenu />
}


const QaMessage = (props) => {
    const qaList = useSelector(state => state.messages.qaList) || [];
    const [newUser, setNewUser] = useState([]);
    useEffect(() => {
        setNewUser(qaList[props.currentUser])
    }, [])

    return (
        <div>
            {
                newUser && newUser.map((message, index) => {
                    let msgType = message.type === "txt" || message.contentsType === "TEXT"
                    return (
                        <Flex key={index} onClick={onMenu}>
                            <div>
                                <Image src={message.ext.avatarUrl}
                                    className='qa-msg-img'
                                />
                            </div>
                            <div>
                                <Text className='msg-sender' ml='8px'>{message.ext.nickName || message.from}</Text>
                                {
                                    msgType ? (
                                        <div className='msg'>
                                            <Text>{message.msg || message.data}</Text>
                                        </div>
                                    ) : (
                                            <div className='msg' >
                                                <Image src={message.body.url} style={{ width: '180px' }} />
                                            </div>
                                        )
                                }
                            </div>
                        </Flex>
                    )
                })
            }
        </div>
    )
}

export default QaMessage;