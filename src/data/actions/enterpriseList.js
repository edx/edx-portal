import { NewRelicLoggingService } from '@edx/frontend-logging';
import LmsApiService from '../services/LmsApiService';
import { getPageOptionsFromUrl } from '../../utils';
import {
  PAGINATION_REQUEST,
  PAGINATION_SUCCESS,
  PAGINATION_FAILURE,
} from '../constants/table';

const tableId = 'enterprise-list';

const searchEnterpriseListRequest = options => ({
  type: PAGINATION_REQUEST,
  payload: {
    tableId,
    options,
  },
});
const searchEnterpriseListSuccess = data => ({
  type: PAGINATION_SUCCESS,
  payload: {
    tableId,
    data,
  },
});
const searchEnterpriseListFailure = error => ({
  type: PAGINATION_FAILURE,
  payload: {
    tableId,
    error,
  },
});

// This is doing nearly the same thing the table actions do however this
// is necessary so we can pass in the `search` parameter. We leverage the same
// events as the table actions, so the same `table` reducers will be called.
const searchEnterpriseList = searchOptions => (
  (dispatch) => {
    const options = {
      ...getPageOptionsFromUrl(),
      ...searchOptions,
    };
    dispatch(searchEnterpriseListRequest(options));
    return LmsApiService.fetchEnterpriseList(options)
      .then((response) => {
        dispatch(searchEnterpriseListSuccess(response.data));
      })
      .catch((error) => {
        NewRelicLoggingService.logAPIErrorResponse(error);
        dispatch(searchEnterpriseListFailure(error));
      });
  }
);

export default searchEnterpriseList;
