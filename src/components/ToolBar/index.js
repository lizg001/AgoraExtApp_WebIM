import { Flex, Text } from 'rebass'
import { Switch } from 'antd';
import './index.css'


function onChangeMessage(checked) {
    console.log('onChangeMessage', `switch to ${checked}`);
}

function onChangeMute(checked) {
    console.log('onChangeMute', `switch to ${checked}`);
}

const ToolBar = () => {
    return (
        <Flex justifyContent="space-between">
            <Flex>
                <Switch
                    size="small"
                    onChange={onChangeMessage}
                />
                <Text ml="2px" fontSize="12px" fontWeight="400" color="#7C848C">隐藏赞赏</Text>
            </Flex>
            <Flex>
                <Switch
                    size="small"
                    onChange={onChangeMute}
                />
                <Text ml="2px" fontSize="12px" fontWeight="400" color="#7C848C">全员禁言</Text>
            </Flex>
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