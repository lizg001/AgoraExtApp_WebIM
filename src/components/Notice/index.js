import React from 'react'
import { useSelector } from "react-redux";
import cx from 'classnames'
import ShowNotice from './ShowNotice'
import EditNotice from './EditNotice'
import './index.css'

const Notice = ({ isEdit, isEditNoticeChange }) => {
    const userName = useSelector((state) => state.loginName);
    const roomOwner = useSelector(state => state.room.info.owner)
    const roomAdmins = useSelector((state) => state.room.admins);
    const noticeContent = useSelector((state) => state.room.notice);
    // 显示公告编辑框  
    const onEdit = () => {
        isEditNoticeChange(true);
    };
    // 关闭公告编辑框
    const onView = () => {
        isEditNoticeChange(false);
    };
    // 判断权限是否为 admin 或 owner
    const hasEditPermisson = roomAdmins.includes(userName) || userName === roomOwner;
    return (
        <div className={cx("notice", {
            'notice-isEdit': isEdit
        })}>
            {
                isEdit ? (
                    <div>
                        < EditNotice hasEditPermisson={hasEditPermisson} noticeContent={noticeContent} onView={onView} />
                    </div>
                ) : (
                        < ShowNotice hasEditPermisson={hasEditPermisson} noticeContent={noticeContent} onEdit={onEdit} />
                    )
            }
        </div >
    )

}
export default Notice;

