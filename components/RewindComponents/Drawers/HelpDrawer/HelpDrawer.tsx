import LeftDrawer from "@/components/GenericComponents/LeftDrawer/LeftDrawer"
import Link from "@/components/GenericComponents/Link/Link"
import NiceModal, { useModal } from "@ebay/nice-modal-react"

interface HelpDrawerProps {
}

const HelpDrawer: React.FC<HelpDrawerProps> = () => {
    const modal = useModal()

    return (
        <LeftDrawer visible={modal.visible} onClose={modal.hide} onExited={modal.remove} title="Help">
            <div className="p-8 text-page-white overflow-scroll flex flex-col h-full no-scrollbar">
                <div className="flex flex-col gap-4">
                    <p className="text-md">
                        If you have any issues/comments, send me a message {" "}
                        <Link href="https://x.com/yuyu933933" target="blank">
                            @yuyu933933
                        </Link> and I&apos;ll try to help you out.
                    </p>
                    <p className="text-md">
                        The watch history data is provided by YouTube/Google and can be missing some information/views,
                        making some attributes slightly inaccurate. 
                        (I usually find that the older the timeframe gets, the more records it may be missing).
                    </p>
                    <p className="text-md">
                        Your watch history data is only stored on your device unless you explicitly create a shareable rewind.
                        Only the minimum amount of information required to create your rewind is stored.
                    </p>
                    <p className="text-md">
                        Watch time is an approximated attribute as YouTube does not provide this data.
                    </p>
                </div>
            </div>
        </LeftDrawer>
    )
}


export default NiceModal.create(HelpDrawer)