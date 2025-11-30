interface BlankFileProps {
    children?: React.ReactNode
}

export default function BlankFile({
    children
}: BlankFileProps) {

    return (
        <div className="aspect-[8.5/11] bg-page-white h-[29rem] p-[2.6rem] rounded-sm">
            {children}
        </div>
    )
}
