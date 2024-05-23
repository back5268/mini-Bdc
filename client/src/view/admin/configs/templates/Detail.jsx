import { TemplateValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addTemplateApi, updateTemplateApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { DropdownForm, InputForm, TextAreaz } from '@components/core';
import { templateType } from '@constant';
import Editorz from '@components/core/Editorz';

const defaultValues = {
  subject: '',
  code: '',
  content: '',
  description: '',
  type: '',
};

const DetailTemplate = (props) => {
  const { open, setOpen, setParams, data } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(TemplateValidation),
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

  return (
    <FormDetail
      title="mẫu thông báo"
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addTemplateApi}
      updateApi={updateTemplateApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="subject" label="Tên mẫu thông báo (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã mẫu thông báo (*)" errors={errors} register={register} />
        <DropdownForm id="type" label="Loại thông báo (*)" options={templateType} errors={errors} watch={watch} setValue={setValue} />
        <Editorz id="content" label="Nội dung (*)" errors={errors} data={watch('content')} setData={(e) => setValue('content', e)} />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailTemplate;
