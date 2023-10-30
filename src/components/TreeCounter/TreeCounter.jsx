import './TreeCounter.css'

const TreeCounter = () => {
    return (
        <section className='treeCounterContainer'>
            <h2>Together We've Planted</h2>
            <div className='treeCount'>105,116,552</div>
            <p>We're committed to helping protect our planet by planting 1 billion trees by 2030.</p>
            <small>Learn more <img className='arrowIcon'src="./img/resources/arrow-tree-right.svg" alt="" /></small>
        </section>
    )
}

export default TreeCounter