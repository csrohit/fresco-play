export interface IWeatherRawData {
    consolidated_weather: [
        {
            weather_state_name: string,
            weather_state_abbr: string,
            applicable_date: string;
            the_temp: number,
        }
    ];
    parent: {
        title: string,
    };
    title: string;
}
