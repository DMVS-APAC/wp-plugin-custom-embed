
export default function pagination(props) {
    const {contentData, currentPage, callback} = props

    if (Object.entries(contentData).length === 0 || contentData.total === 0 || contentData.has_more === false) {
        return <></>
    }

    if (contentData.page === 1 && contentData.has_more === true) {
        return (
            <>
                <button type="button" className="components-button button action dm__next-button"
                        onClick={() => callback(currentPage + 1)}>Next
                </button>
            </>
        )
    }

    if (contentData.has_more === false && contentData.page !== 1) {
        return (
            <>
                <button type="button" className="components-button button action dm__prev-button"
                        onClick={() => callback(currentPage - 1)}>Previous
                </button>
            </>
        )
    }

    return (
        <>
            <button type="button" className="components-button button action dm__prev-button"
                    onClick={() => callback(currentPage - 1)}>Previous
            </button>
            <button type="button" className="components-button button action dm__next-button"
                    onClick={() => callback(currentPage + 1)}>Next
            </button>
        </>
    )
}