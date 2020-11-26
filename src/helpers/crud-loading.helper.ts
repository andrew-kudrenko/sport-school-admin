import { ICRUDActions } from "../interfaces/redux.interfaces"

type CRUDLoading = [boolean, boolean, boolean, boolean]

export function collectCRUDLoading(variants: CRUDLoading): ICRUDActions<boolean> {
    const [create, read, update, remove] = variants

    return { create, read, update, delete: remove }
}