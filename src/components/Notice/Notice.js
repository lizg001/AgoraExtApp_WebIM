import { useSelector } from "react-redux";
import cx from 'classnames'
import { Input } from 'antd'
import { Flex, Text, Image, Button } from 'rebass'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
// import { UpdateRoomNotice } from '../../api/chatroom'
import icon_notice from '../../themes/img/icon_notice.png'
import './notice.css'

const { TextArea } = Input;
const Notice = ({ isEdit, isEditNoticeChange }) => {
    const userName = useSelector((state) => state.loginName);
    const noticeAdmins = useSelector((state) => state.room.admins);
    const noticeContent = useSelector((state) => state.room.notice);
    // 显示公告编辑框  
    const onEdit = () => {
        isEditNoticeChange(true);
    };
    //  关闭公告编辑框
    const onView = () => {
        isEditNoticeChange(false);
    };
    // 修改公告

    // 判断权限
    const hasEditPermisson = userName.includes(noticeAdmins);
    // 判断公告字数，显示更多
    const shouldShowEllipsis = noticeContent?.length > 43;
    console.log('shouldShowEllipsis', shouldShowEllipsis);
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

    const changeText = (e) => {
        // console.log(e.target.defaultValue);

    }
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
            'notice__isEdit': isEdit
        })}>
            {
                isEdit ? (
                    <div>
                        <Flex alignItems="center" color="#A8ADB2" mb="10px">
                            <LeftOutlined onClick={onView} />
                            <Text fontSize="14px" fontWeight="500" color="#D3D6D8" className="title_center">公告</Text>
                        </Flex>
                        <TextArea
                            placeholder="请输入公告..."
                            bordered={false}
                            onClick={(value) => changeText(value)}
                            style={{
                                height: '180px',
                                width: '100%',
                                background: '#263340',
                                color: '#a8adb2',
                                fontSize: "14px",
                                fontWeight: "400",
                                marginBottom: '5px'
                            }}
                        />
                        <Button
                            variant='primary'
                            mr={2}
                            css={{
                                background: '#7ECBFF',
                                borderRadius: '18px',
                                width: '100%',
                                cursor: 'pointer'
                            }}
                        >保存</Button>
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
                                    <div className="content_box">
                                        {shouldShowEllipsis ? noticeContent.slice(0, 40) + "..." : noticeContent}
                                    </div>
                                ) : (
                                        <div className="content_no">
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

