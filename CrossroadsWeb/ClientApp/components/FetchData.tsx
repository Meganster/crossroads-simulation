import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Brush } from 'recharts';
import { ApplicationState } from '../store';
import * as WeatherForecastsState from '../store/WeatherForecasts';


type WeatherForecastProps =
    WeatherForecastsState.WeatherForecastsState        // ... state we've requested from the Redux store
    & typeof WeatherForecastsState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters   

class FetchData extends React.Component<WeatherForecastProps, {}> {
    componentDidMount() {
        this.props.requestWeatherForecasts();
    }

    public render() {
        return <div>
            <h1>Crossroads simulation</h1>
            {this.props.isError ? this.renderError() : (<div></div>)}
            {this.props.isLoading ? this.renderLoading() : this.renderForecastsTable()}
        </div>;
    }

    private renderLoading() {
        return (
            <div style={{ marginTop: "10px" }}>
                <span className="label warning">Simulation Loading</span>
            </div>
        );
    }

    private renderError() {
        return (
            <div style={{ marginTop: "10px" }}>
                <span className="label error">Simulation Error</span>
            </div>
        );
    }

    private renderForecastsTable() {
        return (
            <div>
                <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <span className="label success">Simulation Success</span>
                </div>
                <table className='table'>
                    <tbody>
                        <tr>Time of simulation: {this.props.forecasts.simulationTime}</tr>
                        <tr>Count of events: {this.props.forecasts.events}</tr>
                        <tr>carsFromAAndOut: {this.props.forecasts.carsFromAAndOut}</tr>
                        <tr>carsFromBAndOut: {this.props.forecasts.carsFromBAndOut}</tr>
                    </tbody>
                </table>
                <LineChart width={800} height={600} data={this.props.forecasts.graphic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Brush />
                    <Line type="monotone" dataKey="queueGraphicA" stroke="#8884d8" />
                    <Line type="monotone" dataKey="queueGraphicB" stroke="#82ca9d" />
                </LineChart>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
    WeatherForecastsState.actionCreators                 // Selects which action creators are merged into the component's props
)(FetchData) as typeof FetchData;
