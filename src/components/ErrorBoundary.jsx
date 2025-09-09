import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Podrías enviar a un servicio de logs
    console.error("ErrorBoundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <p style={{ padding: 16 }}>Ha ocurrido un error al mostrar esta sección.</p>;
    }
    return this.props.children;
  }
}
