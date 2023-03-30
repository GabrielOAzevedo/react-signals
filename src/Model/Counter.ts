export class Counter {
    private count: number;
    constructor() {
        this.count = 0;
    }

    public increment() {
        this.count++;
    }

    public decrement() {
        this.count--;
    }

    public getCount() {
        return this.count;
    }
}