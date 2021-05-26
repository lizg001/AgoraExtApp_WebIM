
import { useSelector } from 'react-redux'
import { Flex, Image, Text } from 'rebass'
import './qaMessage.css'
const QuestionMessage = ({ userName }) => {
    const qaList = useSelector(state => state.messages.qaList) || [];
    const idQaList = qaList[userName] !== undefined;
    return (
        <div style={{ marginLeft: '5px' }}>
            {
                idQaList ? (
                    qaList[userName].map((message, index) => {
                        return (
                            <Flex key={index} >
                                <div>
                                    <Image src={message.ext.avatarUrl}
                                        className='qa-user-image'
                                    />
                                </div>
                                <div>
                                    <Text className='msg-sender' ml='8px'>{message.ext.nickName || message.from}</Text>
                                    <div className='msg'>
                                        <Text>{message.msg || message.data}</Text>
                                    </div>

                                </div>
                            </Flex>
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