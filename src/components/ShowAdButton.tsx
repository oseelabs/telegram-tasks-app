import { useEffect } from "react";

const ShowAdButton = () => {
    useEffect(() => {
        if (window.show_8739820) {
            return
        }

        const tag = document.createElement('script')

        tag.src = '/niphaumeenses.net/vignette.min.js'
        tag.dataset.zone = '8739820'
        tag.dataset.sdk = 'show_8739820'

        document.body.appendChild(tag)
    }, [])

    const showAd = () => {
        show_8739820().then(() => {
            // add here the function that should be executed after viewing the ad
        })
    }

    return <button onClick={showAd}>Show ad</button>
};

export default ShowAdButton;