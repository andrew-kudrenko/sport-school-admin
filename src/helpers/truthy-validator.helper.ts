export function validate(values: Array<any>): boolean {
    return values.reduce((acc, value) => Boolean(acc) && Boolean(value), true)
}