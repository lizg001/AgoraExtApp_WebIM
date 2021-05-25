import { useState, useSelector } from 'react'




const MoreNotice = () => {
    // 公告栏编辑字数
    const [count, setCount] = useState(0);
    // 公告栏内容
    const [noticeCentent, setNoticeContent] = useState('')
    // 在 store 获取roomId
    const roomId = useSelector((state) => state.room.info.id);

    // 公告内容修改
    const changeCount = (e) => {
        let noticeCentent = e.target.value;
        let noticeCount = noticeCentent.length;
        setCount(noticeCount);
        setNoticeContent(noticeCentent);
    }

    return (
        <div>
            <Flex alignItems="center" color="#A8ADB2" mb="10px">
                <LeftOutlined onClick={onView} />
                <Text ml='90px' fontSize="14px" fontWeight="500" color="#D3D6D8" className="title_center">公告</Text>
            </Flex>
            <TextArea
                placeholder="请输入公告..."
                onChange={(e) => changeCount(e)}
                style={{
                    height: '180px',
                    width: '100%',
                    background: '#1F2933',
                    color: '#a8adb2',
                    fontSize: "12px",
                    fontWeight: "400",
                    marginBottom: '5px',
                    paddingLeft: '3px'
                }}
            />
            <Flex justifyContent='flex-end' mb='5px' color='#999999'>{count}/300</Flex>
            <Button
                variant='primary'
                css={{
                    borderRadius: '18px',
                    width: '100%',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    UpdateRoomNotice(roomId, noticeCentent);
                    onView();
                }}
            >保存</Button>
        </div>
    )
}

export default MoreNotice;