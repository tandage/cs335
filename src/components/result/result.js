import {useEffect} from "react";

export const Result = ({setIs_survey}) => {
    useEffect(()=>{
        setIs_survey(true)
    },[""])
    return (<div className="xiang-control stat client">
            <div className="page-contain">

                <div className="opera-contain">
                    <div className="opera-download">
                        <a className="btn-5">
                            Download
                        </a>
                    </div>
                </div>
                <div className="content-contain">
                    <div className="surveys-con">
                        <div id="chart-0" className="topic-con con-stat red">
                            <div className="tit-topic tit">
                                <div className="label-tit-topic label">
                                    <p id="cur-topic-tit">
                                        Hours of Work and Leave
                                    </p>
                                </div>
                                <div className="process-tit-topic process">
                                    <p>
                                        <a id="cur-index">1</a>/<a id="topics-amount">8</a>
                                    </p>
                                </div>
                            </div>
                            <div className="quiz-con">
                                <div className="tit-quiz">
                                    <p>
                                    </p>
                                </div>
                                <div className="charts-quiz">
                                    <div className="chart-left pie-chart-1">
                                        <div id="pie-chart-1" className="pie-con">

                                        </div>
                                    </div>
                                    <div className="chart-right bar-chart-1">
                                        <div className="bar-con">
                                            <div className="label">
                                                <p>
                                                    G
                                                </p>
                                                <p>
                                                    A
                                                </p>
                                                <p>
                                                    R
                                                </p>
                                            </div>
                                            <div id="bar-chart-1" className="bar">

                                            </div>
                                        </div>
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
