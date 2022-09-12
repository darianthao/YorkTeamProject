import notFound from './images/404.png'
import {Image} from "react-bootstrap";

function NotFound() {
    return <>
        <div>
            <Image
                src={notFound}
                className='img-fluid'
            />
        </div>
    </>
}

export default NotFound