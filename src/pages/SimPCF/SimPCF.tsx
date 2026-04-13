import { type FC, useMemo } from 'react';

import { Box, Button, Chip, List, ListItem, Typography } from '@mui/material';

import type { IProps } from './SimPCF.types';

import ResponsiveContainer from '../../hocs/ResponsiveContainer';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHookWrappers';
import {
    listAllInstances,
    orgNames,
} from '../../redux/selectors/instanceSelectors';
import { intakeError } from '../../redux/thunks/errorThunks';
import InstanceService from '../../services/instance.service';
import { getRagColourCode } from '../../utils/ragUtils';

/**
 * Demo page for the purposes of simulating PCF events while using the mocked API.
 * @category Pages
 * @subcategory Simulate PCF
 * @component
 */
const SimPCF: FC<IProps> = () => {
    const allInstances = useAppSelector(listAllInstances);
    const organisationNames = useAppSelector(orgNames);

    const dispatch = useAppDispatch();

    const instancesOrdered = useMemo(() => {
        const copy = [...allInstances];
        copy.sort((a, b) => (a.readableName < b.readableName ? -1 : 1));
        return copy;
    }, [allInstances]);

    const handleClick = (pcfGuid: string, action: string) => () => {
        const request = async () => {
            try {
                await InstanceService.demoRoute(pcfGuid, action);
            } catch (error) {
                dispatch(intakeError(error));
            }
        };
        request();
    };

    return (
        <ResponsiveContainer>
            <Typography>Simulate PCF Events</Typography>
            <List>
                {instancesOrdered.map((instance) => (
                    <ListItem key={instance.instanceId}>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns:
                                    '100px 100px 200px repeat(5, auto)',
                                alignItems: 'center',
                                gridGap: '16px',
                            }}
                        >
                            {instance.pcfOrganisationId in organisationNames ? (
                                <Chip
                                    label={
                                        organisationNames[
                                            instance.pcfOrganisationId
                                        ]
                                    }
                                    size='small'
                                />
                            ) : null}
                            <Button
                                color={getRagColourCode(instance.status)}
                                sx={{ mt: '8px' }}
                                size='small'
                                variant='outlined'
                            >
                                {instance.status}
                            </Button>
                            <Typography>{instance.pcfAppName}</Typography>
                            <Button
                                onClick={handleClick(instance.pcfGuid, 'DOWN')}
                            >
                                Down
                            </Button>
                            <Button
                                onClick={handleClick(
                                    instance.pcfGuid,
                                    'STOPPED',
                                )}
                            >
                                Stop
                            </Button>
                            <Button
                                onClick={handleClick(
                                    instance.pcfGuid,
                                    'UPLOADING-BITS',
                                )}
                            >
                                Upload bits
                            </Button>
                            <Button
                                onClick={handleClick(
                                    instance.pcfGuid,
                                    'STARTING',
                                )}
                            >
                                Start
                            </Button>
                            <Button
                                onClick={handleClick(
                                    instance.pcfGuid,
                                    'RESTAGING',
                                )}
                            >
                                Restage
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </ResponsiveContainer>
    );
};

export default SimPCF;
