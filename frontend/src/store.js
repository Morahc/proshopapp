import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewReducer, topProductReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import { deleteUserReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducer'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducer'

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReview: productReviewReducer,
  topProduct: topProductReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: deleteUserReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems')) 
: [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo')) 
: null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress')) 
: {};

const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage, 
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store