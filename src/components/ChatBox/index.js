
import { Input, Button } from 'antd'

import './index.css'
const { TextArea } = Input;

const ChatBox = () => {
    return (
        <div>
            <div>😊</div>
            <div className="box">
                <TextArea></TextArea>
            </div>
            <div>
                <Button>发送</Button>
            </div>
        </div>
    )
}

export default ChatBox;