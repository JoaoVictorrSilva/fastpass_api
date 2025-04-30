export abstract class Entity<Props> {
    protected readonly _id: number | null;
    protected props: Props;

    protected constructor(props: Props, id?: number | null) {
        this.props = props;
        this._id = id ?? null;
    }

    public get id(): number | null {
        return this._id;
    }

    public equals(entity?: Entity<Props>): boolean {
        if (entity === null || entity === undefined) {
            return false;
        }

        if (this === entity) {
            return true;
        }

        return this._id === entity._id;
    }
}