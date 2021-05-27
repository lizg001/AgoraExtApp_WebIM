
import { Flex, Text, Image } from 'rebass'
import { RightOutlined } from '@ant-design/icons'
import icon_notice from '../../themes/img/icon_notice.png'


const ShowNotice = ({ hasEditPermisson, noticeContent, onEdit }) => {

    // 判断公告字数，显示更多
    const shouldShowEllipsis = noticeContent?.length > 39;
    // 辅导权限，可直接展示编辑
    const Edit = () => {
        return (
            <Flex fontSize="12px" color="#0099ff" css={{ cursor: "pointer" }} >
                <Text onClick={onEdit}> 编辑 </Text>
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
        <div>
            <Flex alignItems="center" justifyContent="space-between" p="2px">
                <Flex alignItems="center" color="#A8ADB2">
                    <Image src={icon_notice} style={{ width: '14px' }} />
                    <Text ml="2px" fontSize="12px" fontWeight="500" whiteSpace="nowrap">公告:</Text>
                </Flex>
                {hasEditPermisson && <Edit />}
                {shouldShowEllipsis && <More />}
            </Flex >
            <div className="content">
                {noticeContent ? (
                    <div className="content-box">
                        {shouldShowEllipsis ? noticeContent.slice(0, 38) + "..." : noticeContent}
                    </div>
                ) : (
                        <div className="content-no">
                            <span>暂无公告</span>
                        </div>
                    )}
            </div>

        </div>
    )
}
export default ShowNotice;