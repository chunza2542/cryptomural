import TWITTER from "../constants/Twitter"

const TwitterShareButton = ({url}:any) => {
    const text = `I just mint a new cool generative NFT Twitter header 🎉

check it out here 👉 ${url}

Let's mint your own here 👉 ${TWITTER.share.website}`
    
    return <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=${TWITTER.share.hashtags.join()}`} target="_blank">Share on Twitter</a>
}
export default TwitterShareButton
