export function parseTextWithLinks(text) {
    const cleanedText = text.replace(/(\n\s*\n){5,}/g, '\n\n\n\n')

    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = urlRegex.exec(cleanedText)) !== null) {
        const index = match.index
        const url = match[0]

        if (index > lastIndex) {
            parts.push({
                type: "text",
                content: cleanedText.slice(lastIndex, index)
            })
        }

        parts.push({
            type: "link",
            content: url
        })

        lastIndex = index + url.length
    }

    if (lastIndex < cleanedText.length) {
        parts.push({
            type: "text",
            content: cleanedText.slice(lastIndex)
        })
    }

    return parts
}

/**
 * Formats a phone number by inserting two blank spaces.
 * The first space is after the first 4 digits, and the second space is after the 7th digit.
 * 
 * @param {string} phoneNumber The phone number to format.
 * @returns {string} The formatted phone number.
 */
export function formatPhoneNumber(phoneNumber) {
    return phoneNumber.slice(0, 4) + ' ' + phoneNumber.slice(4, 7) + ' ' + phoneNumber.slice(7)
}