import { createContext, useContext, useState } from 'react';
import Page1 from './q1/page';
import Page2 from './q2/page';
import Page3 from './q3/page';
import Page4 from './q4/page';
import Page5 from './q5/page';
import FinishPage from './finish/page';

type StateType = {
    question: number;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    docRefID1: string | null;
    docRefID2: string | null;
    docRefID3: string | null;
    docRefID4: string | null;
    docRefID5: string | null;
};

const stateInfo: StateType = {
    question: 5,
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    docRefID1: null,
    docRefID2: null,
    docRefID3: null,
    docRefID4: null,
    docRefID5: null,
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
