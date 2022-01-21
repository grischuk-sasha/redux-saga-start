import {delay, cancel, takeEvery, select, put} from 'redux-saga/effects';
import {DELETE_REQUEST, FINISH_REQUEST, RUN_REQUEST, STOP_REQUEST, UPDATE_REQUEST} from '../actions/RequestsActions';

function* handleRequest() {
    const reducer = yield select(state => state.requests);
    const processingRequest = {...reducer.processingRequest};

    if (Object.keys(processingRequest).length === 0 && reducer.list.length > 0) {
        yield put({type: UPDATE_REQUEST, payload: reducer.list[0]})
    } else if (processingRequest.delay > 0) {
        yield delay(1000);

        processingRequest.delay -= 1

        yield put({type: UPDATE_REQUEST, payload: processingRequest})
    } else {
        yield put({type: DELETE_REQUEST, payload: processingRequest})

        if (reducer.list.length > 1) {
            yield put({type: UPDATE_REQUEST, payload: reducer.list[1]});
        } else {
            yield put({type: FINISH_REQUEST});
        }
    }
}

function* cancelRequest(task) {
    yield cancel(task)
}

export default function* rootSaga() {
    yield takeEvery(RUN_REQUEST, handleRequest);

    const handleRequestTask =  yield takeEvery(UPDATE_REQUEST, handleRequest);
    yield takeEvery(STOP_REQUEST, cancelRequest, handleRequestTask);
}