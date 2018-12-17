import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Simsharp report project</h1>
            <p>This project will allow you to view the simulation result in the Simsharp program</p>
        </div>;
    }
}
