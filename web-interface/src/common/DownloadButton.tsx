import { useState, useEffect } from "react";

const DownloadButton = ({url}:any) => {
    const [imageUrl, setUrl] = useState<string>("")
    useEffect(()=>{
        
        const c = document.createElement("canvas");
        c.setAttribute("width", "3000px")
        c.setAttribute("height", "1000px")
        const ctx:any = c.getContext("2d")

        const i:any = document.createElement("img");
        i.setAttribute("src", url)
        i.setAttribute("width", "3000px")
        i.setAttribute("height", "1000px")

        i.crossOrigin = "anonymous"
        
        i.onload = () => {
            ctx.drawImage(i, 0, 0, 3000, 1000)
            url = c.toDataURL("image/png")
            const a = document.createElement("a");
            setUrl(url)
            c.remove()
            i.remove()
        }

        i.onerror = () => {
            c.remove()
            i.remove()
        }
    }, [])

    return <a href={imageUrl} download>Download</a>
}
export default DownloadButton
