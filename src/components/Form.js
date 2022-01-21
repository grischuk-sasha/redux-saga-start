import React, { Fragment } from 'react';
import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import TextField from '@atlaskit/textfield';
import Form, {
    ErrorMessage,
    Field,
    FormFooter,
} from '@atlaskit/form';
import {useDispatch} from 'react-redux';
import {addNewRequest} from '../actions/RequestsActions';

const RequestForm = () => {
    const dispatch = useDispatch();

    return <div>
        <Form onSubmit={(data, form) => dispatch(addNewRequest(data.name, data.delay))}>
            {({ formProps, submitting }) => (
                <form {...formProps}>
                    <Field
                        aria-required={true}
                        name="name"
                        label={"Request name"}
                        isRequired
                        validate={(value) =>
                            value && value.length > 50 ? 'Request name is too large.' : undefined
                        }
                    >
                        {({ fieldProps, error }) => (
                            <Fragment>
                                <TextField {...fieldProps} />
                                {error && (
                                    <ErrorMessage>
                                        {error}
                                    </ErrorMessage>
                                )}
                            </Fragment>
                        )}
                    </Field>
                    <Field
                        aria-required={true}
                        name="delay"
                        label={"Delay, sec"}
                        defaultValue=""
                        isRequired
                        validate={(value) => {
                            if (value) {
                                if (!/^-?\d+$/i.test(value)) {
                                    return 'Delay must be an integer.';
                                }

                                if (value < 1 || value > 10) {
                                    return 'Delay must be in the range 1-10.'
                                }
                            }

                            return  undefined;
                        }}
                    >
                        {({ fieldProps, error }) => {
                            return (
                                <Fragment>
                                    <TextField
                                        type="number"
                                        {...fieldProps}
                                    />
                                    {error && (
                                        <ErrorMessage>
                                            {error}
                                        </ErrorMessage>
                                    )}
                                </Fragment>
                            );
                        }}
                    </Field>

                    <FormFooter>
                        <ButtonGroup>
                            <LoadingButton
                                type="submit"
                                appearance="primary"
                                isLoading={submitting}
                            >
                                Add
                            </LoadingButton>
                        </ButtonGroup>
                    </FormFooter>
                </form>
            )}
        </Form>
    </div>
}

export default RequestForm;