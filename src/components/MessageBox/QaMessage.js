import { Flex, Text, Image } from 'rebass'
const QaMessage = ({ qaList }) => {
    console.log('qaList---', qaList);


    return (
        <div>
            {
                qaList.map((message) => {
                    let messageType = message.type === 'txt' || message.contentsType === 'TEXT';
                    console.log('QaMessage----', message);
                    return (
                        <Flex key={message.id} justifyContent='flex-start'>
                            <Flex justifyContent='center' alignItems='center' style={{
                                width: '52px',
                                height: '52px',
                                background: '#263340'
                            }}>
                                <Image src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'
                                    className='msg-img' width='28px' height='28px'
                                />
                            </Flex>
                            <div>
                                <Flex>
                                    <div>
                                        <Image src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-fde5891065510ef51e4c8dc19f6f3aff_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624035646&t=52e70633abb73d7e2e0d2bd3f0446505'
                                            className='msg-img'
                                        />
                                    </div>
                                    <div>
                                        <Text className='msg-sender' ml='8px'>{'' || message.from}</Text>
                                    </div>
                                </Flex>
                                {
                                    messageType ? (
                                        <div className='msg'>
                                            <Text>{message.msg || message.data}</Text>
                                        </div>
                                    ) : (
                                            <div className='msg' >
                                                图片消息
                                                {/* <Image src={message.customExts.url} width='24px' height='24px'></Image> */}
                                            </div>
                                        )
                                }
                            </div>
                        </Flex>
                    )
                })
            }
        </div>
    )
}

export default QaMessage;