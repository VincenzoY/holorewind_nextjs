import NextLink, { LinkProps } from 'next/link'

const Link: React.FC<LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
    return (
        <NextLink 
            className="
                decoration-ame-gold underline underline-offset-2
                hover:opacity-80
                transition-all ease-in-out
            " 
            {...props}
        />
    )
}

export default Link