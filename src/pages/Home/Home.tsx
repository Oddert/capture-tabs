import { Box } from '@mui/material';

import { useAppSelector } from '../../hooks/ReduxHookWrappers';
import { getIsUploaded } from '../../redux/selectors/uploadSelectors';
import UploadFileContents from '../../components/UploadFileContents';

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
            {isLoaded ? null : <UploadFileContents />}
        </Box>
    );
};

export default Home;
