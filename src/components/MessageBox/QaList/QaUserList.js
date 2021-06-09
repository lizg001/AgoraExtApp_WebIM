import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Image, Flex } from 'rebass'
import _ from 'lodash'
import store from '../../../redux/store'
import { removeShowRed } from '../../../redux/aciton'
import QaMessage from './QaMessage'
import './QaMessage.css'
import avatarUrl from '../../../themes/img/avatar-big@2x.png'

const QaUserList = ({ getClickUser }) => {
    const roomListInfo = useSelector(state => state.userListInfo)
    const qaList = useSelector(state => state.messages.qaList);
    const [currentUser, setCurrentUser] = useState('');
    const isQaList = (Object.keys(qaList)).length === 0

    // 遍历，拿到需要的ID和时间
    let newUser = [];
    _.forEach(qaList, function (v, k) {
        newUser.push({ id: k, time: v.time })
    })
    // 根据 时间进行排序
    let sortArr = _.orderBy(newUser, ['time'], ['desc'])


    // 拿到需要回复提问者id
    const getUser = (user) => {
        getClickUser(user)
        setCurrentUser(user)
        store.dispatch(removeShowRed(user))
    }
    return (
        <Flex style={{height: '100%'}}>
            {
                isQaList ? (
                    <div className='qa-mark '>
                        <div className='qa-card'>暂无提问</div>
                    </div>
                ) : (
                        <div className='user-border'>
                            {
                                sortArr.map((user, k) => {
                                    return (
                                        <Flex onClick={() => getUser(user.id)} key={k} className="qa-user-list" m="6px" style={{backgroundColor: currentUser === user.id ? "#2D3340" : "transparent"}}>
                                            <Image src={roomListInfo[user.id].avatarurl || avatarUrl}
                                                className="qa-user-image"
                                            />
                                            {qaList[user.id].showRedNotice && (
                                                <div className='qa-red-notice'></div>
                                            )}
                                        </Flex>
                                    )
                                })
                            }
                        </div>
                    )
            }
            {/*  */}
            < QaMessage currentUser={currentUser} />
        </Flex>
    )
}

export default QaUserList;