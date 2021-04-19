import React from "react";
import {Modal} from "react-bootstrap";
import {fetch_data} from "../../tool/get_data";

const {useState} = require("react");

const Log = ({show, handleClose, setIs_login, setEmail_name}) => {
    const [login_or_register, setLogin_or_register] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeat_password, setRepeat_setPassword] = useState("")
    const [msg,setMsg] = useState("")

    const login = async () => {
        const res = await fetch_data("login", "POST",{email, password})
        console.log(res)
        if (res.code === 201) {
            setEmail_name(email)
            setIs_login(true)
            handleClose()
        } else {
            setMsg(res.msg)
            setTimeout(function(){ setMsg("") }, 3000);
        }

    }

    const register = async () => {
        if (password !== repeat_password){
            setMsg("password and repeat_password do not match")
            setTimeout(function(){ setMsg("") }, 3000);
            return
        }

        const res = await fetch_data("register","POST", {email, password})
        if (res.code === 201) {
            setMsg("register success, please login")
            setTimeout(function(){ setMsg("") }, 3000);
            setLogin_or_register(true)
        } else {
            setMsg(res.msg)
            setTimeout(function(){ setMsg("") }, 3000);
        }

    }
    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <div className="mx-auto text-center mt-2">
                    <h1>{login_or_register ? "Login" : "register"}</h1>
                </div>
                <br/>
            </Modal.Header>

            <Modal.Body>
                {login_or_register && <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail_login" className="col-sm-2 col-form-label">Email:</label>
                        <div className="col-sm-10 input-group">
                            <input type="email" className="form-control" id="inputEmail_login" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <span className="input-group-text" id="basic-addon1">u</span>
                        </div>


                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword_login" className="col-sm-2 col-form-label">Password:</label>
                        <div className="col-sm-10 input-group">
                            <input type="password" className="form-control" id="inputPassword_login" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <span className="input-group-text" id="basic-addon2">p</span>
                        </div>
                    </div>
                </form>}

                {!login_or_register && <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail_register" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10 input-group">
                            <input type="email" className="form-control" id="inputEmail_register" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <span className="input-group-text" id="basic-addon3">@</span>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword_register" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10 input-group">
                            <input type="password" className="form-control" id="inputPassword_register" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <span className="input-group-text" id="basic-addon4">@</span>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword_repeat_register"
                               className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10 input-group">
                            <input type="password" className="form-control" id="inputPassword_repeat_register"
                                   value={repeat_password}
                                   onChange={(e) => setRepeat_setPassword(e.target.value)}/>
                            <span className="input-group-text" id="basic-addon5">@</span>
                        </div>
                    </div>
                </form>}
            </Modal.Body>

            <Modal.Footer>
                <div className="text-end d-flex flex-nowrap">
                    <span className="text-danger  font-weight-bolder">{msg}</span>

                    <button type="button" className="btn btn-outline-primary mx-5"
                            onClick={() => {

                                setLogin_or_register(!login_or_register)
                            }}>
                        {login_or_register ? "Register" : "Login"}
                    </button>
                    <button type="button" className="btn btn-outline-primary "
                            onClick={async () => {
                                setMsg("")
                                if (login_or_register)
                                    await login()
                                else
                                    await register()
                            }}>
                        confirm
                    </button>
                </div>
            </Modal.Footer>
        </Modal>

    )
}
export {Log}

