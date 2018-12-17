import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';


export interface WeatherForecastsState {
    isLoading: boolean;
    isError: boolean;
    forecasts: WeatherForecast;
}

export interface Graphic {
    date: Date;
    queueGraphicA: number;
    queueGraphicB: number;
}

export interface WeatherForecast {
    carsFromAAndOut: number;
    carsFromBAndOut: number;
    simulationTime: string;
    events: string;
    graphic: Graphic[];
}

export const EmptyForecasts: WeatherForecast = {
    carsFromAAndOut: 0,
    carsFromBAndOut: 0,
    simulationTime: "",
    events: "",
    graphic: []
}

interface RequestWeatherForecastsAction {
    type: 'REQUEST_WEATHER_FORECASTS'
}

interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS',
    forecasts: WeatherForecast
}

interface ErrorReceiveWeatherForecastsAction {
    type: 'ERROR_RECEIVE_WEATHER_FORECASTS'
}

type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction | ErrorReceiveWeatherForecastsAction;

export const actionCreators = {
    requestWeatherForecasts: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'REQUEST_WEATHER_FORECASTS' });

        let fetchTask = fetch(`/api/SampleData/WeatherForecasts`)
            .then(response => response.json() as Promise<WeatherForecast>)
            .then(data => {
                dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', forecasts: data });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: 'ERROR_RECEIVE_WEATHER_FORECASTS' });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    }
};


const unloadedState: WeatherForecastsState = {
    forecasts: EmptyForecasts,
    isLoading: true,
    isError: false
};

export const reducer: Reducer<WeatherForecastsState> = (state: WeatherForecastsState, action: KnownAction) => {
    switch (action.type) {
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                forecasts: state.forecasts,
                isLoading: true,
                isError: false
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            return {
                forecasts: action.forecasts,
                isLoading: false,
                isError: false
            };
        case 'ERROR_RECEIVE_WEATHER_FORECASTS':
            return {
                forecasts: state.forecasts,
                isLoading: false,
                isError: true
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
