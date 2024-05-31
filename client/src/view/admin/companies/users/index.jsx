import { deleteUserApi, getListUserApi, resetPasswordApi, updateUserApi } from '@api';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Buttonz, Dialogz, Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailUser from './Detail';
import { useConfirmState, useToastState, useUserState } from '@store';

const Users = () => {
  const { userInfo, setUserInfo } = useUserState();
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(null);
  const { isLoading, data } = useGetApi(getListUserApi, { ...params, type: 'user' }, 'users');

  const columns = [
    { label: 'Họ tên', field: 'fullName' },
    { label: 'Mã nhân viên', field: 'code' },
    { label: 'Tài khoản', field: 'username' },
    { label: 'Email', field: 'email' },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Lần đăng nhập cuối', body: (e) => TimeBody(e.lastLogin) }
  ];

  const onResetPassword = (item) => {
    showConfirm({
      title: `Bạn có chắc chắn muốn đổi mật khẩu tài khoản ${item.username}`,
      action: async () => {
        const response = await resetPasswordApi({ _id: item._id });
        if (response) {
          showToast({ title: 'Đổi mật khẩu thành công!', severity: 'success' });
          setPassword(response);
        }
      }
    });
  };

  const onSuccess = async (item) => {
    if (item._id === userInfo._id) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    }
  };

  return (
    <FormList title="Danh sách nhân viên">
      <Dialogz title="Decor Shop" open={Boolean(password)} setOpen={setPassword} className="w-[500px]">
        <div className="p-6 text-left">
          Đổi mật khẩu thành công, mật khẩu mới là <b>{password}</b>
        </div>
        <Hrz />
        <div className="flex gap-4 justify-end mt-4">
          <Buttonz label="Xác nhận" onClick={async () => setPassword(false)} />
        </div>
      </Dialogz>
      <DetailUser open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter}>
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, mã nhân viên"
        />
        <Inputz
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          label="Tìm kiếm theo email, tài khoản"
        />
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={statuses} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deleteUserApi,
          moreActions: [
            {
              icon: ArrowPathIcon,
              onClick: (item) => onResetPassword(item)
            }
          ]
        }}
        statusInfo={{ changeStatusApi: updateUserApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
        onSuccess={onSuccess}
      />
    </FormList>
  );
};

export default Users;
