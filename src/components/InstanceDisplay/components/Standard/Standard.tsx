import type { FC } from 'react';

import type { IProps } from './Standard.types';

import InstanceGrid from '../../../InstanceGrid';

/**
 * Displays all instances together without any sorting.
 * @category Components
 * @subcategory Instance Display
 * @component
 * @param props.instances The list of Instances to display.
 */
const Standard: FC<IProps> = ({ instances }) => {
    return <InstanceGrid instances={instances} />;
};

export default Standard;
