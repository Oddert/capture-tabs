import { Box } from '@mui/material';

import DropZone from '../../components/DropZone/DropZone';
import { useAppSelector } from '../../hooks/ReduxHookWrappers';
import { getIsUploaded } from '../../redux/selectors/uploadSelectors';

/**
 * Main home page component.
 *
 * Displays a series of Modules as composable cards.
 * @component
 * @category Pages
 * @subcategory Home
 */
const Home = () => {
    const isLoaded = useAppSelector(getIsUploaded);
    return (
        <Box
            sx={{
                height: '200vh',
                gridGap: '20px',
                // border: '1px dashed tomato',
                width: '100%',
                mx: 'auto',
                // gridAutoRows: '400px',
            }}
        >
            {isLoaded ? null : <DropZone />}
        </Box>
    );
};

export default Home;
