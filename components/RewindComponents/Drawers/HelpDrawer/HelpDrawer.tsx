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
                            @yuyu
                        </Link> and I&apos;ll try to help you out.
                    </p>
                    <p className="text-md">
                        TLDR: watch time is the most accurate for a person who watches one video at a time and either watches a video to the end 
                        or clicks a different YouTube video when finished watching a video partways. 
                        The less similar you are to this person, the less accurate your watch time data will be.
                        There is also a randomness portion on how accurate the data from YouTube is. It may be missing large swathes of videos (eg. a few consecutive months).
                        Since I have no control over YouTube, I cannot improve this. You may be able to get more info by trying again later as they do have the data
                        (assuming you didn&apos;t clear it). It just will sometimes not be included in the export.
                    </p>
                    <p className="text-md">
                        If you find you have no watch data, it is possible you are logged in as the wrong account on 
                        Google Takeout. It might also be possible that your history is e a stored under a brand account; in 
                        which case you should login under that account in Google Takeout.
                    </p>
                    <p className="text-md">
                        The watch history data is provided by YouTube/Google and can be missing some information/views,
                        making some attributes slightly inaccurate. 
                        (I usually find that the older the timeframe gets, the more records it may be missing).
                        I also believe that if you pause/clear your watch history through YouTube, those won&apos;t show
                        but i haven&apos;t tested it.
                    </p>
                    <p className="text-md">
                        YouTube does not provide watch time and only provides the time you click on a video so watch time is 
                        an approximated attribute. To approximate for watch time, I assume you either watch the whole video or 
                        the duration until you click on a different youtube video. (This could be error prone however if you always
                        play a separate video in the background as I cannot determine it as a secondary video and I assume you switch
                        to watching the new video).
                        There&apos;s some extra stuff I calculate to try to be more accurate but that&apos;s the general idea
                        (It should hopefully be a good enough approximation).
                    </p>
                </div>
            </div>
        </LeftDrawer>
    )
}


export default NiceModal.create(HelpDrawer)