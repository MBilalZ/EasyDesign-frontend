const handleShopifyConnection = async () => {
    console.log('Connect Shopify');
};


const handlePrintifyConnection = async () => {
    console.log('Connect Printify');
};

export const handleAccountDisconnect = async (account) => {
    console.log('Disconnect Account', account);
};


const connectionFunctions = {
    shopify: handleShopifyConnection,
    printify: handlePrintifyConnection,
    // Add other connection types as needed
};

export const handleConnection = (connectionType) => {
    console.log('Connection Type:', connectionType);
    const connectionFunction = connectionFunctions[connectionType];
    if (connectionFunction) {
        connectionFunction();
    }
};
