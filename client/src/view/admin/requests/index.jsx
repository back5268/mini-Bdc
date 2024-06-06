import { deleteRequestApi, getListRequestApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Request = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListRequestApi, params, 'requests');
  const navigate = useNavigate();
  
  const statuses = [
    { id: 1, name: 'BQL đã tiếp nhận' },
    { id: 2, name: 'BQL đang xử lý' },
    { id: 3, name: 'Chờ cư dân phản hồi' },
    { id: 4, name: 'Hoàn thành' },
    { id: 5, name: 'Hủy' }
  ];
  const statusBody = (rowData) => {
    return <div>{statuses.find((s) => s.id === rowData.status)?.name}</div>;
  };
  const columns = [
    { label: 'Tên yêu cầu ', field: 'name' },
    { label: 'Mã yêu cầu', field: 'code' },
    { label: 'Mô tả', field: 'description' },
    { label: 'Trạng thái xử lí', body: (e) => statusBody(e) },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];
  return (
    <div>
      <FormList title="Danh sách ý kiến">
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
          <Inputz
            value={filter.keySearch}
            onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
            label="Tìm kiếm theo tên yêu cầu"
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
          actionsInfo={{ onViewDetail: (item) => navigate(`/requests/detail/${item._id}`), deleteApi: deleteRequestApi }}
          headerInfo={{
            onCreate: () => {
              navigate('/requests/create');
            }
          }}
        />
      </FormList>
    </div>
  );
};

export default Request;
