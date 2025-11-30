import { Transition, TransitionStatus } from 'react-transition-group';
import CloseIcon from '../../Icons/CloseIcon/CloseIcon';
import IconButton from '../IconButton/IconButton';
import { useRef } from 'react';

interface LeftDrawerProps {
    title?: React.ReactNode
    LeftIcon? : React.ReactNode
    children?: React.ReactNode
    visible: boolean
    onClose: () => void
    onExited: () => void
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({
    LeftIcon, 
    title, 
    children,
    visible,
    onClose,
    onExited,
}) => {
    const drawerRef = useRef<HTMLDivElement>(null)

    return (
        <Transition nodeRef={drawerRef} in={visible} onExited={onExited} timeout={300}> 
            { state => (
                <div 
                    className={`
                        fixed top-0 bottom-0 w-full h-dvh z-20 
                        transition-colors duration-300 ease-in-out
                        ${stateType(state) === "enter" ? "bg-[#00000066]" : "bg-[#00000000]"}
                    `}
                    onClick={onClose}
                    ref={drawerRef}
                >
                    <div 
                        className={`
                            w-[390px] h-full absolute top-0 bg-[#181818] z-30
                            transition-all duration-300 ease-in-out
                            ${stateType(state) === "enter" ? "left-0" : "left-[-390px]"}
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='border-b-2 border-solid h-16 border-page-white flex items-center'>
                            <div className='w-16 flex justify-center'>
                                {LeftIcon}
                            </div>
                            <div className='grow flex justify-center text-center text-xl text-page-white font-bold'>
                                {title}
                            </div>
                            <div className='w-16 flex justify-center'>
                                <IconButton onClick={onClose}>
                                    <CloseIcon width={16} height={16} className='fill-page-white'/>
                                </IconButton>
                            </div>
                        </div>
                        <div className='h-[calc(100%-4rem)]'>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    )
}

function stateType(state: TransitionStatus) {
    switch(state) {
        case "entering":
        case "entered":
            return "enter"
        case "exiting":
        case "exited":
        default:
            return "exit"
    }
}

export default LeftDrawer