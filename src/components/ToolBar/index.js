import { useSelector } from "react-redux";
import { Flex, Text } from 'rebass'
import { Switch } from 'antd';
import './index.css'


function onChangeMessage(checked) {
    console.log('onChangeMessage', `switch to ${checked}`);
}

function onChangeMute(checked) {
    console.log('onChangeMute', `switch to ${checked}`);
}

function onChangeQa(checked) {
    console.log('onChangeQa', `switch to ${checked}`);
}

const ToolBar = () => {
    const userName = useSelector((state) => state.loginName);
    const roomAdmins = useSelector((state) => state.room.admins);
    const roomOwner = useSelector((state) => state.room.info.owner);
    const isAdmins = userName.includes(roomAdmins) || userName !== roomOwner;
    return (

        <Flex justifyContent="space-between" alignItems='center' m='5px' height='36px'>
            <Flex>
                <Switch
                    size="small"
                    onChange={onChangeMessage}
                />
                <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">隐藏赞赏</Text>
            </Flex>
            <Flex>
                <Switch
                    size="small"
                    onChange={onChangeMute}
                />
                <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">全员禁言</Text>
            </Flex>
            {!isAdmins && <Flex>
                <Switch
                    size="small"
                    onChange={onChangeQa}
                />
                <Text ml="3px" fontSize="14px" fontWeight="400" color="#7C848C">提问模式</Text>
            </Flex>}
        </Flex>
    )
}
export default ToolBar;

// const ToolBar = () => {
//     const [QAMode, setQAMode] = useState(false)
//     const roleId = useSelector((state) => state.roleId);
//     return (
//         <div>
//             {
//                 roleId === ROLE.student ? (
//                     <>
//                         <text>{QAMode && '提问模式已开启'}</text>
//                         <Checkbox onChange={e => {
//                             setQAMode(e.target.value)
//                         }}>提问模式</Checkbox>
//                     </>
//                 ) : (
//                         <>
//                             <Checkbox onChange={() => console.log('过滤掉赞赏类消息')}>隐藏赞赏</Checkbox>
//                             <Checkbox onChange={() => console.log('全员禁言')}>全员禁言</Checkbox>
//                         </>
//                     )
//             }
//         </div>
//     )
// }