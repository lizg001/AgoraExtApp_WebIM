
import { useSelector } from 'react-redux'
import { Flex, Image, Text } from 'rebass'
import { Tag } from 'antd'
import './QaMessage.css'
import avatarUrl from '../../../themes/img/avatar-big@2x.png'
import { divide } from 'lodash'

// 学生端 提问消息列表
const QuestionMessage = ({ userName }) => {
    const qaList = useSelector(state => state.messages.qaList) || [];
    const idQaList = qaList[userName] !== undefined;
    return (
        <>
            {
                idQaList ? (
                    qaList[userName]?.msg.map((message, index) => {
                        let isText = message.type === "txt" || message.contentsType === "TEXT"
                        let isPic = message.type === "img" || message.contentsType === "IMAGE"
                        return (
                            // <div key={index} className='qa-msg'>
                            //     <Flex>
                            //         <Image src={message.ext.avatarUrl || avatarUrl}
                            //             className='qa-msg-img'
                            //         />
                            //         {(message.ext.role === 1) && <Tag className='tags' style={{ marginLeft: '8px' }}><Text className='tags-txt' m='4px' mt='1px'>主讲老师</Text></Tag>}
                            //         {(message.ext.role === 3) && <Tag className='tags' style={{ marginLeft: '8px' }}><Text className='tags-txt' m='4px' mt='1px'>辅导老师</Text></Tag>}
                            //         <Text className='msg-sender' mb='5px' ml='10px'>{message.ext.nickName || message.from}</Text>
                            //     </Flex>
                            //     {isText && <Text className='msg-text' ml='28px' mt='8px'>{message.msg || message.data}</Text>}
                            //     {isPic && <Image src={message.url} style={{ width: '180px' }} ml='28px' mt='8px' />}
                            // </div>
                            <Flex className="msg-list-item">
                                <img className='msg-img' src={message.ext.avatarUrl || avatarUrl}/>
                                <Flex flexDirection="column">
                                    <Flex alignItems="center">
                                        {/* 主讲/辅导tag */}
                                        {(message.ext.role === 1 || message.ext.role === 3) && <Tag className='tags'>
                                            {message.ext.role === 1 && '主讲老师1'}{message.ext.role === 3 && '辅导老师1'}
                                        </Tag>}
                                        {/* 昵称/姓名 */}
                                        <Text className='msg-sender' color={(message.ext.role === 1 || message.ext.role === 3) && '#0099FF'}>{message.ext.nickName || message.from}</Text>
                                    </Flex>
                                    <div className='msg-text'>{message.msg || message.data}</div>
                                </Flex>
                            </Flex>
                        )
                    }
                    )) : (
                        <></>
                    )
            }
        </>
    )
}

export default QuestionMessage;