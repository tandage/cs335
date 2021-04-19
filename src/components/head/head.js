import {useEffect, useState} from "react";
import {Log} from "../Log/log";

const Head = ({setAction,setObject, is_login,setIs_login,object,is_survey}) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [selected, setSelected] = useState(true)
    const [email_name,setEmail_name] = useState("")
    useEffect(() => {
        if (object === "survey")
            setSelected(true)
        else
            setSelected(false)
    }, [object])

    return (<>
            {!is_survey && <div className="xiang-control detail">
                <div className="bar-top-1">
                    <a className="tit" onClick={()=>setAction("view")}>Surveys Maker System</a>
                    <div className="account" onClick={() => {
                        if (!is_login)
                            handleShow()
                    }}>{!is_login ? "login" : email_name}</div>
                    <div className="nav-con">
                        <a className={"nav-li " + (selected ? "sel" : "")} onClick={() => setObject("survey")}>Surveys
                            List</a>
                        <a className={"nav-li " + (selected ? "" : "sel")} onClick={() => setObject("topic")}>Topic
                            List</a>
                    </div>
                </div>
            </div>}

            {is_survey && <div className="xiang-control view client">
                <div className="page-contain">
                    <div className="bar-top-2 tit-contain">
                        <div className="tit tit-bar">
                            <div className="tit-label">
                                <p id="surveys-tit">
                                    Corporate Employee Happiness Survey.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            <Log show={show} handleClose={handleClose} setIs_login={setIs_login} setEmail_name={setEmail_name}></Log>
        </>
    )
}

export {Head}