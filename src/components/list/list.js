import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import {fetch_data} from "../../tool/get_data";


const Option = ({item, new_surveys, setNew_surveys}) => {
    const [topics_titles, setTopics_titles] = useState([])
    useEffect(async () => {
        const res = await fetch_data("topics", "GET")
        if (res.code === 201) {
            const topics_titles = res.data.map(topic => topic.topicTitle)
            setTopics_titles(topics_titles)
        }

    }, [topics_titles.length])

    return (<div className="detail-li">
        <div className="detail-input">
            <select name="sel-topic" className="sel-1" value={item.topicTitle}
                    onChange={(e) => {
                        const t = [...new_surveys]
                        t.find(new_survey => new_survey.id === item.id).topicTitle = e.target.value
                        setNew_surveys(t)
                    }}>
                {topics_titles.map((item, index) => <option key={index}>
                    {item}
                </option>)}
            </select>
        </div>
        <div className="detail-del">
            <a className="btn-1" onClick={() => {
                let t = [...new_surveys]
                const index = t.findIndex(new_survey => new_survey.id === item.id)
                t.splice(index, 1)
                setNew_surveys(t)
            }}>Delete</a>
        </div>
    </div>)
}

const Input = ({item, new_questions, setNew_questions}) => {
    return (
        <div className="detail-li row d-flex align-items-center">
            <div className="detail-input col-10">
                <input type="email" className="form-control" value={item.questionTitle}
                       placeholder="input question" onChange={(e) => {
                    const copy = [...new_questions]
                    copy.find(topic => topic.questionId === item.questionId).questionTitle = e.target.value
                    setNew_questions(copy)
                }}/>
            </div>
            <div className="detail-del col-2">
                <a className="btn-1" onClick={() => {
                    let t = [...new_questions]
                    const index = t.findIndex(topic => topic.questionId === item.questionId)
                    t.splice(index, 1)
                    setNew_questions(t)
                }}>Delete</a>
            </div>
        </div>)
}

const List = ({action, object, setAction, setObject, is_survey, setIs_survey}) => {

    const [surveys, setSurveys] = useState([])
    const [topics, setTopics] = useState([])

    const [new_topics, setNew_topics] = useState([])
    const [new_questions, setNew_questions] = useState([{questionId: 0, questionTitle: ""}])

    const [topic_doc_id, setTopic_doc_id] = useState(null)
    const location = useLocation()

    // const [is_return,setIs_return] = useState(true)

    const add_topic = async () => {
        if (!topic_doc_id) {
            const topicTitle = "topic" + (topics.length + 1)
            const res = await fetch_data("add_topic", "POST", {topicTitle, questions: new_questions})
            if (res.code === 201)
                setAction("view")
        } else {
            const topic = topics.find(item => item.id === topic_doc_id)
            topic.questions = new_questions
            const res = await fetch_data("set_topic", "POST", topic)
            if (res.code === 201)
                setAction("view")
        }

        setTopic_doc_id(null)

    }
    const add_topic_local = async () => {

        let id = 0
        if (new_topics.length !== 0)
            id = new_topics[new_topics.length - 1].id + 1
        let topicTitle

        if (topics.length === 0) {
            const data = await fetch_data("topics", "GET")
            if (data.code === 201)
                setTopics(data.data)
            topicTitle = data.data[0].topicTitle
        } else {
            topicTitle = topics[0].topicTitle
        }

        const t = [...new_topics, {id, topicTitle}]
        setNew_topics(t)

    }
    const history = useHistory()

    useEffect(async () => {
            if (action === "view") {

                let data = await fetch_data("surveys", "GET")
                if (data.code === 201)
                    setSurveys(data.data)

                data = await fetch_data("topics", "GET")

                if (data.code === 201)
                    setTopics(data.data)

                // setIs_return(false)


            } else {

                if (location.state  && location.state.new_topics)
                    setNew_topics(location.state.new_topics)

                // setIs_return(true)
            }

            if (is_survey)
                setIs_survey(false)
        }, [action]
    )


    return (
        <>
            {action === "view" && <div className="xiang-control detail">
                <div className="operation my-5 d-flex justify-content-between align-items-center">
                    <h3 className="text-primary">{object} view</h3>
                    <a className="btn-2" onClick={() => {

                        setAction("modification")
                    }}>new {object}s</a>
                </div>

                <div className="con-detail ">
                    <div className="box-detail">
                        {object === "survey" && <ol className="list-group list-group-numbered ">
                            {surveys.map(((survey, index) =>
                                    <li onClick={() => {
                                        if (survey.selectedTopics.length === 0)
                                            return
                                        const path = {
                                            pathname: "/survey",
                                            state: {
                                                selectedTopics: survey.selectedTopics,
                                                is_save: false
                                            },
                                        }

                                        history.push(path)
                                    }} key={index} className="list-group-item btn-link">{survey.surveyTitle}</li>
                            ))}</ol>}

                        {object === "topic" && <ol className="list-group list-group-numbered ">
                            {topics.map(((topic, index) => <li
                                    onClick={() => {
                                        setNew_questions(topic.questions)
                                        setAction("modification")
                                        setTopic_doc_id(topic.id)
                                    }} key={index} className="list-group-item btn-link">{topic.topicTitle}</li>
                            ))}
                        </ol>}
                    </div>
                </div>
            </div>}

            {action === "modification" && <>
                {object === "survey" && <div className="xiang-control detail">

                    <div className="operation my-5">
                        <a className="btn-2" onClick={() => {
                            if (new_topics.length === 0)
                                return
                            const path = {
                                pathname: "/survey",
                                state: {
                                    selectedTopics: new_topics,
                                    is_save: false
                                },
                            }
                            history.push(path)
                        }}>View Detail</a>
                        <a className="btn-4" onClick={
                            async () => {
                                if (topics.length === 0) {
                                    const data = await fetch_data("topics", "GET")
                                    if (data.code === 201)
                                        setTopics(data.data)
                                }

                                const new_survey = {
                                    surveyTitle: "surveys" + (surveys.length + 1), selectedTopics: new_topics
                                }

                                const res = await fetch_data("add_survey", "POST", new_survey)

                                if (res.code === 201) {
                                    if (new_topics.length === 0)
                                        return
                                    const path = {
                                        pathname: "/survey",
                                        state: {
                                            selectedTopics: new_topics,
                                            is_save: true
                                        },
                                    }
                                    history.push(path)
                                }

                            }
                        }>Save</a>
                    </div>

                    <div className="con-detail">
                        <form id="surveys-form" className="box-detail">

                            <div className="tit">
                                <input id="surveys-tit" name="surveys-tit" className="txt-2" type="text"
                                       placeholder="Please input surveys name."/>
                            </div>
                            <div className="box-li pt-5">
                                {new_topics.map((item, index) => {
                                        return <Option item={item} key={item.id} new_surveys={new_topics}
                                                       setNew_surveys={setNew_topics}/>
                                    }
                                )}
                            </div>

                            <div className="detail-add">
                                <input type="button" className="btn-3 add-topic-btn" value="Add A Topic"
                                       onClick={async () => {
                                           await add_topic_local()
                                       }}/>
                            </div>
                        </form>
                    </div>
                </div>}

                {object === "topic" && <div className="xiang-control detail">

                    <div className="operation my-5">

                        <a className="btn-4" onClick={async () => {
                            await add_topic()
                        }}>Save</a>
                    </div>

                    <div className="con-detail">
                        <form id="surveys-form" className="box-detail">

                            <div className="box-li pt-5">
                                {new_questions.map((item, index) =>
                                    <Input item={item} key={index} new_questions={new_questions}
                                           setNew_questions={setNew_questions}/>
                                )}

                            </div>


                            <div className="detail-add">
                                <input type="button" className="btn-3 add-topic-btn" value="Add A Question"
                                       onClick={() => {
                                           const t = [...new_questions, {
                                               questionId: new_questions[new_questions.length - 1].questionId + 1,
                                               questionTitle: ""
                                           }]
                                           setNew_questions(t)
                                       }}/>
                            </div>
                        </form>
                    </div>
                </div>}
            </>}


        </>
    )

}
export {List}





