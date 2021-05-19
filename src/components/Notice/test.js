const MODE = {
    view: "view",
    edit: "edit",
};


const NoticeDetailOrEditPanel = ({ content, isEdit }) => {
    return (
        <div>
            <textarea></textarea>
            {isEdit && (
                <button
                    onClick={() => {
                        console.log("保存");
                    }}
                >
                    保存
                </button>
            )}
        </div>
    );
};
export const Notice = ({ content }) => {
    const [visible, setVisible] = useState(false);
    const [mode, setMode] = useState(MODE.view);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const roleId = useSelector((state) => state.roleId);
    // const hasEditPermission = roleId === ROLE.assistant.id;
    // 假设最多展示 20 个字符
    const shouldShowEllipsis = content?.length > 20;
    const toEdit = () => {
        showDrawer();
        setMode(MODE.edit);
    };
    const Edit = useMemo(() => {
        return <span onClick={toEdit}>去编辑</span>;
    }, [showDrawer]);
    return (
        <div className="notice">
            <header>
                <span>公告</span>
                {shouldShowEllipsis && <button onClick={showDrawer}>更多</button>}
            </header>
            <div>
                {Boolean(content) ? (
                    <div>
                        {shouldShowEllipsis ? content.slice(0, 19) + "..." : content}
                        {<Edit />}
                        {/* {hasEditPermission && <Edit />} */}
                    </div>
                ) : (
                        <div>
                            <span>暂无公告</span>
                            <text onClick={() => updateRoomAnnouncement()}>去编辑</text>
                            {<Edit />}
                            {/* {hasEditPermission && <Edit />} */}
                        </div>
                    )}
            </div>
            <Drawer
                title="公告"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <NoticeDetailOrEditPanel
                    content={content}
                    isEdit={mode === MODE.edit}
                />
            </Drawer>
        </div>
    );
};

// const owner = useSelector((state) => state.room.info.owner);
    // const admins = useSelector((state) => state.room.admins);
    // const roomId = useSelector((state) => state.room.info.id);
    // const notice = useSelector((state) => state.room.notice);
    // console.log('owner--', owner);
    // console.log('admins--', admins);
    // console.log('notice--', notice);
    // console.log('roomId--', roomId);