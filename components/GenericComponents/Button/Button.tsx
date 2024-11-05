interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({className, ...props}) => {
    return (
        <button 
            className={`
                lg:flex lg:gap-x-12 lg:items-center 
                px-6 py-2 rounded-3xl 
                bg-slate-100 bg-opacity-70 border-white border-2 
                transition hover:ease-in-out hover:bg-slate-200
                text-sm font-semibold leading-6 text-gray-900
                ${className}
            `}
            {...props}
        />
    )
}

export default Button