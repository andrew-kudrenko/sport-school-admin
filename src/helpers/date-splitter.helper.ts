import { Nullable } from "../types/common.types"

export function splitDate(date: Nullable<Date>) {
    if (date?.toJSON()) {
        return date.toJSON().split('T')[0]
    }

    return null
}