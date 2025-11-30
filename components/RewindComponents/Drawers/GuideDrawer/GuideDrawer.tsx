import LeftDrawer from "@/components/GenericComponents/LeftDrawer/LeftDrawer"
import Link from "@/components/GenericComponents/Link/Link"
import NiceModal, { useModal } from "@ebay/nice-modal-react"
import Image from 'next/image'
import GoogleTakeoutHompageImage from './images/google_takeout_homepage.png'
import GoogleTakeoutSettingsGif from './images/google_takeout_settings.gif'
import GoogleTakeoutCreateExportImage from './images/google_takeout_create_export.png'
import GoogleTakeoutEmailImage from './images/google_takeout_email.png'

interface GuideDrawerProps {
}

const GuideDrawer: React.FC<GuideDrawerProps> = () => {
    const modal = useModal()

    return (
        <LeftDrawer visible={modal.visible} onClose={modal.hide} onExited={modal.remove} title={"Guide"}>
            <div className="p-8 text-page-white overflow-scroll flex flex-col gap-4 h-full no-scrollbar">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">
                        1. Visit {" "}
                        <Link href="https://takeout.google.com/settings/takeout/custom/youtube" target="blank">
                            Google Takeout
                        </Link>
                    </h3>
                    <Image 
                        src={GoogleTakeoutHompageImage}
                        alt="Google Takeout Homepage"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">
                        2. Customize the Export Settings
                    </h3>
                    <p className="text-md">
                        Under `Multiple Formats`, change `history` from `HTML` to `JSON`. 
                        Under `All YouTube data included`, select only `history`.
                        Then click `Continue`.
                    </p>
                    <Image 
                        src={GoogleTakeoutSettingsGif}
                        alt="Google Takeout Settings Page"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">
                        3. Create the export
                    </h3>
                    <p className="text-md">
                        Click `Create Export`.
                    </p>
                    <Image 
                        src={GoogleTakeoutCreateExportImage}
                        alt="Google Takeout Create Export Page"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">
                        4. Download your export
                    </h3>
                    <p className="text-md">
                        After a few minutes, check your email for your exported data.
                        Click `Download your files` to download your export.
                    </p>
                    <Image 
                        src={GoogleTakeoutEmailImage}
                        alt="Google Takeout Email"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">
                        5. Upload `watch-history.json` 
                    </h3>
                    <p className="text-md">
                        Unzip the download and find `watch-history.json` under the file path
                        `Takeout/YouTube and YouTube Music/history/watch-history.json`. Upload this
                        file to the Upload Watch History section.
                    </p>
                </div>
            </div>
        </LeftDrawer>
    )
}

export default NiceModal.create(GuideDrawer)