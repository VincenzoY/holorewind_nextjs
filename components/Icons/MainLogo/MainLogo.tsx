import css from "./MainLogo.module.css"
import 'react';
import React, {CSSProperties} from 'react';

export interface CustomCSSProperties extends CSSProperties {
    [key: `--${string}`]: string | number
}

interface MainLogo {
    className?: string
}


const MainLogo: React.FC<MainLogo> = ({ className }) => {
    return (
        <div className={`text-6xl md:text-9xl ${className}`}>
            <span className={css.noise} style={{"--brightness": '100%'} as CustomCSSProperties}>HoloRewind</span>
        </div>
    )
}

export default MainLogo
