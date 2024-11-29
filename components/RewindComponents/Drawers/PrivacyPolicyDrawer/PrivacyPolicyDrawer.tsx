import LeftDrawer from "@/components/GenericComponents/LeftDrawer/LeftDrawer"
import Link from "@/components/GenericComponents/Link/Link"
import NiceModal, { useModal } from "@ebay/nice-modal-react"

interface PrivacyPolicyDrawerProps {
}

const PrivacyPolicyDrawer: React.FC<PrivacyPolicyDrawerProps> = () => {
    const modal = useModal()

    return (
      <LeftDrawer visible={modal.visible} onClose={modal.hide} onExited={modal.remove} title="Privacy Policy">
        <div className="p-8 text-page-white overflow-scroll flex flex-col h-full no-scrollbar">
            <div className="flex flex-col gap-4 text-md">
                <p>
                  HoloRewind was created by {" "}
                  <Link href="https://x.com/yuyu933933" target="blank">@yuyu933933</Link>.
                  This site is in no way affiliated with either YouTube or Cover Corp.
                </p>
                <p>
                  This policy describes how we use the information from visitors to this website. 
                  By continuing using the site, you agree to these uses of the data.
                </p>
                <ul className="list-disc pl-4 flex flex-col gap-2">
                  <li>
                    You understand that this site makes use of Holodex&apos;s API Services. 
                    Learn about the {" "}
                    <Link href="https://holodex.net/about">Holodex Privacy Policy</Link>.
                  </li>
                  <li>
                    You understand that this site makes use of YouTube&apos;s API Services. 
                    Learn about the {" "}
                    <Link href="https://policies.google.com/privacy">Google Privacy Policy</Link>.
                  </li>
                  <li>
                    Channel and Video information from Holodex&apos;s API about channels under Cover Corporation are stored for rewind generation and sharing.
                  </li>
                  <li>
                    Any data from the YouTube API or Holodex API generated from your activity is not shared with internal 
                    or external parties.
                  </li>
                  <li>
                    No third-party ads are served, nor user data is collected from your device.
                  </li>
                  <li>
                    Our website may feature embedded videos from YouTube. When you watch these videos, YouTube 
                    may set cookies on your device and collect data such as your IP address, your browser type, and the page you visited on our site. 
                    (<Link href="https://policies.google.com/privacy">Google Privacy Policy</Link>)
                  </li>
                  <li>
                    When you create a rewind, a record is created that a rewind was made for record keeping. The only information stored is that 
                    a rewind was generated and the time it was created.
                  </li>
                </ul>
                <p>
                  To create your HoloRewind, a copy of your YouTube watch history is requested. Below is what we do with the data you upload
                </p>
                <ul className="list-disc pl-4 flex flex-col gap-2">
                  <li>
                    Process the file to show you your HoloRewind
                  </li>
                  <li>
                    If you use any of the sharing features, the below information is uploaded to our database to generate a shareable copy.
                    Otherwise, the below information is only stored on your device.
                    <ul className="list-disc pl-4 flex flex-col gap-2">
                      <li>
                        General rewind information of total views, total unique views, total channel views and total approximate watch time.
                      </li>
                      <li>
                        The top 15 channels/videos pertaining to watch time, views and unique views.
                      </li>
                      <li>
                        The first video watch of the year and the amount of views per month.
                      </li>
                    </ul>
                  </li>
                </ul>
                <p>
                  This information is anonymized and no information about 
                  your YouTube account (other than your watch history) is contained in the watch history file.
                </p>
                <p>
                  If you have any questions or concerns about the privacy of handling of data on this site, 
                  contact me by sending a message to @yuyu933933 on Twitter.
                </p>
            </div>
        </div>
      </LeftDrawer>
    )
}


export default NiceModal.create(PrivacyPolicyDrawer)