import { createBrowserRouter } from 'react-router-dom';

import {
    CollectionsBookmark as IconWatchlist,
    DisplaySettings as IconAllInstances,
    Home as IconHome,
    Settings as IconPcfSim,
} from '@mui/icons-material';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

import Layout from '../components/Layout';
import AllInstances from '../pages/AllInstances';
import EditWatchlist from '../pages/EditWatchlist';
import Home from '../pages/Home';
import SimPCF from '../pages/SimPCF';
import Watchlists from '../pages/Watchlists';

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
    ALL_INSTANCES: '/all-instances',
    CREATE_WATCHLIST: '/edit-watchlist',
    EDIT_WATCHLIST: '/edit-watchlist/:watchlistId',
    HOME: '/',
    SIM_PCF: '/simulate',
    WATCHLISTS: '/watchlists',
});

/**
 * Provides constructor functions for APIService which require optional elements to their paths.
 *
 * NOTE: Does not include all paths, only those with optional parameters.
 * @constant
 * @category Constants
 * @subcategory Router
 */
export const ROUTES_FACTORY = Object.freeze({
    EDIT_WATCHLIST: (watchlistId: string) =>
        ROUTES.EDIT_WATCHLIST.replace(':watchlistId', watchlistId),
});

/**
 * React router config.
 * @constant
 * @category Constants
 * @subcategory Router
 */
const router = createBrowserRouter([
    {
        path: ROUTES.ALL_INSTANCES,
        element: (
            <Layout>
                <AllInstances />
            </Layout>
        ),
    },
    {
        path: ROUTES.CREATE_WATCHLIST,
        element: (
            <Layout>
                <EditWatchlist />
            </Layout>
        ),
    },
    {
        path: ROUTES.EDIT_WATCHLIST,
        element: (
            <Layout>
                <EditWatchlist />
            </Layout>
        ),
    },
    {
        path: ROUTES.HOME,
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
    },
    {
        path: ROUTES.SIM_PCF,
        element: (
            <Layout>
                <SimPCF />
            </Layout>
        ),
    },
    {
        path: ROUTES.WATCHLISTS,
        element: (
            <Layout>
                <Watchlists />
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
        {
            label: 'Home',
            Icon: IconHome,
            location: ROUTES.HOME,
        },
        {
            label: 'All Instances',
            Icon: IconAllInstances,
            location: ROUTES.ALL_INSTANCES,
        },
        {
            label: 'Watchlists',
            Icon: IconWatchlist,
            location: ROUTES.WATCHLISTS,
        },
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
        {
            label: 'Simulate PCF',
            Icon: IconPcfSim,
            location: ROUTES.SIM_PCF,
        },
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
