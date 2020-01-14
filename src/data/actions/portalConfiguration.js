import NewRelicLoggingService from '@edx/frontend-logging/src/NewRelicLoggingService';
import {
  FETCH_PORTAL_CONFIGURATION_REQUEST,
  FETCH_PORTAL_CONFIGURATION_SUCCESS,
  FETCH_PORTAL_CONFIGURATION_FAILURE,
  CLEAR_PORTAL_CONFIGURATION,
} from '../constants/portalConfiguration';
import LmsApiService from '../services/LmsApiService';

const fetchPortalConfigurationRequest = () => ({
  type: FETCH_PORTAL_CONFIGURATION_REQUEST,
});

const fetchPortalConfigurationSuccess = data => ({
  type: FETCH_PORTAL_CONFIGURATION_SUCCESS,
  payload: { data },
});

const fetchPortalConfigurationFailure = error => ({
  type: FETCH_PORTAL_CONFIGURATION_FAILURE,
  payload: { error },
});

const clearPortalConfigurationEvent = () => ({ type: CLEAR_PORTAL_CONFIGURATION });

const fetchPortalConfiguration = slug => (
  (dispatch) => {
    dispatch(fetchPortalConfigurationRequest());
    return LmsApiService.fetchEnterpriseBySlug(slug)
      .then((response) => {
        dispatch(fetchPortalConfigurationSuccess(response.data));
      })
      .catch((error) => {
        NewRelicLoggingService.logAPIErrorResponse(error);
        dispatch(fetchPortalConfigurationFailure(error));
      });
  }
);

const clearPortalConfiguration = () => (
  (dispatch) => {
    dispatch(clearPortalConfigurationEvent());
  }
);

export {
  fetchPortalConfiguration,
  clearPortalConfiguration,
};
