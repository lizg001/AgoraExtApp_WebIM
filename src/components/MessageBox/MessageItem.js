
import { Flex, Text, Image } from 'rebass'
import './styles/msgItem.css'

// 消息渲染
const MessageItem = ({ messageList, isHide }) => {
    let renderMsgs = messageList
    if (isHide) {
        renderMsgs = messageList.filter((item) => {
            if (item.contentsType !== 'CUSTOM') {
                return item
            }
        })
    }
    return (
        <div >
            <div>
                {renderMsgs.map((message) => {
                    let msgType = message.type === 'txt' || message.contentsType === 'TEXT';
                    return <div style={{ marginTop: '10px' }} key={message.id}>
                        {
                            <div>
                                <Flex>
                                    <div>
                                        <Image src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'
                                            className='msg-img'
                                        />
                                    </div>
                                    <div>
                                        <Text className='msg-sender' ml='8px'>{'' || message.from}</Text>
                                    </div>
                                </Flex>
                                {
                                    msgType ? (
                                        <div className='msg'>
                                            <Text>{message.msg || message.data}</Text>
                                        </div>
                                    ) : (
                                            <div>
                                                <Flex className='msg' alignItems='center' ml='28px'>
                                                    <Text mr='2px'>{message.customExts.des}</Text>
                                                    <Image src={message.customExts.url} width='24px' height='24px'></Image>
                                                </Flex>
                                            </div>
                                        )
                                }

                            </div>
                        }
                    </div>
                })
                }
            </div>
        </div >

    )
}
export default MessageItem

// import { useSelector } from "react-redux";
// import { Tag } from 'antd';
// import { ROLE } from "./constants";

// const MessageItem = ({ message }) => {
//     const roleId = useSelector((state) => state.roleId);
//     const tag = ROLE.find(role => role.id === roleId)?.tag
//     const hasEditPermisson = [ROLE.teacher, ROLE.assistant].includes(roleId)
//     return (
//         <div>
//             {/* 头像 */}
//             <img src="" />
//             <div>
//                 <div>
//                     {Boolean(tag) && <Tag>{tag}</Tag>}
//                     <span>{message.from}</span>
//                     {hasEditPermisson && (
//                         <div>
//                             <button>解除禁言</button>
//                             <button>删除</button>
//                         </div>
//                     )}
//                 </div>
//                 <text>{message.data}</text>
//             </div>
//         </div>
//     )
// }

// export default MessageItem