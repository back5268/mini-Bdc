import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Buttonz, Hrz, Linkz } from '@components/core';

export const UploadFiles = (props) => {
  const { files = [], setFiles, label, max, isView, type, className = "" } = props;

  const removeFile = (item) => {
    setFiles(files.filter((f) => f !== item));
  };

  const onDrop = useCallback((acceptedFiles) => {
    let newFiles = [...acceptedFiles];
    if (max) newFiles = newFiles.splice(0, max);
    if (type)
      newFiles = newFiles.filter((file) => {
        return file.type.startsWith(type);
      });
    setFiles((pre) => [...pre, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={`p-2 w-full ${className}`}>
      <div className="card flex flex-col cursor-pointer">
        <div className={'flex justify-between items-center mb-2'}>
          {label && <label className="inline-block font-medium text-left">{label}</label>}
          {!isView && (
            <div className="flex gap-2">
              <Buttonz color="red" variant="outlined" className="p-2" onClick={() => setFiles([])}>
                <TrashIcon className="w-6" />
              </Buttonz>
              <div {...getRootProps()}>
                <Buttonz label="Chọn files" />
              </div>
            </div>
          )}
        </div>
        <Hrz />
        <input {...getInputProps()} className="cursor-pointer" />
        {files?.length > 0 ? (
          <div className="flex justify-center flex-col gap-4 text-left mt-4">
            {files.map((f, index) => (
              <div key={index} className="card flex items-center justify-between !p-2">
                <Linkz to={typeof f === 'string' ? f : ''} target="_blank" className="text-sm">
                  {f?.name || f}
                </Linkz>
                {!isView && (
                  <Buttonz color="red" variant="outlined" className="p-2" onClick={() => removeFile(f)}>
                    <TrashIcon className="w-6" />
                  </Buttonz>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div {...getRootProps()} className="text-center p-2 font-semibold mt-4">
            <span>{isView ? 'Không có file' : 'Kéo và thả file tại đây'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFiles;
