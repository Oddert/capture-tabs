import { type FC, Fragment, useMemo } from 'react';

import { Divider, Typography } from '@mui/material';

import type { IProps } from './HighlightAlerts.types';
import type { ISortedInstances } from '../../../../types/Instance.types';

import InstanceGrid from '../../../InstanceGrid';

const HighlightAlerts: FC<IProps> = ({ instances }) => {
    const { highlighted, other }: ISortedInstances = useMemo(() => {
        return instances.reduce(
            (acc: ISortedInstances, each) => {
                if (each.status === 'RUNNING') {
                    acc.other.push(each);
                } else {
                    acc.highlighted.push(each);
                }
                return acc;
            },
            { highlighted: [], other: [] },
        );
    }, [instances]);

    return (
        <Fragment>
            <Typography variant='h3'>Highlighted</Typography>
            <InstanceGrid instances={highlighted} />
            <Divider />
            <Typography variant='h3'>Other</Typography>
            <InstanceGrid instances={other} />
        </Fragment>
    );
};

export default HighlightAlerts;
