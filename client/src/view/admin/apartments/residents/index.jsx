import { deleteResidentApi, getListResidentApi, updateResidentApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import DetailResident from './Detail';

const Resindents = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListResidentApi, params, 'residents');

  const genderBody = (rowData) => {
    return <div>{rowData.gender === 1 ? 'Nam' : 'Nữ'}</div>;
  };

  const columns = [
    { label: 'Họ tên', field: 'fullName' },
    { label: 'Mã cư dân', field: 'code' },
    { label: 'Giới tính', field: 'gender', body: (e) => genderBody(e) },
    { label: 'Email', field: 'email' },
    { label: 'Ngày sinh', body: (e) => TimeBody(e.birthday, 'date') },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) }
  ];
  return (
    <FormList title="Danh sách cư dân">
      <DetailResident open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter}>
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên cư dân"
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
          deleteApi: deleteResidentApi
        }}
        statusInfo={{ changeStatusApi: updateResidentApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default Resindents;
