import { deleteApartmentApi, getListApartmentApi } from '@api';
import { DataTable, FormList, TimeBody, DataFilter, Body, NumberBody } from '@components/base';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { apartmentStatus } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Apartments = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListApartmentApi, params, 'apartments');
  const navigate = useNavigate();

  const columns = [
    { label: 'Tên căn hộ ', field: 'name' },
    { label: 'Mã căn hộ', field: 'code' },
    { label: 'Diện tích (m2)', body: (e) => NumberBody(e.area) },
    { label: 'Tầng', field: 'floor' },
    { label: 'Chủ hộ', body: (e) => e.owner?.fullName },
    { label: 'Số người', field: 'numberResident' },
    { label: 'Số phương tiện', field: 'numberVehicle' },
    { label: 'Trạng thái căn hộ', body: (e) => Body(apartmentStatus, e.status) },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) }
  ];

  return (
    <div>
      <FormList title="Danh sách căn hộ">
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
          <Inputz
            value={filter.keySearch}
            onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
            label="Tìm kiếm theo tên, mã căn hộ"
          />
          <Dropdownz
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e })}
            options={apartmentStatus}
            label="Trạng thái"
          />
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
          actionsInfo={{ onViewDetail: (item) => navigate(`/apartments/detail/${item._id}`), deleteApi: deleteApartmentApi }}
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

export default Apartments;
