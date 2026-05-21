import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { logger } from 'utils/SecureLogger';
import ErrorScreen from '../screens/ErrorScreen/ErrorScreen';

interface ErrorHandlerProps {
  children: React.ReactNode;
}

const ErrorHandler = ({ children }: ErrorHandlerProps) => {
  const errorHandler = (error: unknown) => {
    try {
      logger.error('Error captured by ErrorHandler:', { error });
    } catch (e) {
      logger.error('Error in ErrorHandler errorHandler:', { e });
    }
  };

  function renderErrorScreen() {
    return <ErrorScreen />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={renderErrorScreen}
      onError={errorHandler}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorHandler;
