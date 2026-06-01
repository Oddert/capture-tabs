import { Typography } from '@mui/material';

import { Fragment } from 'react/jsx-runtime';

import FileIndicator from '../../components/FileIndicator';
import UploadFileContents from '../../components/UploadFileContents';
import UploadText from '../../components/UploadText';
import ResponsiveContainer from '../../hocs/ResponsiveContainer';
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
        <ResponsiveContainer>
            {isLoaded ? (
                <FileIndicator />
            ) : (
                <Fragment>
                    <UploadFileContents />
                    <Typography sx={{ mb: 2, textAlign: 'center' }}>
                        Or
                    </Typography>
                    <UploadText />
                </Fragment>
            )}
        </ResponsiveContainer>
    );
};

export default Home;
