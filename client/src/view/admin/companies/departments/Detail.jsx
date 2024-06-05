import { addDepartmentApi, getListDepartmentInfoApi, updateDepartmentApi } from '@api';
import { FormDetail } from '@components/base';
import { InputForm, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { DepartmentValidation } from '@lib/validation';
import { useDataState } from '@store';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  name: '',
  code: '',
  description: ''
};

const DetailDepartment = (props) => {
  const { open, setOpen, setParams, data } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};
  const { setDepartments } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(DepartmentValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  const onSuccess = async () => {
    const departments = await getListDepartmentInfoApi();
    if (departments) setDepartments(departments);
  };

  return (
    <FormDetail
      title="phòng ban"
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addDepartmentApi}
      updateApi={updateDepartmentApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
      onSuccess={onSuccess}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên phòng ban (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã phòng ban (*)" errors={errors} register={register} />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailDepartment;
