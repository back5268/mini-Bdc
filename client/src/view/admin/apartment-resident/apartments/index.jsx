import { deleteApartmentApi, getListApartmentApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Apartment = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListApartmentApi, params, 'apartments');
  const navigate = useNavigate();

  const columns = [
    { label: 'Tên căn hộ ', field: 'name' },
    { label: 'Mã căn hộ', field: 'code' },
    { label: 'Diện tích', field: 'area' },
    { label: 'Tầng', field: 'floor' },
    { label: 'Chủ sở hữu', body: (e) => e.owner?.fullName || '' },
    { label: 'Người tạo', body: (e) => e.by?.fullName || '' },
    { label: 'Người cập nhật', body: (e) => e.updateBy?.fullName || '' },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];
  return (
    <div>
      <FormList title="Danh sách căn hộ">
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
          <Inputz
            value={filter.keySearch}
            onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
            label="Tìm kiếm theo tên căn hộ"
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
          baseActions={['create', 'detail', 'update', 'delete']}
          actionsInfo={{ deleteApi: deleteApartmentApi }}
          // statusInfo={{ changeStatusApi: updateApartmentApi }}
          headerInfo={{
            onCreate: () => {
              navigate('/apartments/create');
            }
          }}
        />
      </FormList>
    </div>
  );
};

export default Apartment;
