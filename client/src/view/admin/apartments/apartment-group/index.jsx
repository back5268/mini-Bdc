import { deleteApartmentGroupApi, getListApartmentGroupApi, updateApartmentGroupApi } from '@api';
import { DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Chipz, Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useDataState } from '@store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApartmentGroup = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListApartmentGroupApi, params, 'apartment-groups');
  const { apartments } = useDataState();
  const navigate = useNavigate();

  const columns = [
    { label: 'Tên nhóm căn hộ', field: 'name' },
    { label: 'Mô tả', field: 'description' },
    {
      label: 'Căn hộ',
      className: 'max-w-96',
      body: (e) => {
        return (
          <div className="flex flex-wrap gap-2 w-full">
            {e.apartments?.map((apartment, index) => {
              const label = apartments.find((u) => u._id === apartment)?.name;
              return <Chipz key={index} value={label} className="text-center" />;
            })}
          </div>
        );
      }
    },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];
  return (
    <div>
      <FormList title="Danh sách nhóm căn hộ">
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12 md:w-full">
          <Inputz
            value={filter.keySearch}
            onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
            label="Tìm kiếm theo tên nhóm căn hộ"
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
          baseActions={['create', 'detail', 'delete', 'update']}
          actionsInfo={{ onViewDetail: (item) => navigate(`/apartment-groups/detail/${item._id}`), deleteApi: deleteApartmentGroupApi }}
          statusInfo={{ changeStatusApi: updateApartmentGroupApi }}
          headerInfo={{
            onCreate: () => {
              navigate('/apartment-groups/create');
            }
          }}
        />
      </FormList>
    </div>
  );
};

export default ApartmentGroup;
