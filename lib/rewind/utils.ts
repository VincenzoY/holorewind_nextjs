import { MinHeap } from 'heap-typed';
import { RewindDataItem } from './rewind';

export type HeapInfo<T> = {
    n: number
    type: "largest" | "smallest"
    lambda: (item:T) => RewindDataItem,
}

interface HeapInfoWithHeap<T> extends HeapInfo<T> {
    heap: MinHeap
}

export function nLargestArray<T>(array: Array<T>, n: number, lambda: (item:T) => RewindDataItem) {
    const heap = new MinHeap<RewindDataItem>([], {comparator: (a: RewindDataItem, b: RewindDataItem) => a.key - b.key})

    for(let i = 0; i < array.length; i++) {
        const result = lambda(array[i])
        heap.add(result) 

        if (i >= n) { heap.poll() }
    }

    const nLargest = []
    for(let item: RewindDataItem | undefined = heap.poll(); item !== undefined; item = heap.poll()) {
        nLargest.push(item)
    }

    return nLargest
}

export function nLargestObjects<T>(objects: Record<string, T>, properties: Record<string, HeapInfo<T>>): Record<string, Array<RewindDataItem>> {
    const heapData: Record<string, HeapInfoWithHeap<T>> = {}
    for (const propertyId in properties) {
        heapData[propertyId] = {
            ...(properties[propertyId]),
            heap: (
                properties[propertyId]["type"] === "largest" ? 
                new MinHeap<RewindDataItem>([], {comparator: (a: RewindDataItem, b: RewindDataItem) => a.key - b.key}) : 
                new MinHeap<RewindDataItem>([], {comparator: (a: RewindDataItem, b: RewindDataItem) => b.key - a.key})
            )
        }
    }

    for (const objectId in objects) {
        for (const propertyId in properties) {
            const {heap, lambda, n: maxHeapSize} = heapData[propertyId]

            const result = lambda(objects[objectId])
            heap.add(result)
            while (heap.size > maxHeapSize) { 
                heap.poll() 
            } 
        }
    }

    const data: Record<string, any> = {}

    for (const propertyId in properties) {
        const nLargest = []
        const heap = heapData[propertyId]["heap"]
        for(let item = heap.poll(); item !== undefined; item = heap.poll()) {
            nLargest.push(item)
        }
        data[propertyId] = nLargest.reverse()
    }

    return data
}

export type AccumulatorInfo<T, A> = {
    initialValue: A,
    reducer: (item: T, acc: A) => A,
}

export function reduce<T, A>(objects: Record<string, T>, properties: Record<string, AccumulatorInfo<T, A>>) {
    const data: Record<string, A> = {}

    for (const propertyId in properties) {
        data[propertyId] = properties[propertyId]["initialValue"]
    }

    for (const objectId in objects) {
        for (const propertyId in properties) {
            data[propertyId] = properties[propertyId]["reducer"](objects[objectId], data[propertyId])
        }
    }

    return data
}

