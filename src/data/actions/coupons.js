import NewRelicLoggingService from '@edx/frontend-logging/src/NewRelicLoggingService';
import {
  COUPONS_REQUEST,
  COUPONS_SUCCESS,
  COUPONS_FAILURE,
  CLEAR_COUPONS,
  COUPON_REQUEST,
  COUPON_SUCCESS,
  COUPON_FAILURE,
} from '../constants/coupons';

// TODO handle pagination using updateUrl
// import { updateUrl } from '../../utils';

import EcommerceApiService from '../services/EcommerceApiService';

const fetchCouponOrdersRequest = () => ({
  type: COUPONS_REQUEST,
});

const fetchCouponOrderRequest = () => ({
  type: COUPON_REQUEST,
});

const fetchCouponOrdersSuccess = data => ({
  type: COUPONS_SUCCESS,
  payload: {
    data,
  },
});

const fetchCouponOrderSuccess = data => ({
  type: COUPON_SUCCESS,
  payload: {
    data,
  },
});

const fetchCouponOrdersFailure = error => ({
  type: COUPONS_FAILURE,
  payload: {
    error,
  },
});

const fetchCouponOrderFailure = error => ({
  type: COUPON_FAILURE,
  payload: {
    error,
  },
});

const clearCouponOrdersEvent = () => ({ type: CLEAR_COUPONS });

const fetchCouponOrders = options => (
  (dispatch) => {
    dispatch(fetchCouponOrdersRequest(options));
    return EcommerceApiService.fetchCouponOrders(options)
      .then((response) => {
        dispatch(fetchCouponOrdersSuccess(response.data));
      })
      .catch((error) => {
        NewRelicLoggingService.logAPIErrorResponse(error);
        // This endpoint returns a 404 if no data exists,
        // so we convert it to an empty response here.
        if (error.response.status === 404) {
          dispatch(fetchCouponOrdersSuccess({ results: [] }));
          return;
        }
        dispatch(fetchCouponOrdersFailure(error));
      });
  }
);

const fetchCouponOrder = couponId => (
  (dispatch) => {
    dispatch(fetchCouponOrderRequest());
    return EcommerceApiService.fetchCouponOrders({ coupon_id: couponId })
      .then((response) => {
        dispatch(fetchCouponOrderSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchCouponOrderFailure(error));
        NewRelicLoggingService.logAPIErrorResponse(error);
      });
  }
);

const clearCouponOrders = () => (
  (dispatch) => {
    dispatch(clearCouponOrdersEvent());
  }
);

export {
  fetchCouponOrders,
  fetchCouponOrder,
  clearCouponOrders,
};
