import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Spinner  from '@atlaskit/spinner';
import Button from '@atlaskit/button';
import Form from './Form';
import {deleteRequest, RUN_REQUEST, STOP_REQUEST} from '../actions/RequestsActions';

export default function () {
    const dispatch = useDispatch();

    const {processingRequest, list: requests} = useSelector(state => state.requests);

    const onDeleteHandler = item => {
        dispatch(deleteRequest(item));
    }

    const onRunHandler = () => {
        dispatch({type: RUN_REQUEST});
    }

    const onStopHandler = () => {
        dispatch({type: STOP_REQUEST});
    }

    return <div className="container py-3">
        <div className="card">
            <div className="card-header">
                Request simulator
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-8">

                        <Form />

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Request name</th>
                                    <th scope="col" className="text-center">Delay</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                requests.map((item, key) => {
                                    return <tr key={key}>
                                        <th>{item.name}</th>
                                        <td className="text-center">{item.delay}</td>
                                        <td className="text-center">
                                            <Button appearance="danger" onClick={() => onDeleteHandler(item)}>Delete</Button>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-end">
                            <Button style={{marginRight: '10px'}} onClick={onStopHandler}>Stop</Button>
                            <Button appearance="primary" onClick={onRunHandler}>Run</Button>
                        </div>
                    </div>

                    <div className="col text-center align-self-center">
                        {
                            Object.keys(processingRequest).length > 0 &&
                                <div>
                                    <Spinner size="xlarge" />
                                    <p>{processingRequest.name}</p>
                                    <p>{processingRequest.delay}</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}