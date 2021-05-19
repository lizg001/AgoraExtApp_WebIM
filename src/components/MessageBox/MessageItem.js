


// 消息渲染
const MessageItem = () => {
    return (
        <div></div>
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