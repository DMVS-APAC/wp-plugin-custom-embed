import React from 'react'
import { __ } from '@wordpress/i18n'

/**
 * There are 4 conditions of return
 *
 * 1. If the `contentData` is empty, it's just return an empty tag
 * 2. If found `error`, it will show the error message
 * 3. If data exist, it will show the data in a component
 * 4. If data exist but can't find any content, it will show "No video found"
 *
 * @param contentData
 * @param callback
 * @returns {JSX.Element|*[]}
 * @constructor
 */
const RenderContent = ({
    contentData,
    callback = () => null
}) => {
    const contentComponent = []

    if (contentData.length === 0) {
        contentComponent.push(<li></li>)
    } else if (contentData.error !== undefined) {
        let message = contentData.error.message

        if (message.includes('Invalid parameter')) {
            message = 'Only authenticated users can use this filter.'
        }

        contentComponent.push(
            <li className="dm--grid-expand-2">{message}</li>
        )
    } else if (typeof contentData.list !== 'undefined' && contentData.list.length > 0) {
        const list = contentData.list

        if ( list[0].title ) {
            for (let i = 0; i < list.length; i++) {
                contentComponent.push(
                    <li key={list[i]}
                        className={`content__item ${list[i].private ? "private" : ""} ${list[i].status === 'ready' ? "draft" : ""}`}>
                        <button onClick={() => callback(list[i])} type="button">
                            <figure className="content__image-wrapper">
                                <div className="content__placement">
                                    <img src={list[i].thumbnail_240_url} alt={list[i].title}
                                         className="content__thumbnail"/>
                                </div>
                            </figure>
                            <span className="content__title" title={list[i].title}>{list[i].title}</span>
                        </button>
                    </li>
                )
            }
        } else {
            for (let i = 0; i < list.length; i++) {
                contentComponent.push(
                    <li key={list[i]} className={`content__item ${list[i].private ? "private" : ""}`}>
                        <button onClick={() => callback(list[i])} type="button">
                            <figure className="content__image-wrapper">
                                <div className="content__placement">
                                    <img src={list[i].thumbnail_240_url} alt={list[i].name} className="content__thumbnail" />
                                </div>
                            </figure>
                            <span className="content__title" title={list[i].title}>{list[i].name}</span>
                        </button>
                    </li>
                )
            }
        }

    } else {
        contentComponent.push(
            <li>{ __('No video found…', 'textdomain') }</li>
        )
    }

    return contentComponent
}

/**
 * A container for the result
 *
 * @param content
 * @param onAction
 * @returns {JSX.Element}
 * @constructor
 */
const ResultsComponent = ({
    content,
    onAction = () => null
}) => {

    return (
        <>
            <ul className="dm__search-results">
                <RenderContent contentData={content} callback={onAction} />
            </ul>
        </>
    )
}

export default ResultsComponent
