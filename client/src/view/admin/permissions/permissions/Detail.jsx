import { PermissionValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addPermissionApi, detailPermissionApi, getListToolApi, updatePermissionApi } from '@api';
import { DataTable, FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { Hrz, InputForm, MultiSelectz, Tabz, TextAreaz } from '@components/core';
import { useParams } from 'react-router-dom';
import { useGetApi } from '@lib/react-query';
import Tool from './Tool';
import { useDataState } from '@store';

const defaultValues = {
  name: '',
  description: ''
};

const Permissions = (props) => {
  const { toolData, tools, setTools } = props;

  return toolData?.map((tool, index) => {
    return (
      <div key={index}>
        <Tool value={tools} setValue={setTools} tool={tool} />
        <Hrz />
      </div>
    );
  });
};

const Users = (props) => {
  const { userData = [], users = [], setUsers = () => {} } = props;
  const columns = [
    { label: 'Tên nhân sự', field: 'fullName' },
    { label: 'Mã nhân sự', field: 'code' },
    { label: 'Tài khoản', field: 'username' },
    { label: 'Email', field: 'email' }
  ];

  return (
    <div className="flex flex-col">
      <MultiSelectz
        label="Chọn nhân sự (*)"
        value={users}
        onChange={setUsers}
        options={userData.map((u) => ({ key: u._id, label: `${u.fullName} - ${u.code}` }))}
        className="my-2 lg:w-6/12 mt-2"
      />
      <DataTable
        total={users.length}
        data={userData.filter((u) => users.includes(u._id))}
        columns={columns}
        baseActions={['delete']}
        hideParams={true}
        actionsInfo={{
          onDelete: (item) => {
            setUsers((pre) => pre.filter((v) => v !== item._id && v !== 'all'));
          }
        }}
      />
    </div>
  );
};

const DetailPermission = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailPermissionApi, { _id }, 'permission', isUpdate);
  const { data: toolData } = useGetApi(getListToolApi, { status: 1 }, 'tools');
  const { users: userData } = useDataState();
  const [activeTab, setActiveTab] = useState('permissions');
  const [tools, setTools] = useState([]);
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(PermissionValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.users) setUsers(item.users);
      if (item.tools) {
        const newTool = [];
        item.tools.forEach((tool) => {
          tool?.actions.forEach((action) => {
            newTool.push(`${tool.route}---${action}`);
          });
        });
        setTools(newTool);
      }
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (users?.length > 0) newData.users = users.filter((u) => u !== 'all');
    if (tools?.length > 0) {
      const newTools = [];
      tools.forEach((tool) => {
        const arr = tool.split('---');
        const index = newTools.findIndex((n) => n.route === arr[0]);
        if (index >= 0) newTools[index].actions.push(arr[1]);
        else newTools.push({ route: arr[0], actions: [arr[1]] });
      });
      newData.tools = newTools;
    }
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  const data = [
    { label: 'Phân quyền', value: 'permissions', children: () => Permissions({ toolData, tools, setTools }) },
    { label: 'Nhân sự', value: 'users', children: () => Users({ userData, users, setUsers }) }
  ];

  return (
    <FormDetail
      type="nomal"
      title="nhóm quyền"
      isUpdate={isUpdate}
      createApi={addPermissionApi}
      updateApi={updatePermissionApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên nhóm quyền (*)" errors={errors} register={register} />
        <TextAreaz
          id="description"
          label="Mô tả"
          value={watch('description')}
          setValue={(e) => setValue('description', e)}
          className="w-full lg:w-6/12"
        />
        <div className="flex flex-col gap-2 card m-2 w-full">
          <Tabz data={data} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailPermission;
