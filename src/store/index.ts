import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {systemReducer} from './system/reducers';
import {jobsReducer} from './jobs/reducers';
import { tasksReducer } from './tasks/reducer';
import { interviewerTeamModalReducer } from 'src/components/interviewer-team/reducer';
import { processImageModalReducer } from 'src/components/process-image-modal/reducer';
import { candidateSkillModalReducer } from 'src/components/candidate-skills/reducer';
import { benefitModalReducer } from 'src/components/benefits-modal/reducer';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    benefitsModalState: benefitModalReducer,
    candidateSkillModalState: candidateSkillModalReducer,
    interviewerModalState: interviewerTeamModalReducer,
    jobs: jobsReducer,
    processImageModalState: processImageModalReducer,
    router: connectRouter(history),
    system: systemReducer,
    task: tasksReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware, routerMiddleware(history)];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middlewareEnhancer)
    );

    return store;
}