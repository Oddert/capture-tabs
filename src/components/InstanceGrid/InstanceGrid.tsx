import type { FC } from 'react';

import { List, ListItem } from '@mui/material';

import type { IProps } from './InstanceGrid.types';

import InstanceCard from '../InstanceCard';

/**
 * Lower-order components to render a responsive grid of instances.
 * @category Components
 * @subcategory FallbackError
 * @component
 * @param props.instances The list of instances to display.
 */
const InstanceGrid: FC<IProps> = ({ instances }) => {
    return (
        <List
            sx={{
                width: '100%',
                // border: '1px dashed steelblue',
                display: 'grid',
                // gridAutoRows: 'minmax(100px, auto)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 400px))',
                margin: '0 auto',
                justifyContent: 'center',
            }}
        >
            {instances.map((instance) => (
                <ListItem key={instance.instanceId} sx={{ display: 'block' }}>
                    <InstanceCard instance={instance} />
                </ListItem>
            ))}
        </List>
    );
};

export default InstanceGrid;
