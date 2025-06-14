export interface ExtractDTO {
    id: number;
    value: number;
    moviment: "CREDIT" | "DEBIT";
    description: string;
    created_at: Date;
}
