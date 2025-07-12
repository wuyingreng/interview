import { Component, ErrorInfo, PropsWithChildren } from "react";

type ErrorBoundaryProps = PropsWithChildren<{}>;
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null
}
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // 更新state使下一次渲染能够显示降低的UI。就是自动捕获错误，自动更改state
  static getDrivedStateFromError(error: Error) {
    // static属性没有没有this的感觉
    return {
      hasError: true, error
    }
  }
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo.componentStack);
    // 上报日志
  }
  render() {
    const { hasError, error } = this.state;
    if (hasError && error) {
      return <div>{error.message}</div>
    }
    return this.props.children;
  }
}