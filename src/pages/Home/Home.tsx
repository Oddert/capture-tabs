import { Box, Typography } from '@mui/material';

import { Fragment } from 'react/jsx-runtime';

import UploadFileContents from '../../components/UploadFileContents';
import UploadText from '../../components/UploadText';
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
            {isLoaded ? null : (
                <Fragment>
                    <UploadFileContents />
                    <Typography sx={{ mb: 2, textAlign: 'center' }}>
                        Or
                    </Typography>
                    <UploadText />
                </Fragment>
            )}
        </Box>
    );
};

export default Home;
