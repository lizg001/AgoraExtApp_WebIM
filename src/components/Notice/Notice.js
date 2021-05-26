import React from 'react'
import { useSelector } from "react-redux";
import cx from 'classnames'
import { Flex, Text, Image } from 'rebass'
import { RightOutlined } from '@ant-design/icons'
// import {role} from '../../constants/role'
import EditNotice from './EditNotice'
import icon_notice from '../../themes/img/icon_notice.png'
import './notice.css'


const Notice = ({ isEdit, isEditNoticeChange }) => {
    const userName = useSelector((state) => state.loginName);
    const roomId = useSelector((state) => state.room.info.id);
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
    // 判断权限是否为 admin
    const hasEditPermisson = roomAdmins.includes(userName);

    // 判断公告字数，显示更多
    const shouldShowEllipsis = noticeContent?.length > 41;
    // 助教权限，可直接展示编辑
    const Edit = () => {
        return (
            <Flex fontSize="12px" color="#0099ff" css={{
                cursor: "pointer"
            }} >
                <Text onClick={onEdit}>
                    编辑
                </Text>
            </Flex>
        )
    };
    // 展示更多
    const More = () => {
        return (
            <Flex alignItems="center" justifyContent="space-between" color="#A8ADB2" css={{
                cursor: "pointer"
            }}>
                <Text fontSize="12px" fontWeight="500" onClick={onEdit}>更多</Text>
                <RightOutlined />
            </Flex>
        )
    }
    return (
        <div className={cx("notice", {
            'notice-isEdit': isEdit
        })}>
            {
                isEdit ? (
                    <div>
                        < EditNotice roomId={roomId} noticeContent={noticeContent} onView={onView} />
                    </div>
                ) : (
                        <>
                            <Flex alignItems="center" justifyContent="space-between" p="2px">
                                <Flex alignItems="center" color="#A8ADB2">
                                    <Image src={icon_notice} css={{
                                        width: '14px',
                                        height: '14px',
                                        objectFit: 'cover'
                                    }} />
                                    <Text ml="2px" fontSize="12px" fontWeight="500" whiteSpace="nowrap">公告:</Text>
                                </Flex>
                                {hasEditPermisson && <Edit />}
                                {shouldShowEllipsis && <More />}
                            </Flex >
                            <div className="content">
                                {noticeContent ? (
                                    <div className="content-box">
                                        {shouldShowEllipsis ? noticeContent.slice(0, 40) + "..." : noticeContent}
                                    </div>
                                ) : (
                                        <div className="content-no">
                                            <span>暂无公告</span>
                                        </div>
                                    )}
                            </div>
                        </>
                    )
            }
        </div >
    )

}
export default Notice;

