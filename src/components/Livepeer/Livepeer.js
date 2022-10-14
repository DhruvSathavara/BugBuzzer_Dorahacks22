import { Client, isSupported } from '@livepeer/webrtmp-sdk'
import React, { useState, useRef, useEffect } from 'react'


export default function Livepeer() {

    const inputEl = useRef(null)
    const videoEl = useRef(null)
    const stream = useRef(null)

    useEffect(() => {
        ; (async () => {
            videoEl.current.volume = 0

            stream.current = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            })

            videoEl.current.srcObject = stream.current
            videoEl.current.play()
        })()
    })

    const onButtonClick = async () => {
        const streamKey = inputEl.current.value

        if (!stream.current) {
            alert('Video stream was not started.')
        }

        if (!streamKey) {
            alert('Invalid streamKey.')
            return
        }

        const client = new Client()

        const session = client.cast(stream.current, streamKey)

        session.on('open', () => {
            console.log('Stream started.')
            alert('Stream started; visit Livepeer Dashboard.')
        })

        session.on('close', () => {
            console.log('Stream stopped.')
        })

        session.on('error', (err) => {
            console.log('Stream error.', err.message)
        })
    }
 
    return (
        <>
            <div className="App footer-top"  id="roott">
                <input
                    id="input"
                    className="App-input"
                    ref={inputEl}
                    type="text"
                    placeholder="streamKey"
                />
                <video id="video" className="App-video" ref={videoEl} />
                <button id="button" className="App-button" onClick={onButtonClick}>
                    Start
                </button>
            </div>
        </>
    )
}
