import { __ } from "@wordpress/i18n"

/**
 * This is a pagination component
 *
 * It will process the data thrown by some component
 * and the show the pagination based on it.
 *
 * @param props
 * @returns {JSX.Element}
 */
export default function pagination(props) {
    const {contentData, currentPage, callback} = props

    /**
     * About this empty conditions
     *
     * 1. Of course if there is no data exist it won't show nothing
     * 2. If data exist and the total is 0
     * 3. Different with 2 above, this condition if the result found videos
     *    but only for page 1
     */
    if (Object.entries(contentData).length === 0 ||
        contentData.total === 0 ||
        ( contentData.has_more === false && contentData.page === 1 ) ) {
        return <></>
    }

    if (contentData.page === 1 && contentData.has_more === true) {
        return (
            <>
                <button type="button" className="components-button button action dm__next-button"
                        onClick={() => callback(currentPage + 1)}>{ __('Next', 'textdomain') }
                </button>
            </>
        )
    }

    if (contentData.has_more === false && contentData.page !== 1) {
        return (
            <>
                <button type="button" className="components-button button action dm__prev-button"
                        onClick={() => callback(currentPage - 1)}>{ __('Previous', 'textdomain') }
                </button>
            </>
        )
    }

    return (
        <>
            <button type="button" className="components-button button action dm__prev-button"
                    onClick={() => callback(currentPage - 1)}>{ __('Previous', 'textdomain') }
            </button>
            <button type="button" className="components-button button action dm__next-button"
                    onClick={() => callback(currentPage + 1)}>{ __('Next', 'textdomain') }
            </button>
        </>
    )
}