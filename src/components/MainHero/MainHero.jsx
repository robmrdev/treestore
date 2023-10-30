import './MainHero.css'

const MainHero = () => {
    return (
        <section className='mainHeroContainer'>
            <div className='mainHero'>
                <div className='heroInfoContainer'>
                    <div className='heroInfoWrapper'>
                        <div className='heroInfo'>
                            <h2>New Winter Collection</h2>
                            <p>Set the scene for the season ahead with our newest and warmest winter-ready styles.</p>
                            <div className='heroButtons'>
                                <a href="/collections/womens"><strong>shop womens</strong></a>
                                <a href="/collections/mens"><strong>shop mens</strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainHero