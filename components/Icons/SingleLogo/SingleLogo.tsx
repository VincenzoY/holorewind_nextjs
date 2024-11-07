interface SingleLogoProps extends React.HTMLAttributes<HTMLDivElement> {}

const SingleLogo: React.FC<SingleLogoProps> = (props) => {
    return (
        <svg width="120px" viewBox="7 16 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="group relative">
            <path id="triangle_four" d="M19 54.9641C16.3333 53.4245 16.3333 49.5755 19 48.0359L48.25 31.1484C50.9167 29.6088 54.25 31.5333 54.25 34.6125V68.3875C54.25 71.4667 50.9167 73.3912 48.25 71.8516L19 54.9641Z" fill="#7F2321"/>
            <path id="triangle_three" d="M19 51.9085C16.3333 50.3689 16.3333 46.5199 19 44.9803L48.25 28.0929C50.9167 26.5533 54.25 28.4777 54.25 31.5569V65.3319C54.25 68.4111 50.9167 70.3356 48.25 68.796L19 51.9085Z" fill="#E69E7D"/>
            <path id="triangle_two" d="M19 48.853C16.3333 47.3134 16.3333 43.4644 19 41.9248L48.25 25.0373C50.9167 23.4977 54.25 25.4222 54.25 28.5014V62.2764C54.25 65.3556 50.9167 67.2801 48.25 65.7405L19 48.853Z" fill="#DFFAFF"/>
            <path id="triangle_one" d="M19 45.7974C16.3333 44.2578 16.3333 40.4088 19 38.8692L48.25 21.9817C50.9167 20.4421 54.25 22.3666 54.25 25.4458V59.2208C54.25 62.3 50.9167 64.2245 48.25 62.6849L19 45.7974Z" fill="#F6CA77"/>
        </svg>
    )
}

export default SingleLogo