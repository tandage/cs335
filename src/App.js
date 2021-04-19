import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {List} from "./components/list/list";
import {Head} from "./components/head/head";
import {Survey} from "./components/survey/survey";
import {Result} from "./components/result/result";

function App() {
    const [action, setAction] = useState("view")
    const [object, setObject] = useState("survey")
    const [is_login, setIs_login] = useState(false)
    const [is_survey, setIs_survey] = useState(false)
    useEffect(() => {
        console.log(is_survey)
    }, [is_survey])
    return (<>

            <Router>

                <Switch>
                    <Route exact path="/">
                        <Head setAction={setAction} setObject={setObject} is_login={is_login} setIs_login={setIs_login}
                              object={object} is_survey={is_survey}/>
                        <List action={action} object={object} setAction={setAction} setObject={setObject}
                              is_survey={is_survey} setIs_survey={setIs_survey}/>
                    </Route>
                    <Route path="/survey">
                        <Head setAction={setAction} setObject={setObject} is_login={is_login} setIs_login={setIs_login}
                              object={object} is_survey={is_survey}/>
                        <Survey setIs_survey={setIs_survey}/>
                    </Route>
                    <Route path="/result">
                        <Head setAction={setAction} setObject={setObject} is_login={is_login} setIs_login={setIs_login}
                              object={object} is_survey={is_survey}/>
                        <Result setIs_survey={setIs_survey}/>
                    </Route>


                </Switch>

            </Router>
        </>
    )

}

export default App;
