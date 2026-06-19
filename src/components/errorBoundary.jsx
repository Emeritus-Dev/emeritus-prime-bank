import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("UI crashed during rendering:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h1>Something went wrong.</h1>
                    <p>Reload the page to restart the demo.</p>
                    <button className="btn-primary" onClick={() => window.location.reload()}>
                        Reload
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}