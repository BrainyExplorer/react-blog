import React, { useEffect, useState } from "react";
import { marked } from 'marked'
import "../../static/css/AddArticle.css"
import { Row, Col, Input, Select, Button, DatePicker, Space, message } from 'antd'

import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import servicePath from "../../config/apiUrl";

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = () => {
    let params = useParams();
    let navigate = useNavigate()
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别


    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked.parse(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked.parse(e.target.value)
        setIntroducehtml(html)
    }

    const innerhtmlHandler = () => {
        return { __html: markdownContent }
    }
    const innerIntroduceHandler = () => {
        return { __html: '文章简介：' + introducehtml }
    }

    const selectTypeHandler = (value) => {
        setSelectType(value)
    }

    const saveArticle = () => {

        // markedContent()//先进性转化

        if (!selectedType) {
            message.error('必须选择文章类别')
            return false
        } else if (!articleTitle) {
            message.error('文章名称不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }

        let dataProps = {}   //传递到接口的参数
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        dataProps.addTime = (new Date(showDate).valueOf() / 1000)

        //添加文章
        if (articleId === 0) {
            console.log('articleId=:' + articleId)
            dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setArticleId(res.data.insertId)
                    if (res.data.isScuccess) {
                        console.log('gg');
                        message.success('文章保存成功')
                        navigate('/article/articleList')
                    } else {
                        message.error('文章保存失败');
                    }

                }
            )
        } else {//修改文章
            dataProps.id = articleId
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                header: { 'Access-Control-Allow-Origin': '*' },
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                        navigate('/article/articleList')
                    } else {
                        message.error('保存失败');
                    }
                }
            )
        }
    }

    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {
            withCredentials: true,
            header: { 'Access-Control-Allow-Origin': '*' }
        }).then(
            res => {
                //let articleInfo= res.data.data[0]
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html = marked.parse(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked.parse(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)

            }
        )
    }
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            headers: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            res => {
                if (res.data.data === '没有登录') {
                    localStorage.removeItem('userInfo')
                    navigate('/')
                } else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    useEffect(() => {
       
        getTypeInfo()
        //获得文章ID
        let tmpId = params.id
        if (tmpId!==':id') {
            console.log('tem',tmpId)
            setArticleId(tmpId)
            getArticleById(tmpId)
        }else{
            console.log('添加');
            setArticleContent('')
            setMarkdownContent("")
            setSelectType(1)
            setArticleTitle('')
            setIntroducemd('')
            setIntroducehtml('')
            setShowDate("")
        }
    }, [params.id])



    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                placeholder="博客标题"
                                size="large"
                                onChange={e => {
                                    setArticleTitle(e.target.value)
                                }}
                            ></Input>
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.Id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />

                        </Col>
                        <Col span={12}>
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={innerhtmlHandler()} >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Space>
                                <Button size="large">暂存文章</Button>
                                <Button type="primaru" size="large" onClick={saveArticle}>发布文章</Button>
                                <br />
                            </Space>
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                placeholder="文章简介"
                            />
                            <div
                                className="introduce-html"
                                dangerouslySetInnerHTML={innerIntroduceHandler()} >
                            </div>
                            <br />
                            <br />

                            <div className="introduce-html"></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date, dateString) => { setShowDate(dateString) }}
                                    placeholder="发布日期"
                                    size="large"></DatePicker>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle