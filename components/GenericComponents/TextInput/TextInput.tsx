interface TextInputProps extends React.ButtonHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = ({className, ...props}) => {
    return (
        <input
            {...props}
            type="text" 
            className={`
                px-4 py-2 rounded-md
                bg-slate-100 bg-opacity-70 border-white border-2 
                transition hover:ease-in-out hover:bg-opacity-90
                text-lg font-semibold text-gray-900
                ${className}
            `}
            size={64}
        />
    )
}

export default TextInput