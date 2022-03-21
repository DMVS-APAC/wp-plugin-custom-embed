/**
 * Custom Event Creator
 *
 * A shorthand to create custom events. It includes the event name, the event
 * sender to track from where the event was triggered, and the event data.
 *
 * @param customEventName
 * @param eventSender
 * @param customEventData
 * @constructor
 */
export function CreateCustomEvent(customEventName, eventSender, customEventData) {
    customEventName = customEventName ?? 'customEvent'
    eventSender = eventSender ?? 'index'
    customEventData = customEventData ?? {}

    const customEvent = new CustomEvent(customEventName, {
        detail: {
            sender: eventSender,
            customEventData: customEventData
        },
        bubbles: true,
        cancelable: true
    })
    document.dispatchEvent(customEvent)
}

export function RemoveCustomEvent(customEventName) {
    document.removeEventListener(customEventName, () => {})
}
