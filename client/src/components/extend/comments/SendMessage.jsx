import { useCallback, useState } from 'react';
import { TiFolderOpen } from 'react-icons/ti';
import { MdSend } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import { IoMdClose } from 'react-icons/io';
import { addCommentApi } from '@api';

export const SendMessage = ({ id, userInfo, objectId, parentId, type, onWarning, setRender }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo?._id) return onWarning();
    const params = { type, parentId, objectId };
    if (message) params.content = message;
    if (file) params.formData = { file };
    if (params.content || params.formData) {
      const response = await addCommentApi(params);
      if (response) {
        setRender((pre) => !pre);
        setMessage('');
        setFile(null);
      }
    }
  };

  return (
    <div className="flex gap-4 mt-8">
      <div className="h-10 w-10">
        <div
          className="h-10 w-10 rounded-full bg-primary-100 bg-cover"
          style={{ backgroundImage: `url('${userInfo?.avatar || '/images/avatar.jpg'}')` }}
        ></div>
      </div>
      <form onSubmit={onSubmit} className="w-full relative">
        <input {...getInputProps()} className="cursor-pointer" />
        <input
          id={`send_${id}`}
          className="w-full py-2 block flex-auto rounded border border-solid border-neutral-300 bg-transparent 
          bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none 
          transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 
          focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 
          dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Viết bình luận ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-3 absolute top-3 right-3 text-primary">
          <div {...getRootProps()} className="cursor-pointer">
            <TiFolderOpen size={20} className="hover:text-primary-600" />
          </div>
          <button type="submit">
            <MdSend size={20} className="hover:text-primary-600" />
          </button>
        </div>
        {file && (
          <div className="p-4 bg-primary-100 rounded-md mt-2 flex justify-between items-center text-primary">
            <span className="font-medium">{file.name}</span>
            <button type="button" className="cursor-pointer" onClick={() => setFile(null)}>
              <IoMdClose size={20} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
