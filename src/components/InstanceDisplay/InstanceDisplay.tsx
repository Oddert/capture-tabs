import { type FC } from 'react';

import { Typography } from '@mui/material';

import type { IProps } from './InstanceDisplay.types';

import LoadingIndicator from '../LoadingIndicator';

import HighlightAlerts from './components/HighlightAlerts';
import Standard from './components/Standard';

/**
 * Full display component for a list of instances.
 *
 * Must be supplied with instances & loading state as it is assumed some pre-processing might be required.
 * @category Components
 * @subcategory Instance Display
 * @component
 * @param props.highlightAlerts If true, the content will be split into "highlighted" and "other" with non-green items raise to the top.
 * @param props.instances List of instances to display.
 * @param props.loading True if the list of instances is loading.
 */
const InstanceDisplay: FC<IProps> = ({
    highlightAlerts = false,
    instances,
    loading = false,
}) => {
    if (instances.length) {
        if (highlightAlerts) {
            return <HighlightAlerts instances={instances} />;
        }
        return <Standard instances={instances} />;
    } else if (loading) {
        return <LoadingIndicator />;
    }
    return <Typography>No instances found</Typography>;
};

export default InstanceDisplay;
