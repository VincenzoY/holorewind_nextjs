import { useEffect, useRef, useState } from "react";
import css from "./FakeParagraph.module.css"

interface FakeParagraphProps {
    indent?: boolean
    lineHeight?: number
}

export default function FakeParagraph({
    indent = false,
    lineHeight = 20,
}: FakeParagraphProps) {
    const fakeParagraphRef = useRef<HTMLDivElement>(null)
    const [numOfLines, setNumOfLines] = useState(0)

    useEffect(() => {
        if (fakeParagraphRef.current) {
            const observer = new ResizeObserver((entries, _) => {
                for (const entry of entries) {
                    setNumOfLines(Math.floor(entry.target.clientHeight / lineHeight))
                }
            })

            observer.observe(fakeParagraphRef.current)
            
            return () => observer.disconnect()
        }
    }, [lineHeight])

    const endWidth = Math.floor(Math.random() * (80-20)) + 20;

    return (
        <div className="h-full relative" ref={fakeParagraphRef}>
            <div className="absolute w-full">
                {numOfLines != 0 && 
                    <>
                        {[...Array(numOfLines-1)].map((_, i) => <FakeLine key={i} />)}
                        <FakeLine width={endWidth}/>
                    </>
                }
            </div>
        </div>
    )
}

interface FakeLineProps {
    width?: number
}

function FakeLine({
    width = 100
}: FakeLineProps) {
    return (
        <div className={`h-[1.25rem] flex items-center`}>
            <div 
                className={`h-[0.875rem] bg-gradient-to-r from-[#3C3C3C] to-[#3C3C3C]`}
                style={{width: `${width}%`}}
            />
        </div>
    )
}

function getStyleValue(el: HTMLSpanElement, property: string) {
    return window.getComputedStyle(el).getPropertyValue(property);
}
