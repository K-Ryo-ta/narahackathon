import { createContext, useContext, useState } from 'react';
import Page1 from './q1/page';
import Page2 from './q2/page';
import Page3 from './q3/page';
import Page4 from './q4/page';
import Page5 from './q5/page';
import FinishPage from './finish/page';

const stateInfo = {
    question: 5,
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
};

const StateContext = createContext(stateInfo);

function StateManegement() {

    return (
        <div className="StateMangement">
            <StateContext.Provider value={stateInfo}>
                <Page1 />
                <Page2 />
                <Page3 />
                <Page4 />
                <Page5 />
                <FinishPage />
            </StateContext.Provider>
        </div>
    );
}

export default StateContext;
