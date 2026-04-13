import { type ChangeEvent, type FC, useEffect, useState } from 'react';

import { InfoOutline as IconInfo } from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    DialogContent,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';

import { useFormik } from 'formik';

import type { IProps } from './EditDetailsForm.types';

import { useAppDispatch } from '../../../../hooks/ReduxHookWrappers';
import { updateUserOverrides } from '../../../../redux/slices/instanceSlice';
import { intakeError } from '../../../../redux/thunks/errorThunks';
import InstanceService from '../../../../services/instance.service';

const EditDetailsForm: FC<IProps> = ({ instance, onCancel }) => {
    const [infoOpen, setInfoOpen] = useState(false);

    const dispatch = useAppDispatch();
    const theme = useTheme();

    const {
        errors,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setTouched,
        touched,
        validateField,
        values,
    } = useFormik({
        initialValues: {
            description: '',
            readableName: '',
        },
        validate: (nextValues) => {
            let errorsFound = false;
            const nextErrors: {
                readableName: string;
                description: string;
            } = {
                description: '',
                readableName: '',
            };

            if (nextValues.readableName.length >= 255) {
                nextErrors.readableName =
                    'Title may only be 255 characters long.';
                errorsFound = true;
            }

            if (nextValues.description.length >= 2000) {
                nextErrors.description =
                    'Title may only be 2,000 characters long.';
                errorsFound = true;
            }

            if (errorsFound) {
                return nextErrors;
            }
            return undefined;
        },
        onSubmit: (nextValues, formikBag) => {
            formikBag.setSubmitting(true);
            try {
                InstanceService.updateUserOverrides(instance.pcfGuid, {
                    description: nextValues.description.length
                        ? nextValues.description
                        : null,
                    readableName: nextValues.readableName.length
                        ? nextValues.readableName
                        : null,
                })
                    .then((response) => {
                        dispatch(
                            updateUserOverrides({
                                userOverrides: response.instanceAttributes,
                            }),
                        );
                        formikBag.setSubmitting(false);
                        onCancel();
                    })
                    .catch((error: unknown) => {
                        dispatch(intakeError(error));
                        formikBag.setSubmitting(false);
                    });
            } catch (error) {
                dispatch(intakeError(error));
                formikBag.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (instance.userOverrides?.description?.length) {
            setFieldValue('description', instance.userOverrides.description);
        }
        if (instance.userOverrides?.readableName?.length) {
            setFieldValue('readableName', instance.userOverrides.readableName);
        } else if (instance.pcfAppName !== instance.readableName) {
            setFieldValue('readableName', instance.readableName);
        } else {
            setFieldValue('readableName', instance.pcfAppName);
        }
    }, [
        instance.pcfAppName,
        instance.readableName,
        instance.userOverrides,
        setFieldValue,
    ]);

    return (
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gridGap: '24px',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ flex: 1 }}>
                            PCF instance &ldquo;{instance.pcfAppName}&rdquo;
                        </Typography>
                        <IconButton
                            onClick={() => {
                                setInfoOpen(!infoOpen);
                            }}
                        >
                            <IconInfo color='info' />
                        </IconButton>
                    </Box>
                    {infoOpen ? (
                        <Box
                            sx={{
                                border: `1px solid ${theme.palette.info.main}`,
                                display: 'flex',
                                alignItems: 'flex-start',
                                gridGap: '16px',
                                borderRadius: '4px',
                                p: 2,
                            }}
                        >
                            <IconInfo color='info' />
                            <Typography sx={{ fontSize: '12px' }}>
                                You can change the display name for this
                                instance to something more readable if you like.
                                The original instance name displayed above will
                                not change.
                            </Typography>
                        </Box>
                    ) : null}
                    <TextField
                        disabled={isSubmitting}
                        error={Boolean(
                            touched.readableName && errors.readableName,
                        )}
                        label={'Display name'}
                        onBlur={() => {
                            validateField('readableName');
                            setTouched({ ...touched, readableName: true });
                        }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('readableName', event.target.value);
                        }}
                        value={values.readableName}
                        variant='outlined'
                    />
                    {touched.readableName && errors.readableName ? (
                        <Typography color='error'>
                            {errors.readableName}
                        </Typography>
                    ) : null}
                    <TextField
                        disabled={isSubmitting}
                        error={Boolean(
                            touched.description && errors.description,
                        )}
                        label={'Notes'}
                        multiline
                        minRows={4}
                        onBlur={() => {
                            validateField('description');
                            setTouched({ ...touched, description: true });
                        }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('description', event.target.value);
                        }}
                        type='password'
                        value={values.description}
                        variant='outlined'
                    />
                    {touched.description && errors.description ? (
                        <Typography color='error'>
                            {errors.description}
                        </Typography>
                    ) : null}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gridGap: '16px',
                        }}
                    >
                        <Button disabled={isSubmitting} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            type='submit'
                            variant='contained'
                        >
                            {isSubmitting ? <CircularProgress /> : 'Save'}
                        </Button>
                    </Box>
                </Box>
            </form>
        </DialogContent>
    );
};

export default EditDetailsForm;
