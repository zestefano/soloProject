import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllSongs } from "../../store/songReducer";
import AudioPlayer from "../ReactAudioPlayer";
import '../../components/Songs/songs.css'


const Songs = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const songs = useSelector((state) => Object.values(state.songs))
    // console.log(sessionUser)
    console.log(songs)

    // const [songUrl, setSongUrl] = useState('')

    useEffect(() => {
        dispatch(loadAllSongs())
    }, [dispatch])

    return (
        <div className='songs'>
            {songs.map(song => (
                <div
                    // value={songUrl}
                    // onClick={e => setSongUrl(e.target.value)}
                 >
                    <img src={song.imgUrl} className='img' />
                    <AudioPlayer songUrl={song.songUrl} title={song.title} />
                    {/* <p>{song.songUrl}</p> */}
                </div>
                
                ))}
        </div>
    )
}

export default Songs;