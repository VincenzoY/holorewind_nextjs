import Link from "@/components/GenericComponents/Link/Link";


export default function Page() {
    return (
        <div className="w-full flex items-center justify-center h-dvh relative">
          <div className="text-page-white flex flex-col gap-4">
            <h6 className="text-2xl md:text-4xl">We're undergoing maintenance</h6>
            <p className="text-xl md:text-2xl">See{" "}
              <Link href="https://x.com/yuyu933933" target="blank">
                @yuyu933933
              </Link>{" "}
              for updates
            </p>
          </div>
        </div>
    )
}