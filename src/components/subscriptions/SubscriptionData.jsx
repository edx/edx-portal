import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import StatusAlert from '../StatusAlert';
import { useSubscriptionData } from './data/hooks';

export const SubscriptionContext = createContext({});

export default function SubscriptionData({ children, enterpriseId }) {
  const {
    subscriptions,
    errors,
    setErrors,
    forceRefresh,
  } = useSubscriptionData({ enterpriseId });
  const hasSubscription = subscriptions?.length > 0;

  const context = useMemo(() => ({
    data: subscriptions,
    errors,
    setErrors,
    forceRefresh,
  }), [subscriptions, errors]);

  if (subscriptions) {
    return (
      <SubscriptionContext.Provider value={context}>
        {children}
      </SubscriptionContext.Provider>
    );
  }

  return (
    <StatusAlert
      className="mt-3"
      alertType={!hasSubscription ? 'danger' : ''}
      message={!hasSubscription ? `Your organization does not have any active subscriptions to manage.
      If you believe you are seeing this message in error,
      please reach out to the edX Customer Success team at customersuccess@edx.org.` : ''}
    />
  );
}

SubscriptionData.propTypes = {
  children: PropTypes.node.isRequired,
  enterpriseId: PropTypes.string.isRequired,
};
