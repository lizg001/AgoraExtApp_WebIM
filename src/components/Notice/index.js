import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import cx from 'classnames'
import ShowNotice from './ShowNotice'
import EditNotice from './EditNotice'
import './index.css'

const Notice = ({ isEdit, isEditNoticeChange }) => {
    const isTeacher = useSelector(state => state.loginInfo.ext)
    const noticeContent = useSelector((state) => state.room.notice);
    const [roomAnnouncement, setRoomAnnouncement] = useState('')

    useEffect(() => {
        setRoomAnnouncement(noticeContent)
    }, [noticeContent])

    // 显示公告编辑框  
    const onEdit = () => {
        isEditNoticeChange(true);
    };
    // 关闭公告编辑框
    const onView = () => {
        isEditNoticeChange(false);
    };
    // 判断权限是否为 admin 或 owner
    const hasEditPermisson = (Number(isTeacher) === 3)
    return (
        <div className={cx("notice", {
            'notice-isEdit': isEdit
        })}>
            {
                isEdit ? (
                    <div>
                        < EditNotice hasEditPermisson={hasEditPermisson} roomAnnouncement={roomAnnouncement} onView={onView} />
                    </div>
                ) : (
                        < ShowNotice hasEditPermisson={hasEditPermisson} roomAnnouncement={roomAnnouncement} onEdit={onEdit} />
                    )
            }
        </div >
    )

}
export default Notice;

