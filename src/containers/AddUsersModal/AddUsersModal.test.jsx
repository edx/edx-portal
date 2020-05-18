import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';

import AddUsersModel from './index';

const mockStore = configureMockStore([thunk]);

const modelTitle = 'AABBCC';
const data = {};

const UserSubscriptionModalWrapper = props => (
  <MemoryRouter>
    <Provider store={props.store}>
      <AddUsersModel
        title={modelTitle}
        onClose={() => {}}
        onSuccess={() => {}}
        {...props}
      />
    </Provider>
  </MemoryRouter>
);

UserSubscriptionModalWrapper.defaultProps = {
  store: mockStore({}),
};

UserSubscriptionModalWrapper.propTypes = {
  store: PropTypes.shape({}),
};

describe('UserSubscriptionModalWrapper', () => {
  let spy;

  afterEach(() => {
    if (spy) {
      spy.mockRestore();
    }
  });

  it('renders user subscription modal', () => {
    const wrapper = mount(<UserSubscriptionModalWrapper data={data} />);
    expect(wrapper.find('.modal-title span').text()).toEqual(modelTitle);
    expect(wrapper.find('.modal-title small').text()).toEqual('Add Subscriptions');

    expect(wrapper.find('.modal-body form h3').text()).toEqual('User Emails');
    wrapper.find('.modal-footer .subscribe-users-save-btn .btn-primary').hostNodes().simulate('click');

    expect(wrapper.find('.alert.alert-danger.show span.title').text()).toEqual('Unable to subscribe users');
  });
});