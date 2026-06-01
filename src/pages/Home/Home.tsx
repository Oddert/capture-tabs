import { Typography } from '@mui/material';

import { Fragment } from 'react/jsx-runtime';

import FileIndicator from '../../components/FileIndicator';
import ProcessTransactions from '../../components/ProcessTransactions';
import UploadFileContents from '../../components/UploadFileContents';
import UploadText from '../../components/UploadText';
import ResponsiveContainer from '../../hocs/ResponsiveContainer';
import { useAppSelector } from '../../hooks/ReduxHookWrappers';
import {
    getIsEditMode,
    getIsUploaded,
} from '../../redux/selectors/uploadSelectors';

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
    const isEditMode = useAppSelector(getIsEditMode);
    return (
        <ResponsiveContainer>
            <Fragment>
                {isLoaded ? <FileIndicator /> : null}
                {isEditMode || !isLoaded ? (
                    <Fragment>
                        <UploadFileContents />
                        <Typography sx={{ mb: 2, textAlign: 'center' }}>
                            Or
                        </Typography>
                        <UploadText />
                    </Fragment>
                ) : (
                    <ProcessTransactions />
                )}
            </Fragment>
        </ResponsiveContainer>
    );
};

export default Home;
