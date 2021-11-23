import { render, useState, createElement } from '@wordpress/element'
import ContentFinder from "./components/ContentFinderComponent"
import SelectedVideo from './components/SelectedVideoComponent'
import DmSdk from "./libs/dmSdk"
import { Button, Modal } from '@wordpress/components'
import '@wordpress/components/build-style/style.css'

function dmVideoSearch() {
    return (
        <>
            <SelectedVideo />
            <hr />
            <ContentFinder />
        </>
    )
}

// const MyModal = withState( {
//     isOpen: false,
// } )( ( { isOpen, setState } ) => (
//     <>
//         <Button isDefault onClick={ () => setState( { isOpen: true } ) }>Open Modal</Button>
//         { isOpen && (
//             <Modal
//                 title="This is my modal"
//                 onRequestClose={ () => setState( { isOpen: false } ) }>
//                 <Button isDefault onClick={ () => setState( { isOpen: false } ) }>
//                     My custom close button
//                 </Button>
//             </Modal>
//         ) }
//     </>
// ) )

const MyModal = () => {

    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <>
            <Button className="button" id="insert-dailymotion" type="button" onClick={ () => setIsOpen( true ) }>
                <svg width="16" height="16" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"
                     xmlns="http://www.w3.org/2000/svg">
                    <path className="path"
                          d="m12.1479 18.5957c-2.4949 0-4.28131-1.7558-4.28131-4.0658 0-2.2176 1.78641-4.0965 4.09651-4.0965 2.2793 0 4.0349 1.7864 4.0349 4.1581 0 2.2794-1.7556 4.0042-3.8501 4.0042zm8.3521-18.5957-4.5329 1v7c-1.1088-1.41691-2.8028-1.8787-4.8049-1.8787-2.09443 0-3.97329.76993-5.5133 2.27917-1.72483 1.66323-2.6489 3.78863-2.6489 6.16033 0 2.5873.98562 4.8049 2.89526 6.499 1.44763 1.2936 3.17251 1.9402 5.17454 1.9402 1.9713 0 3.4498-.5236 4.8973-1.9402v1.9402h4.5329c0-7.6359 0-15.3641 0-23z"
                          fill="#2271b1"></path>
                </svg>
                Dailymotion</Button>
            { isOpen && (
                <Modal className="popup__content-finder" title="Find a Video" onRequestClose={ () => setIsOpen( false ) }>
                    <ContentFinder resultsPerPage={12} />
                    {/*<Button isDefault onClick={ () => setIsOpen(false) }>Close</Button>*/}
                </Modal>
            ) }
        </>
    )
}

document.addEventListener('dm-sdk-ready', () => {
    render( createElement( MyModal ), document.getElementById('dm-search-classic'))
})

new DmSdk()
