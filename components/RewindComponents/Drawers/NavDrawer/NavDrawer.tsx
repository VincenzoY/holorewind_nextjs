import LeftDrawer from "@/components/GenericComponents/LeftDrawer/LeftDrawer"
import Logo from "@/components/Icons/Logo/Logo"
import NiceModal, { useModal } from "@ebay/nice-modal-react"
import Link from "next/link"
import CreditsDrawer from "../CreditsDrawer/CreditsDrawer"
import HelpDrawer from "../HelpDrawer/HelpDrawer"

interface NavDrawerProps {
}

const NavDrawer: React.FC<NavDrawerProps> = () => {
    const modal = useModal()

    const HomeIconLink = (
        <Link href="/" className="w-16 ml-2" onClick={modal.hide}>
            <Logo />
        </Link>
    )

    return (
        <LeftDrawer visible={modal.visible} onClose={modal.hide} onExited={modal.remove} LeftIcon={HomeIconLink}>
            <div className="overflow-scroll flex flex-col h-full no-scrollbar text-page-white text-xl">
                <Link href="/" onClick={modal.hide}>
                    <div className="border-solid border-b-2 border-b-page-white p-4">
                        Home
                    </div>
                </Link>
                <Link href="/rewind" onClick={modal.hide}>
                    <div className="border-solid border-b-2 border-b-page-white p-4">
                        2024 Rewind
                    </div>
                </Link>
                <div className="border-solid border-b-2 border-b-page-white p-4 cursor-pointer" onClick={() => NiceModal.show(HelpDrawer)}>
                    Help
                </div>
                <div className="border-solid border-b-2 border-b-page-white p-4 cursor-pointer" onClick={() => NiceModal.show(CreditsDrawer)}>
                    Credits
                </div>
            </div>
        </LeftDrawer>
    )
}


export default NiceModal.create(NavDrawer)