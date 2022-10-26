import * as React from 'react';
import { useEffect } from 'react';
// import { useDispatch, useSelector } from '../services/hooks';
// import CardOrder from '../components/card-order/card-order';
// import { WS_CONNECTION_FINISH, WS_CONNECTION_START_INIT } from '../services/actions/ws';
import profileordersStyles from './profile-orders.module.css';


export function ProfileOrdersPage() {
  // const { ordersUser } = useSelector(state => state.ws);
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: WS_CONNECTION_START_INIT});
    // return () => {
    //   dispatch({ type: WS_CONNECTION_FINISH });
    // }
  }, []);

  return (
    <ul className={profileordersStyles.list}>
      {/* {[...ordersUser].reverse().map(item => (
        <CardOrder key={item._id} card={item} />
      ))} */}
    </ul>
  );
}