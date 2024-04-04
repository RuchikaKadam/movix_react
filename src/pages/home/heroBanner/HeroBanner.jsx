import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { UseSelector } from 'react-redux';
import './style.scss';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {url} = useSelector((state) => state.home)

    const {data, loading} = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = 
        url.backdrop + 
        data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setBackground(bg);
    }, [data])

    const searchQueryHandler = (e) => {
        if(e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }


  return (
    <div className="heroBanner">
        <div className="backdrop-img">
            <Img src={background}/>
        </div>

        {/* for giving the fading effect of heroSection */}
        <div className="opacityLayer"></div>

        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome!</span>
                <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now!</span>
                <div className="searchInput">
                    <input type="text" placeholder='Search for a movie or a TV show....' 
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                    />
                    <button>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner