import React from "react"
import { __ } from "@wordpress/i18n"
import { select } from "@wordpress/data"
import { useForm } from "react-hook-form"

/**
 * Render a select-option form with channels data on it
 * This select-option form will give a value back as `channelId`
 *
 * @param {array} channels
 * @param {*} register
 * @returns {JSX.Element|null}
 * @constructor
 */
const RenderChannels = ({channels, register}) => {
    const channelsOption = []

    if (channels.length < 1) return null

    for (let i=0; i < channels.length; i++) {
        channelsOption.push(
            <option value={channels[i].id}>{ channels[i].id + ' - ' + channels[i].screenname }</option>
        )
    }

    return <>
        <label for="channelId">{ __("Channel ID", "textdomain") }</label>
        <select {...register("channelId")} className="dm__input" id="channelId" name="channelId">
            { channelsOption }
        </select>
    </>
}

/**
 * Will show a form with some input data below
 *
 * 1. keywords
 * 2. channelId (conditional, this will be appeared if user
 *  stored their api key and api secrets)
 * 3. findGlobal
 * 4. findPlaylist
 *
 * Those data will be passed to the parent function to be
 * process to get videos based on keywords
 *
 * @param {array} channelList
 * @param {function} onSearching
 * @returns {JSX.Element}
 * @constructor
 */
const FormFinder = ({
    channelList,
    onSearching = () => null
}) => {
    const { register, handleSubmit } = useForm()

    const submitForm = formData => {
        onSearching(formData)
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} id="formFinder">
            <label htmlFor="keywords">{__("Keywords", "textdomain")}</label>
            <input id="keywords"
                   type="text"
                   name="keywords"
                   className="dm__input"
                   {...register("keywords")}
            />

            <RenderChannels channels={channelList} register={register}></RenderChannels>

            <label htmlFor="find-global" className="checkbox-label">
                <input type="checkbox"
                       id="find-global"
                       name="findGlobal"
                       {...register("findGlobal")}
                /> {__("Find global", "textdomain")}
            </label>

            <label htmlFor="find-playlist" className="checkbox-label">
                <input type="checkbox"
                       id="find-playlist"
                       name="findPlaylist"
                       {...register("findPlaylist")}
                /> {__("Find playlist", "textdomain")}
            </label>

            <button type="submit" className="action button">{ __("Find", "textdomain") }</button>
        </form>
    )
}

export default FormFinder
