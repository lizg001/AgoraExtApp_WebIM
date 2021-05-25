

const MuteList = ({ roomMuteList, searchUser }) => {
    let showMuteList = searchUser === '' || roomMuteList === []
    if (!showMuteList) {
        return null
    }
    return (
        <div>
            {
                roomMuteList.map((member) => {
                    return <div key={member.user}>
                        {member.user}
                    </div>
                })
            }
        </div>
    )
}
export default MuteList;