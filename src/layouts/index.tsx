import { CheckNetworkStatus, Loading } from '@/components/checkNetworkStatus';
import { Outlet } from '@umijs/max';

export default function () {
  return (
    <>
      <CheckNetworkStatus />
      <Loading />
      <Outlet />
    </>
  );
}
