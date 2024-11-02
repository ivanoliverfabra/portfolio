import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(e: Error): ErrorBoundaryState {
    return { hasError: true, error: e };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Error captured in Error Boundary:", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <h1>{this.state.error?.message || "Something went wrong"}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
