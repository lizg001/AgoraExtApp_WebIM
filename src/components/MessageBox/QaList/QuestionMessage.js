
import { useSelector } from 'react-redux'
import { Flex, Image, Text } from 'rebass'
import { Tag } from 'antd'
import './QaMessage.css'
const QuestionMessage = ({ userName }) => {
    const qaList = useSelector(state => state.messages.qaList) || [];
    const idQaList = qaList[userName] !== undefined;
    return (
        <div style={{ marginLeft: '5px' }}>
            {
                idQaList ? (
                    qaList[userName].map((message, index) => {
                        let isText = message.type === "txt" || message.contentsType === "TEXT"
                        let isPic = message.type === "img" || message.contentsType === "IMAGE"
                        return (
                            <div key={index} className='qa-msg'>
                                <Flex>
                                    <Image src={message.ext.avatarUrl}
                                        className='qa-msg-img'
                                    />
                                    {(message.ext.role === 1) && <Tag className='tags' style={{ marginLeft: '8px' }}><Text className='tags-txt' m='4px' mt='1px'>主讲老师</Text></Tag>}
                                    {(message.ext.role === 3) && <Tag className='tags' style={{ marginLeft: '8px' }}><Text className='tags-txt' m='4px' mt='1px'>辅导老师</Text></Tag>}
                                    <Text className='msg-sender' mb='5px' ml='10px'>{message.ext.nickName || message.from}</Text>
                                </Flex>
                                {isText && <Text className='msg-text' ml='28px' mt='8px'>{message.msg || message.data}</Text>}
                                {isPic && <Image src={message.url} style={{ width: '180px' }} ml='28px' mt='8px' />}
                            </div>
                            // <Flex key={index} >
                            //     <div>
                            //         <Image src={message.ext.avatarUrl}
                            //             className='qa-user-image'
                            //         />
                            //     </div>
                            //     <div>
                            //         {(message.ext.role === 0) && <Tag className='tags'><Text className='tags-txt' m='4px' mt='1px'>主讲老师</Text></Tag>}
                            //         {(message.ext.role === 3) && <Tag className='tags'><Text className='tags-txt' ml='4px' mt='1px'>辅导老师</Text></Tag>}
                            //         <Text className='msg-sender' ml='8px'>{message.ext.nickName || message.from}</Text>
                            //         {isText && <Text className='msg-text'>{message.msg || message.data}</Text>}
                            //         {isPic && <Image src={message.url} style={{ width: '180px' }} />}
                            //     </div>
                            // </Flex>
                        )
                    }
                    )) : (
                        <></>
                    )
            }
        </div>
    )
}

export default QuestionMessage;