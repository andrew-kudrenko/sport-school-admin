export function splitDate(date: Date) {
    return date.toJSON().split('T')[0]
}