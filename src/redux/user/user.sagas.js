import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase.util";

import { googleSignInSuccess, googleSignInFailure } from "./user.actions";

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapShop = yield userRef.get();
    yield put(
      googleSignInSuccess({ id: userSnapShop.id, ...userSnapShop.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSaga() {
  yield all([call(onGoogleSignInStart)]);
}
