import NextLink from 'next/link'

const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
    href, className, ...props
}) => {
    if (!href) {
        return (
            <a 
                className={`
                    decoration-ame-gold underline underline-offset-2
                    hover:opacity-80
                    transition-all ease-in-out
                    hover:cursor-pointer
                    ${className}
                `}
                {...props}
            />
        )
    }

    return (
        <NextLink 
            className={`
                decoration-ame-gold underline underline-offset-2
                hover:opacity-80
                transition-all ease-in-out
                ${className}
            `}
            href={href}
            {...props}
        />
    )
}

export default Link