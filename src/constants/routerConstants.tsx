import { createBrowserRouter } from 'react-router-dom';

// import {
//     CollectionsBookmark as IconWatchlist,
//     DisplaySettings as IconAllInstances,
//     Home as IconHome,
//     Settings as IconPcfSim,
// } from '@mui/icons-material';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import Layout from '../components/Layout';
import Home from '../pages/Home';

export interface INavigationOption {
    label: string;
    Icon: OverridableComponent<SvgIconTypeMap> & {
        muiName: string;
    };
    location: string;
    children?: INavigationOption[];
    defaultExpanded?: boolean;
}

export interface INavigation {
    top: INavigationOption[];
    bottom: INavigationOption[];
}

/**
 * Enum object to hold all route paths.
 * @constant
 * @category Constants
 * @subcategory Router
 */
export const ROUTES = Object.freeze({
    HOME: '/',
});

/**
 * Provides constructor functions for APIService which require optional elements to their paths.
 *
 * NOTE: Does not include all paths, only those with optional parameters.
 * @constant
 * @category Constants
 * @subcategory Router
 */
export const ROUTES_FACTORY = Object.freeze({});

/**
 * React router config.
 * @constant
 * @category Constants
 * @subcategory Router
 */
const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
    },
]);

/**
 * Schema for the main navbar.
 * @constant
 * @category Constants
 * @subcategory Router
 */
export const navigation: INavigation = {
    top: [
        // {
        //     label: 'Home',
        //     Icon: IconHome,
        //     location: ROUTES.HOME,
        // },
        // {
        //     label: 'All Instances',
        //     Icon: IconAllInstances,
        //     location: ROUTES.ALL_INSTANCES,
        // },
        // {
        //     label: 'Watchlists',
        //     Icon: IconWatchlist,
        //     location: ROUTES.WATCHLISTS,
        // },
        //     {
        //         label: 'Transactions',
        //         Icon: IconTransaction,
        //         location: '',
        //         children: [
        //             {
        //                 label: 'Upload & View',
        //                 Icon: IconTransactions,
        //                 location: ROUTES.TRANSACTIONS,
        //             },
        //             {
        //                 label: 'Categories',
        //                 Icon: IconCategory,
        //                 location: ROUTES.CATEGORIES,
        //             },
        //         ],
        //     },
        //     {
        //         label: 'Budget',
        //         Icon: IconBudget,
        //         location: '',
        //         children: [
        //             {
        //                 label: 'Budget Breakdown',
        //                 Icon: IconBudgetBreakdown,
        //                 location: ROUTES.BUDGET_BREAKDOWN,
        //             },
        //             {
        //                 label: 'Budget Overview',
        //                 Icon: IconBudgetOverview,
        //                 location: ROUTES.BUDGET_OVERVIEW,
        //             },
        //             {
        //                 label: 'My Budgets',
        //                 Icon: IconManageBudget,
        //                 location: ROUTES.MANAGE_BUDGETS,
        //             },
        //             {
        //                 label: 'Manage Scenarios',
        //                 Icon: IconManageBudget,
        //                 location: ROUTES.MANAGE_SCENARIOS,
        //             },
        //         ],
        //     },
    ],
    bottom: [
        // {
        //     label: 'Simulate PCF',
        //     Icon: IconPcfSim,
        //     location: ROUTES.SIM_PCF,
        // },
        //     {
        //         label: 'Profile',
        //         Icon: IconUser,
        //         location: '',
        //         defaultExpanded: true,
        //         children: [
        //             {
        //                 label: 'My Cards',
        //                 Icon: IconManageCards,
        //                 location: ROUTES.MANAGE_CARDS,
        //             },
        //             {
        //                 label: 'Settings',
        //                 Icon: IconProfile,
        //                 location: ROUTES.PROFILE,
        //             },
        //             {
        //                 label: 'Logout',
        //                 Icon: IconLogout,
        //                 location: ROUTES.LOGOUT,
        //             },
        //         ],
        //     },
    ],
};

export default router;
