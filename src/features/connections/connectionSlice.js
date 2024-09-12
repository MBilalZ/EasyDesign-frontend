import {createSelector, createSlice} from "@reduxjs/toolkit";


const initialState = {
    marketPlaces: [

        {
            name: 'Shopify',
            logo: '/images/icons/shopify-square.png',
            signUpLink: "#",
        },
    ],
    printProviders: [
        {
            name: 'Printify',
            logo: '/images/icons/printify.png',
            signUpLink: "#",
        },
    ],
    connections: [
        {
            type: 'Shopify',
            color: '#96BF48',
            shopName: 'Shopify Store',
            pendingOrders: 15,
            revenue: 1500,
            status: 'connected',
            shopId: '30',
            accountType: 'marketplace',
            selected: false
        },
        {
            type: 'Etsy',
            color: '#96BF48',
            shopName: 'Etsy Store',
            pendingOrders: 15,
            revenue: 1500,
            status: 'inactive',
            shopId: '3',
            accountType: 'marketplace',
            selected: false
        },
        {
            type: 'Shopify',
            color: '#95bf47',
            shopName: 'Shopify Store 2',
            pendingOrders: 0,
            revenue: 0,
            status: 'connected',
            shopId: '5',
            accountType: 'marketplace',
            selected: true
        },
        {
            type: 'Printify',
            color: '#00dd60',
            shopName: ' Store 55',
            status: 'connected',
            shopId: '50',
            accountType: 'printProvider'
        }
    ],
    selectedMarketPlace: {}
}

export const connectionSlice = createSlice({
    name: "connectionList",
    initialState,
    reducers: {
        setSelectedMarketPlace: (state, action) => {
            const {id} = action.payload;
            // Unselect all marketplaces first, then select the one with the id passed
            state.connections = state.connections.map(connection => {
                return {
                    ...connection,
                    selected: connection.shopId === id
                }
            });


        }
    }
});

export const {setSelectedMarketPlace} = connectionSlice.actions;

// Selector to get the selected marketplace
export const selectConnections = state => {
    return state.connectionsList.connections;
};

export const getMarketPlaces = createSelector(
    [selectConnections],
    (connections) => connections.filter(connection => connection.accountType === 'marketplace')
);

export const selectSelectedMarketPlace = createSelector(
    [selectConnections],
    (connections) => connections.find(connection => connection.selected) || {}
);

export default connectionSlice.reducer;


