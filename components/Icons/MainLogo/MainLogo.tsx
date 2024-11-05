import css from "./MainLogo.module.css"
import 'react';
import React, {CSSProperties, useEffect, useState} from 'react';

export interface CustomCSSProperties extends CSSProperties {
    [key: `--${string}`]: string | number
}

interface MainLogo {
    logoDistance?: number
}


const MainLogo: React.FC<MainLogo> = ({logoDistance = 3500}) => {
    const [coords, setCoords] = useState({x: 0, y: 0});
    useEffect(() => {
        const handleWindowMouseMove = (event: any) => {
            setCoords({
                x: event.clientX,
                y: event.clientY,
            })
        }

        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleWindowMouseMove,
            )
        }
    }, [])

    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize())
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, [])

    const centerPosition = {x: windowSize.x / 2, y: windowSize.y / 2}
    const mousePosition = {x: coords.x - centerPosition.x, y: centerPosition.y - coords.y}

    const alpha = windowSize.x > 1920 ? Math.tan(mousePosition.x / logoDistance) : 0
    const beta = windowSize.x > 1920 ? Math.tan(mousePosition.y / logoDistance) : 0
    const rotation_vector = mousePosition.x / logoDistance

    const brightness = windowSize.x > 1920 ? (Math.sin(coords.x / 400) + 1 + Math.cos(coords.y / 400) + 1) * 5 + 90 : 125

    return (
        <div className={css.x_rotation} style={{"--alpha": `${alpha}rad`} as CustomCSSProperties}>
            <div className={css.y_rotation} style={{"--beta": `${beta}rad`, "--rotation_vector": `${rotation_vector}`} as CustomCSSProperties}>
                <div className="text-6xl md:text-9xl">
                    <span className={css.noise} style={{"--brightness": `${brightness}%`} as CustomCSSProperties}>Holo</span><span>Rewind</span>
                </div>
            </div>
        </div>
    )
}

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {x: innerWidth, y: innerHeight};
}

export default MainLogo
