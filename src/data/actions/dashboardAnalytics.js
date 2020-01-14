import NewRelicLoggingService from '@edx/frontend-logging/src/NewRelicLoggingService';
import {
  FETCH_DASHBOARD_ANALYTICS_REQUEST,
  FETCH_DASHBOARD_ANALYTICS_SUCCESS,
  FETCH_DASHBOARD_ANALYTICS_FAILURE,
  CLEAR_DASHBOARD_ANALYTICS,
} from '../constants/dashboardAnalytics';
import EnterpriseDataApiService from '../services/EnterpriseDataApiService';

const emptyDashboardAnalytics = {
  active_learners: {
    past_month: 0,
    past_week: 0,
  },
  enrolled_learners: 0,
  number_of_users: 0,
  course_completions: 0,
};

const fetchDashboardAnalyticsRequest = () => ({ type: FETCH_DASHBOARD_ANALYTICS_REQUEST });
const fetchDashboardAnalyticsSuccess = data => ({
  type: FETCH_DASHBOARD_ANALYTICS_SUCCESS,
  payload: { data },
});
const fetchDashboardAnalyticsFailure = error => ({
  type: FETCH_DASHBOARD_ANALYTICS_FAILURE,
  payload: { error },
});

const fetchDashboardAnalytics = enterpriseId => (
  (dispatch) => {
    dispatch(fetchDashboardAnalyticsRequest());
    return EnterpriseDataApiService.fetchDashboardAnalytics(enterpriseId)
      .then((response) => {
        dispatch(fetchDashboardAnalyticsSuccess(response.data));
      })
      .catch((error) => {
        NewRelicLoggingService.logAPIErrorResponse(error);
        // This endpoint returns a 404 if no data exists,
        // so we convert it to an empty response here.
        if (error.response.status === 404) {
          dispatch(fetchDashboardAnalyticsSuccess(emptyDashboardAnalytics));
          return;
        }
        dispatch(fetchDashboardAnalyticsFailure(error));
      });
  }
);

const clearDashboardAnalytics = () => dispatch => (dispatch({
  type: CLEAR_DASHBOARD_ANALYTICS,
}));

export {
  clearDashboardAnalytics,
  fetchDashboardAnalytics,
};
