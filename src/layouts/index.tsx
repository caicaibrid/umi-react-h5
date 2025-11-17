import { CheckNetworkStatus, Loading } from '@/components/checkNetworkStatus';
import ConfirmModal from '@/components/confirmModal';
import { Outlet } from '@umijs/max';

export default function () {
  return (
    <>
      <CheckNetworkStatus />
      <Loading />
      <ConfirmModal />
      <Outlet />
    </>
  );
}
