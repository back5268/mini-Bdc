import { deleteResidentApi, getListResidentApi, getListResidentInfoApi, updateResidentApi } from '@api';
import { DataTable, FormList, TimeBody, DataFilter, Body } from '@components/base';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { genders, statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useDataState } from '@store';
import { useNavigate } from 'react-router-dom';

const Resindents = ({ apartment }) => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListResidentApi, { apartment, ...params }, 'residents');
  const { apartments, setResidents } = useDataState();
  const navigate = useNavigate();

  const columns = [
    { label: 'Căn hộ', body: (e) => Body(apartments, e.apartment?._id, '_id', 'name') },
    { label: 'Họ tên', field: 'fullName' },
    { label: 'Email', field: 'email' },
    { label: 'Số điện thoại', field: 'phone' },
    { label: 'Giới tính', body: (e) => Body(genders, e.gender) },
    { label: 'Ngày sinh', body: (e) => TimeBody(e.birthday, 'date') },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) }
  ];

  const onSuccess = async () => {
    const response = await getListResidentInfoApi();
    if (response) {
      setResidents(response);
    }
  };

  return (
    <FormList title={apartment ? "" : "Danh sách cư dân"}>
      {!apartment && (
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="!w-full">
          <Inputz
            value={filter.keySearch}
            onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
            label="Tìm kiếm theo tên cư dân"
          />
          <Inputz
            value={filter.email}
            onChange={(e) => setFilter({ ...filter, email: e.target.value })}
            label="Tìm kiếm theo email, số điện thoại"
          />
          <Dropdownz
            value={filter.apartment}
            onChange={(e) => setFilter({ ...filter, apartment: e })}
            options={apartments}
            optionLabel="name"
            optionValue="_id"
            label="Căn hộ"
          />
          <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={statuses} label="Trạng thái" />
        </DataFilter>
      )}
      <Hrz />
      <DataTable
        hideParams={Boolean(apartment)}
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        statusInfo={{ changeStatusApi: updateResidentApi }}
        actionsInfo={{ onViewDetail: (item) => navigate(`/residents/detail/${item._id}`), deleteApi: deleteResidentApi }}
        headerInfo={{
          onCreate: () => {
            navigate('/residents/create');
          }
        }}
        onSuccess={onSuccess}
      />
    </FormList>
  );
};

export default Resindents;
