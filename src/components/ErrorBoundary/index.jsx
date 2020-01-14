import React from 'react';
import PropTypes from 'prop-types';

import NewRelicLoggingService from '@edx/frontend-logging/src/NewRelicLoggingService';

class ErrorBoundary extends React.Component {
  componentDidCatch(error) {
    NewRelicLoggingService.logError(error);
  }

  render() {
    return this.props.children;
  }
}

export const withErrorBoundary = WrappedComponent => props => (
  <ErrorBoundary>
    <WrappedComponent {...props} />
  </ErrorBoundary>
);

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
