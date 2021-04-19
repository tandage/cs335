import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import {fetch_data} from "../../tool/get_data";

const TopicWithQuestion = ({topicTitle, choices, setChoices,is_save}) => {
    const [questions, setQuestions] = useState([])
    useEffect(async () => {
        const res = await fetch_data(`topic?topicTitle=${topicTitle}`, "GET")
        setQuestions(res.data.questions)
    }, [topicTitle])
    const click = (item, symbol) => {
        if (!is_save)
            return
        const t = {...choices}
        t[topicTitle + "_" + item.questionTitle] = symbol
        setChoices(t)
    }
    return (
        <>
            {questions && <>{
                questions.map((item, index) => {
                    return (<div className="quiz-li" key={index}>
                        <div className="radio-box-1">
                            <div className="rb-1-tit">
                                <a className="label-1">
                                    {item.questionTitle}
                                </a>
                            </div>
                            <div className="rb-1-con">
                                <div className="rb-1-li" onClick={() => {
                                    click(item, "G")
                                }}>
                                    <div className="rb-1-left">
                                        {(!choices[topicTitle + "_" + item.questionTitle] || choices[topicTitle + "_" + item.questionTitle] !== "G") &&
                                        <a className="ico-1-green"> </a>}
                                        {choices[topicTitle + "_" + item.questionTitle] === "G" && <span> √ </span>}
                                    </div>
                                    <div className="rb-1-right">
                                        <a className="label-2">
                                            My business has this in place / I am happy with our approach / I
                                            feel that I have sufficient knowledge.
                                        </a>
                                    </div>
                                </div>

                                <div className="rb-1-li" onClick={() => {
                                    click(item, "A")
                                }}>
                                    <div className="rb-1-left">
                                        {(!choices[topicTitle + "_" + item.questionTitle] || choices[topicTitle + "_" + item.questionTitle] !== "A") &&
                                        <a className="ico-1-amber"> </a>}
                                        {choices[topicTitle + "_" + item.questionTitle] === "A" && <span> √ </span>}
                                    </div>
                                    <div className="rb-1-right">
                                        <a className="label-2">
                                            My business has something in place, but I feel it could be improved
                                            / i feel that i would need some support if this situation arose.
                                        </a>
                                    </div>
                                </div>
                                <div className="rb-1-li" onClick={() => {
                                    click(item, "R")
                                }}>
                                    <div className="rb-1-left">
                                        {(!choices[topicTitle + "_" + item.questionTitle] || choices[topicTitle + "_" + item.questionTitle] !== "R") &&
                                        <a className="ico-1-red"> </a>}
                                        {choices[topicTitle + "_" + item.questionTitle] === "R" && <span> √ </span>}
                                    </div>
                                    <div className="rb-1-right">
                                        <a className="label-2">
                                            My business does not have provision for this / I feel unprepared for
                                            this situation.
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                })
            }   </>}
        </>
    )
}

const Survey = ({setIs_survey}) => {
    const history = useHistory()
    const location = useLocation()
    const [index, setIndex] = useState(1)
    const [topics, setTopics] = useState(location.state.selectedTopics)
    const [choices, setChoices] = useState({})
    const [is_save,setIs_save] = useState(location.state.is_save)
    useEffect(()=>{
        setIs_survey(true)
    },[history])
    return (
        <div className="xiang-control view client">
            <div className="page-contain">
                <div className="my-5 d-flex justify-content-end">
                    {!is_save && <a className="btn-5" onClick={() => {
                        const path = {
                            pathname: "/",
                            state: {
                                new_topics: topics,
                                is_return:true
                            },
                        }
                        history.push(path)
                    }}>Copy</a>}
                </div>
                <div className="content-contain">
                    <div className="surveys-con">
                        <div id="chart-0" className="topic-con con-stat red">
                            <div className="tit-topic tit">
                                <div className="label-tit-topic label">
                                    <p id="cur-topic-tit">
                                        {topics[index - 1].topicTitle}
                                    </p>
                                </div>
                                <div className="process-tit-topic process">
                                    <p>
                                        <a id="cur-index">{index}</a>/<a id="topics-amount">{topics.length}</a>
                                    </p>
                                </div>
                            </div>
                            <div className="quiz-con">
                                <div className="quiz-list">
                                    <TopicWithQuestion topicTitle={topics[index - 1].topicTitle}
                                                       key={index - 1}
                                                       choices={choices}
                                                       setChoices={setChoices}
                                                       is_save={is_save}/>
                                </div>

                                <div className="opera-quiz mb-5">
                                    <div className="previous-opera" onClick={() => {
                                        if (index - 1 >= 1)
                                            setIndex(index - 1)
                                    }}>
                                        <a className="btn-6">Previous</a>
                                    </div>
                                    <div className="next-opera" onClick={() => {
                                        if (index + 1 <= topics.length)
                                            setIndex(index + 1)
                                        else if (index === topics.length){
                                            if (is_save)
                                                history.push("/result")
                                        }

                                    }}>
                                        <a className="btn-6">Next</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Survey}
