import Routes from "./routes";
import {Helmet} from "react-helmet-async";
import {config} from "@/constants";
import {Suspense} from "react";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {Crisp} from "crisp-sdk-web";
import FullScreenLoader from "@/components/base/FullScreenLoader.jsx";

function App() {
    const {loading} = useAuth();
    Crisp.configure(import.meta.env.VITE_CHAT_ID);

    Crisp.load();
    return (
        <div className="app">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{config.APP_NAME}</title>
                <link rel="canonical" href="http://mysite.com/example"/>
                {/* META DESCRIPTION TAG */}
                <meta name="description" content={config.APP_DESCRIPTION}/>
                {/* META KEYWORD TAG */}
                <meta name="keywords" content={config.APP_KEYWORDS}/>
                {/* favicon */}
                <link rel="icon" type="image/svg+xml" href={config.APP_FAVICON}/>
                {/* META ROBOTS TAG */}
                <meta name="robots" content="index, follow"/>
            </Helmet>
            {loading ? (
                <>
                    <FullScreenLoader/>
                </>
            ) : (
                <Suspense
                    fallback={
                        <FullScreenLoader/>
                    }
                >
                    <Routes/>
                </Suspense>
            )}
        </div>
    );
}

export default App;
