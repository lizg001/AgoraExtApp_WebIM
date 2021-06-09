
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
                            <Flex className="msg-list-item">
                                <img className='msg-img' src={message.ext.avatarUrl || avatarUrl}/>
                                <Flex flexDirection="column">
                                    <div style={{marginBottom: 5}}>
                                        <Flex alignItems="center" >
                                            {/* 主讲/辅导tag */}
                                            {(message.ext.role === 1 || message.ext.role === 3) && <Tag className='tags'>
                                                {message.ext.role === 1 && '主讲老师'}{message.ext.role === 3 && '辅导老师'}
                                            </Tag>}
                                            {/* 昵称/姓名 */}
                                            <Text className='msg-sender' color={(message.ext.role === 1 || message.ext.role === 3) && '#0099FF'}>{message.ext.nickName || message.from}</Text>
                                        </Flex>
                                    </div>
                                    {isText && <Text className='msg-text'>{message.msg || message.data}</Text>}
                                    {isPic && <Image src={message.url || message.body.url} style={{ width: '180px' }} />}
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