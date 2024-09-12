import React from 'react';
import {motion} from 'framer-motion';
import {animation} from "@/constants/index.js";

const PageTransition = ({children}, props) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            variants={animation.pageVariants}
            transition={animation.pageTransition}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition;