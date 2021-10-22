import { useState, useEffect } from "react";

const DownloadButton = () => {
    return <a href={`https://twitter.com/intent/tweet?text=${text}`} target="_blank">Share on Twitter</a>
}
export default DownloadButton
