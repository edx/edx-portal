import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import NewRelicLoggingService from '@edx/frontend-logging/src/NewRelicLoggingService';
import ErrorBoundary from './index';

global.newrelic = {
  addPageAction: jest.fn(),
  noticeError: jest.fn(),
};

function Welcome() {
  return <h1>Hi!</h1>;
}

describe('<ErrorBoundary />', () => {
  it('renders childern correctly when no error', () => {
    const tree = renderer
      .create((
        <ErrorBoundary>
          <Welcome name="MA" />
        </ErrorBoundary>
      ))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('logs the error', () => {
    const welcomeError = new Error('Catch me if you can!');
    NewRelicLoggingService.logError = jest.fn();

    const wrapper = shallow((
      <ErrorBoundary>
        <Welcome />
      </ErrorBoundary>
    ));
    wrapper.find(Welcome).simulateError(welcomeError);
    expect(NewRelicLoggingService.logError).toHaveBeenCalledWith(new Error('Catch me if you can!'));
  });
});
