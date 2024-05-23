import { NewsValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addNewsApi, updateNewsApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { InputForm } from '@components/core';
import Editorz from '@components/core/Editorz';

const defaultValues = {
  title: '',
  content: '',
  time: 0,
  hashtag: ''
};

const DetailNews = (props) => {
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
    resolver: yupResolver(NewsValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item?.hashtag && Array.isArray(item.hashtag)) item.hashtag = item?.hashtag?.join('; ');
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const hashtag = data.hashtag?.split(';') || [];
    const newData = { ...data, hashtag };
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
      createApi={addNewsApi}
      updateApi={updateNewsApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="title" label="Tiêu đề (*)" errors={errors} register={register} />
        <InputForm id="time" label="Thời gian đọc (phút) (*)" type="number" errors={errors} register={register} />
        <InputForm id="hashtag" label="Hashtag" errors={errors} register={register} />
        <Editorz id="content" label="Nội dung (*)" errors={errors} data={watch('content')} setData={(e) => setValue('content', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailNews;
