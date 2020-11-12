import { useState } from "react"
import { IDType } from "../interfaces/entities.interfaces"

export function useSelected() {
    const [selected, setSelected] = useState<Array<IDType>>([])

    function select(id: IDType | Array<IDType>) {
        if (Array.isArray(id)) {            
            setSelected([...selected, ...id.filter(s => !selected.includes(s))])
        } else {
            const includes: boolean = selected.includes(id) 

            if (!includes) {
                setSelected([...selected, id])
            }
        }
    }

    function unselect(id: IDType | Array<IDType>) {
        if (Array.isArray(id)) {
            setSelected(selected.filter(s => !id.includes(s)))
        } else {
            setSelected(selected.filter(s => s !== id))
        }
    }

    function has(id: IDType): boolean {
        return selected.includes(id)
    }

    return { selected, select, unselect, has }
}