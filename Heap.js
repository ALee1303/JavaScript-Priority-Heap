
class Heap {
    constructor(comparer) {
        this.data = []
        this.compare = comparer
    }
    
    add(val) {
        //console.log("adding:", val)
        this.data.push(val)
        let idx = this.data.length - 1
        let parIdx = Heap.getParentIdx(idx)
        while (idx && this.compare(this.data[parIdx], this.data[idx])) {
            const temp = this.data[parIdx]
            this.data[parIdx] = this.data[idx]
            this.data[idx] = temp
            idx = parIdx
            parIdx = Heap.getParentIdx(idx)
        }
    }
    
    pop() {
        //console.log("popping:", this.data[0])
        const toRet = this.data[0]
        const lastIdx = this.len() - 1
        console.log("   last Idx:",lastIdx)
        this.data[0] = this.data[lastIdx]
        this.data.pop()
        this.heapify()
        return toRet
    }
    
    len() {
        return this.data.length
    }
    
    heapify(idx = 0) {
        //console.log("   heapifying at idx:", idx)
        const left = Heap.getLeftIdx(idx)
        const right = Heap.getRightIdx(idx)
        let priority = idx
        if (this.data[left] &&
            this.compare(this.data[priority], this.data[left])) {
            //console.log("left is priority:", this.data[priority], this.data[left])
            priority = left
        }
        if (this.data[right] &&
            this.compare(this.data[priority], this.data[right])) {
            //console.log("right is priority:", this.data[priority], this.data[left])
            priority = right
        }
        if (idx !== priority) {
            const temp = this.data[idx]
            this.data[idx] = this.data[priority]
            this.data[priority] = temp
            this.heapify(priority)
        }
    }
}

Heap.getParentIdx = function(idx) {
    if (!idx)
        return null
    return Math.ceil(idx / 2) - 1
}

Heap.getLeftIdx = function(idx) {
    return idx * 2 + 1
}

Heap.getRightIdx = function(idx) {
    return idx * 2 + 2
}