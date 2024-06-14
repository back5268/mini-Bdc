import { addDepartmentApi, updateDepartmentApi } from '@api';
import { FormDetail } from '@components/base';
import { DropdownForm, InputForm } from '@components/core';
import Editorz from '@components/core/Editorz';
import { UploadFiles } from '@components/shared';
import { optionStatus, optionType } from '@constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { OptionValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  apartment: '',
  subject: '',
  type: '',
  content: '',
  status: ''
};

const DetailOption = (props) => {
  const { open, setOpen, setParams, data, apartments } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(OptionValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item.files) setFiles(item.files);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    if (files?.length > 0) {
      if (JSON.stringify(files) !== JSON.stringify(item?.files)) {
        const newFiles = [];
        const formData = [];
        files.forEach((f) => {
          if (item?.files.some((i) => JSON.stringify(i) === JSON.stringify(f))) newFiles.push(f);
          else formData.push(f);
        });
        if (newFiles.length > 0) newData.files = newFiles;
        if (formData.length > 0) newData.formData = { files: formData };
      }
    } else if (item?.files?.length > 0) newData.files = [];
    else return newData;
  };

  return (
    <FormDetail
      title="ý kiến"
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
    >
      <div className="flex flex-wrap w-full">
        <DropdownForm id="type" label="Danh mục (*)" options={optionType} errors={errors} watch={watch} setValue={setValue} />
        <DropdownForm
          id="apartment"
          label="Căn hộ (*)"
          options={apartments}
          optionLabel="name"
          optionValue="_id"
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <InputForm id="subject" label="Tiêu đề (*)" errors={errors} register={register} />
        <Editorz id="content" label="Nội dung (*)" errors={errors} data={watch('content')} setData={(e) => setValue('content', e)} />
        <UploadFiles label="File đính kèm" files={files} setFiles={setFiles} />
        {isUpdate && (
          <DropdownForm
            id="status"
            disabled
            label="Trạng thái (*)"
            options={optionStatus}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}
      </div>
    </FormDetail>
  );
};

export default DetailOption;
