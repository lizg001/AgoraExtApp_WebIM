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

    const qaList = useSelector(state => state.messages.qaList) || [];
    const users = Object.keys(qaList)
    const newUsers = _.reverse(users)
    const [currentUser, setCurrentUser] = useState(users[0]);
    const isQaList = (Object.keys(qaList)).length === 0

    // 拿到需要回复提问者id
    const getUser = (user) => {
        getClickUser(user)
        setCurrentUser(user)
        store.dispatch(removeShowRed(user))
    }
    return (
        <Flex>
            {
                isQaList ? (
                    <div className='qa-mark '>
                        <div className='qa-card'>暂无提问</div>
                    </div>
                ) : (
                        <div className='user-border'>
                            {
                                newUsers.map((user, k) => {
                                    return (
                                        <Flex onClick={() => getUser(user)} key={k} className="qa-user-list">
                                            <Image src={roomListInfo[user].avatarurl || avatarUrl}
                                                className="qa-user-image"
                                            />
                                            {qaList[user].showRedNotice && (
                                                <div className='qa-red-notice'></div>
                                            )}
                                        </Flex>
                                    )
                                })
                            }
                        </div>
                    )
            }
            < QaMessage currentUser={currentUser} />
        </Flex>
    )
}

export default QaUserList;