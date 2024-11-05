interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "white" | "empty"
    size?: 'sm' | 'md' | 'lg'
}

const IconButton: React.FC<IconButtonProps> = ({variant, size = "sm", className, ...props}) => {

    return (
        <button 
            className={`
                flex items-center justify-center
                rounded-full aspect-square
                border-2 transition hover:ease-in-out 
                ${styleClasses(variant)}
                ${sizeClasses(size)}
                ${className}
            `}
            {...props}
        />
    )
}

function styleClasses(variant: IconButtonProps['variant']) {
    switch (variant) {
        case 'white':
            return "bg-slate-100 bg-opacity-70 border-white hover:bg-slate-200"
        case 'empty':
        default:
            return "border-none hover:border-solid hover:bg-opacity-20 hover:border-white hover:bg-slate-300"
    }
}

function sizeClasses(size: IconButtonProps["size"]) {
    switch (size) {
        case 'sm':
            return "w-8"
        case 'md':
            return "w-12"
        case 'lg':
            return "w-16"
    }
}

export default IconButton