import { FC } from "react"

const Shimmer: FC = () => {
    return (
        <div 
            className="
                w-full h-full
                bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300
                bg-[length:400%] animate-[shimmer_6s_linear_infinite]  
            "
        />
    )
}

export default Shimmer