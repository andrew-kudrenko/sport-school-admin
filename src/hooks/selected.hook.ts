import { useState } from "react"
import { IDType } from "../interfaces/entities.interfaces"

export function useSelected() {
    const [selected, setSelected] = useState<Array<IDType>>([])

    function select(id: IDType | Array<IDType>) {
        if (Array.isArray(id)) {
            setSelected([...selected, ...id])
        } else {
            setSelected([...selected, id])
        }
    }

    function unselect(id: IDType | Array<IDType>) {
        if (Array.isArray(id)) {
            setSelected(selected.filter(s => s in id))
        } else {
            setSelected(selected.filter(s => s !== id))
        }
    }

    function has(id?: IDType): boolean {
        if (!id) {
            return false
        }

        return id in selected
    }

    return { selected, select, unselect, has }
}