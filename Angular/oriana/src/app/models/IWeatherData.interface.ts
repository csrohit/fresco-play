export interface IWeatherData {
    city: string;
    country: string;
    weather: ICityWeather[];
}

export interface ICityWeather {
    date: string;
    temperature: number;
    weather_name: string;
    weather_image: string;
}

export interface ISearchResult {
    title: string;
    location_type: string;
    woeid: number;
    latt_long: string;
}
