export class ResponseData {
    Data: any;
    Status!: Status;
    Pagination!: Pagination
}
export class Status {
    Code!: number;
    Message!: string
}
export class Pagination {
    PageSize!: number;
    PageIndex!: number;
    TotalRows!: number
}
