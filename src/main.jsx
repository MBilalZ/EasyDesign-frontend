import React, {Profiler} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {toast, ToastBar, Toaster} from 'react-hot-toast';
import "nprogress/nprogress.css";
import ErrorBoundary from "@/components/core/ErrorBoundary.jsx";
import "@/assets/scss/styles.scss";
import {IconButton, ThemeProvider} from "@mui/material";
import {theme} from "@/utils";
import CssBaseline from "@mui/material/CssBaseline";
import {Provider} from "react-redux";
import {store} from "@/app/store";
import {AuthProvider} from "./providers/AuthProvider.jsx";
import {HelmetProvider} from "react-helmet-async";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {SpeedInsights} from "@vercel/speed-insights/react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {BrowserRouter} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <ErrorBoundary>
                            <AuthProvider>
                                <Profiler
                                    id="App"
                                    onRender={(id, phase, actualDuration) => {
                                        // console.log({id, phase, actualDuration});
                                    }}
                                >
                                    <HelmetProvider>
                                        <App/>
                                    </HelmetProvider>
                                    <SpeedInsights/>
                                </Profiler>
                            </AuthProvider>
                            <CssBaseline/>
                        </ErrorBoundary>
                    </ThemeProvider>
                    <ReactQueryDevtools/>
                </QueryClientProvider>
            </Provider>
            <Toaster position="top-center"
                     reverseOrder={false} toastOptions={{
                duration: 5000,
                error: {
                    duration: 5000
                }
            }}>
                {(t) => (
                    <ToastBar toast={t}>
                        {({icon, message}) => (
                            <>
                                {icon}
                                {message}
                                {t.type !== 'loading' && (
                                    <IconButton onClick={() => toast.dismiss(t.id)} className={'toastIcon'}
                                                size={'small'}><CloseIcon/>
                                    </IconButton>
                                )}
                            </>
                        )}
                    </ToastBar>
                )}
            </Toaster>
        </BrowserRouter>
    </React.StrictMode>
);


serviceWorkerRegistration.register();