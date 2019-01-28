export class Config {
    static componentsMainColor = "#0e6789";
    static apiKey = "jV6bWYyyNoABYxDcrPRY";
    static getApiUrl = (startDate?: string, endDate?: string, stockSymbol?: string) => 
    `https://www.quandl.com/api/v3/datasets/EOD/${stockSymbol}?start_date=${startDate}&end_date=${endDate}&api_key=${Config.apiKey}`;
}
