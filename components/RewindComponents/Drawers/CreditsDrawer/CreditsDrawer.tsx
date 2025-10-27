import LeftDrawer from "@/components/GenericComponents/LeftDrawer/LeftDrawer"
import Link from "@/components/GenericComponents/Link/Link"
import NiceModal, { useModal } from "@ebay/nice-modal-react"

interface CreditsDrawerProps {
}

const CreditsDrawer: React.FC<CreditsDrawerProps> = () => {
    const modal = useModal()

    return (
        <LeftDrawer visible={modal.visible} onClose={modal.hide} onExited={modal.remove} title="Credits">
            <div className="p-8 text-page-white overflow-scroll flex flex-col h-full no-scrollbar">
                <div className="flex flex-col gap-4">
                    <p className="text-md">
                        This is a fan made website and is not affiliated with Cover Corp. 
                        This site follows the guidelines set by Cover Corp&apos;s {" "}
                        <Link href="https://hololivepro.com/en/terms/" target="blank">
                            Derivative Works Guidelines
                        </Link>
                    </p>
                    <p className="text-md">
                        Thanks to {" "} 
                        <Link href="https://x.com/Anonamos_701" target="blank">
                            @advarcher
                        </Link> for the cool background art!
                    </p>
                    <p className="text-md">
                        This site was inspired by Anthony Teo&apos;s {" "}
                        <Link href="https://videorecap.viewodyssey.com/" target="blank">
                            Video Recap for YouTube
                        </Link>. However, I have limited my focus to Hololive/VTubers
                        which allows for a more personalized and slightly more accurate recap.
                        Definitely check out their site if you are interested.
                    </p>
                    <p className="text-md">
                        Thanks to {" "}
                        <Link href="https://holodex.net/" target="blank">
                            Holodex
                        </Link> as this project wouldn&apos;t be possible without their API. 
                        (I didn&apos;t know going in how restrictive YouTube&apos;s API would be)
                    </p>
                    <p className="text-md">
                        Made by {" "}
                        <Link href="https://x.com/yuyu933933" target="blank">
                            @yuyu933933
                        </Link>.
                        (You should go follow me :D) 
                    </p>
                    <hr className="border-ame-gold border-1"/>
                    <p className="text-md">
                        Thanks to everyone who checked this out last year and this year. It was cool to build something
                        that people used and shared! I hope you guys liked it too. It was also important to me that I expanded
                        to more VTubers so you (and I) could share/celebrate wider communities than just Hololive. 
                        <br /><br />
                        Of course, I also have to mention the graduations of Fauna, Mumei and Gura. I had many feelings from their
                        graduations but mostly it&apos;s respect that they have made a decision that they think is best. My greatest well
                        wishes to Mumei who seems to be departing on the most different path.
                        <br /><br />
                        - 2025 
                    </p>
                    <hr className="border-ame-gold border-1"/>
                    <p className="text-md">
                        I also wanted to leave a thanks to Amelia Watson. I actually was planning to 
                        do this project last year but lost motivation for it. Ame&apos;s graduation made me
                        reminisce on all the cool stuff she did over the last 4 years. Her passion pushed 
                        me to actually finish this. Also thanks to my oshi Kronii (which funnily enough is
                        on theme with the time/rewind stuff).
                        <br /><br />
                        - 2024 
                    </p>
                    <hr className="border-ame-gold border-1"/>
                </div>
            </div>
        </LeftDrawer>
    )
}


export default NiceModal.create(CreditsDrawer)