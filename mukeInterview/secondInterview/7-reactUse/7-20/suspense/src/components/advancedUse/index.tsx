
// import ContextDemo from './ContextDemo'
// import UncontrolledDemo from './UncontrolledDemo'
// import PortalsDemo from './PortalsDemo'
import { LazyDemo } from './LazyDemo'
// import SCUDemo from './SCUDemo'
// import SCUDemo2 from './SCUDemo2'
// import PureComponentDemo from './PureComponentDemo'
// import HOCDemo from './HOCDemo'


const Home = () => {
    return <div>
        Home外层也是动态引入的
        <LazyDemo />
    </div>
}

export default Home
