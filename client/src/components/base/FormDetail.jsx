import { Buttonz, Cardz, Dialogz, Hrz } from '@components/core';
import { Loading } from '@components/shared';
import { usePostApi } from '@lib/react-query';
import { useToastState } from '@store';
import { useNavigate } from 'react-router-dom';

const Wrapper = ({ isModal, children, title, open, setOpen }) => {
  if (isModal)
    return (
      <Dialogz className="w-[1200px]" title={title} open={open} setOpen={setOpen}>
        {children}
      </Dialogz>
    );
  else
    return (
      <Cardz className="p-4">
        <h2 className="font-semibold uppercase leading-normal mb-2">{title}</h2>
        <Hrz />
        {children}
      </Cardz>
    );
};

const FormDetail = (props) => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const {
    type = 'modal',
    title,
    children,
    open,
    setOpen = () => {},
    isUpdate,
    createApi,
    updateApi,
    handleData = () => {},
    handleSubmit = () => {},
    setParams = () => {},
    onSuccess = () => {}
  } = props;
  const isModal = type === 'modal';
  const { mutateAsync, isPending } = usePostApi(isUpdate ? updateApi : createApi);
  const newTitle = `${isUpdate ? (updateApi ? 'Cập nhật' : 'Chi tiết') : 'Thêm mới'} ${title && String(title).toLocaleLowerCase()}`;
  const onSubmit = async (e) => {
    const data = handleData(e);
    if (typeof data === 'string') {
      showToast({ title: data, severity: 'error' });
      return;
    }
    const response = await mutateAsync(data);
    if (response) {
      onSuccess();
      showToast({ title: `${newTitle} thành công!`, severity: 'success' });
      if (isModal) {
        setOpen(false);
        setParams((pre) => ({ ...pre, render: !pre.render }));
      } else navigate(-1);
    }
  };
  return (
    <Wrapper title={newTitle} isModal={isModal} open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`w-full ${isModal ? 'max-h-[500px] overflow-scroll' : ''}`}>
          <div className="relative w-full mt-4">
            {isPending && <Loading />}
            {children}
          </div>
        </div>
        <Hrz className="my-4" />
        <div className="flex gap-4 justify-end">
          <Buttonz
            variant="outlined"
            color="red"
            label={isModal ? 'Hủy' : 'Trở lại'}
            onClick={() => {
              if (isModal) setOpen(false);
              else navigate(-1);
            }}
          />
          {((isUpdate && updateApi) || (!isUpdate && createApi)) && <Buttonz loading={isPending} type="submit" label="Xác nhận" />}
        </div>
      </form>
    </Wrapper>
  );
};

export default FormDetail;
