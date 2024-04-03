import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.hasError !== this.state.hasError) {
            this.setState({}); // Trigger re-render
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>Nesprávně zadané cvičení!</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
