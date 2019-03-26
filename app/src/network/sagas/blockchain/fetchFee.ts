import { call, put, select, take } from 'redux-saga/effects';
import { FETCH_FEE, setFee } from '../../actions/blockchain/fees';
import fetchFee from '../../utils/fetchFee';

export default function* fetchFeeSaga() {
    const fetchFeeAction = yield take(FETCH_FEE);

    const {
        network,
        platform,
    } = fetchFeeAction.payload;

    const fee = yield call(fetchFee, platform, network);

    yield put(setFee(
        platform,
        network,
        fee.safeLow.toString(),
        fee.average.toString(),
        fee.fast.toString(),
    ));
}
