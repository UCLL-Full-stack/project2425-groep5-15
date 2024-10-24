class Show {
    private id: number;
    private startTime: string;
    private endTime: string;
    private date: Date;

    constructor(show: {id: number, startTime: string, endTime: string, date: Date}) {
        this.id = show.id;
        this.startTime = show.startTime;
        this.endTime = show.endTime;
        this.date = show.date;
    }

    public getId(): number {
        return this.id;
    }

    public getStartTime(): string {
        return this.startTime;
    }

    public getEndTime(): string {
        return this.endTime;
    }

    public getDate(): Date {
        return this.date;
    }
}

export default Show;