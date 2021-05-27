import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Image, Flex } from 'rebass'
import QaMessage from './QaMessage'
import './qaMessage.css'

const QaUserList = ({ getClickUser }) => {
    const qaList = useSelector(state => state.messages.qaList) || {};
    const users = Object.keys(qaList)
    const [currentUser, setCurrentUser] = useState(users[0]);
    const isQaList = (Object.keys(qaList)).length === 0

    useEffect(() => {
        getClickUser(currentUser)
        setCurrentUser(currentUser)
    }, [getClickUser, currentUser])

    // 拿到需要回复提问者id
    const getUser = (user) => {
        getClickUser(user)
        setCurrentUser(user)
    }
    return (
        <Flex>
            {
                isQaList ? (
                    <></>
                ) : (
                        <div>
                            {
                                users.map((user, k) => {
                                    return (
                                        <Flex onClick={() => getUser(user)} key={k} className="qa-user-list">
                                            <Image src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'
                                                className="qa-user-image"
                                            />
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