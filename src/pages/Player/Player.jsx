import './Player.css';
import React, { useEffect, useState } from 'react'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: ""
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTM4YzIxZmVjNmM1YzQwNTVjMThiYThhYzIxOWQ0MSIsIm5iZiI6MTczNzYzMzczNy44NjcsInN1YiI6IjY3OTIyZmM5ZWZhODUzMzdjM2ZhN2EyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9NHc9VkmdDK2wJ6u4g04goVqcDRZFIlasEm1Xu9VY6Y'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results[0]))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
            <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} frameBorder="0" title='triler' allowFullScreen></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player
