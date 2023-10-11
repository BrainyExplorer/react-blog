
import { Avatar, Divider } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';

import Image from 'next/image'
import styles from './Author.module.css'
import profilePic from '../../static/image/my.jpg'

const Author = () => {

    return (
        <div className={styles.author_div + ' comm-box'}>
            <div  >
                <Image
                    className={styles.my_profile}
                    src={profilePic}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    priority
                /></div>
            <div className={styles.author_introduction}>
                小熊软糖，在校大三学生，专注于前端开发
                <Divider>社交账号</Divider>
                <Avatar shape="circle" size={28} icon={<GithubOutlined />} className="account" />
                <Avatar shape="circle" size={28} icon={<QqOutlined />} className="account" />
                <Avatar shape="circle" size={28} icon={<WechatOutlined />} className="account" />
            </div>
        </div>
    )

}

export default Author