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
                        YouTube does not provide watch time and only provides the time you click on a video so watch time is 
                        an approximated attribute. To approximate for watch time, I assume you either watch the whole video or 
                        the duration until you click on a different youtube video.
                        (There's some extra stuff I calculate but that's the general idea so it should hopefully be a good enough approximation).
                    </p>
                    <p className="text-md">
                        Your watch history data is only stored on your device unless you explicitly create a shareable rewind.
                        Only the minimum amount of information required to create your rewind is stored.
                    </p>
                </div>
            </div>
        </LeftDrawer>
    )
}


export default NiceModal.create(HelpDrawer)