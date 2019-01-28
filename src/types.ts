export interface IDataset {
    id: number;
    dataset_code: string;
    database_code: string;
    name: string;
    description: string;
    refreshed_at: string;
    newest_available_date: string;
    oldest_available_date: string;
    column_names: string[];
    frequency: string;
    type: string;
    premium: boolean;
    limit?: any;
    transform?: any;
    column_index?: any;
    start_date: string;
    end_date: string;
    data: any[][];
    collapse?: any;
    order?: any;
    database_id: number;
}

export interface IError {
    code: string;
    message: string;
}

export interface IQuandlSuccessResponse {
    dataset: IDataset;
}

export interface IQuandlErrorResponse {
    quandl_error: IError;
}