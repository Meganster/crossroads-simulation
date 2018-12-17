export class Provider {
    static displayName: string;
    constructor(props: any, context: any);
    componentWillReceiveProps(nextProps: any): void;
    forceUpdate(callback: any): void;
    getChildContext(): any;
    render(): any;
    setState(partialState: any, callback: any): void;
}
export namespace Provider {
    namespace childContextTypes {
        function store(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        function storeSubscription(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        namespace storeSubscription {
            function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        }
    }
    namespace propTypes {
        function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
        function store(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
}
export function connect(mapStateToProps: any, mapDispatchToProps: any, mergeProps: any, ...args: any[]): any;
export function connectAdvanced(selectorFactory: any, ...args: any[]): any;
