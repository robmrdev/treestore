import MainHero from '../MainHero/MainHero';
import MeetTheProducts from '../MeetTheProducts/MeetTheProducts';
import TreeCounter from '../TreeCounter/TreeCounter';

const MainPage = (setActualPage) => {
    return (
        <>
            <MainHero/>
            <MeetTheProducts  setActualPage={setActualPage}/>
            <TreeCounter />
        </>
    )
}

export default MainPage