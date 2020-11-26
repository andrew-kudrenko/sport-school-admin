import { useEffect, useState } from "react"
import { IdentifiedEntity, IDType } from "../interfaces/entities.interfaces"

export function useSelected(observable: Array<IdentifiedEntity>) {
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

    function allSelected<T = any>(list: Array<T>): boolean {
        return list.length === selected.length
    }

    function onToggleAll<T extends IdentifiedEntity>(list: Array<T>) {
        const keys: Array<IDType> = list.map(c => c.id)

        if (!allSelected(list)) {
            select(keys)
        } else {
            unselect(keys)
        }
    }

    function onToggle(id: IDType) {
        if (selected.includes(id)) {
            unselect(id)
        } else {
            select(id)
        }
    }

    function unselectAll() {
        setSelected([])
    }
    
    useEffect(() => {
        setSelected(selected.filter(s => observable.find(o => o.id === s)))
    }, [observable])

    return { selected, has, allSelected, onToggle, onToggleAll, unselectAll }
}