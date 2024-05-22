import { useState } from 'react';
import { SendMessage } from './SendMessage';
import { multiFormatDateString } from '@utils';
import ReactPlayer from 'react-player';
import { Link } from '@components/uiCore';
import { useConfirmState, useToastState } from '@store';
import { deleteCommentApi } from '@api';

export const Comment = ({ userInfo, objectId, comment, setFocused, type, onWarning, setRender }) => {
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const [moreComment, setMoreComment] = useState(false);

  let fileType;
  if (comment?.file) {
    if (comment?.file.endsWith('.png') || comment?.file.endsWith('.jpg')) fileType = 'image';
    else if (comment?.file.endsWith('.mp4') || comment?.file.endsWith('.gif')) fileType = 'video';
  }

  const onDelete = async () => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn xóa bình luận này!',
      action: async () => {
        const response = await deleteCommentApi({ _id: comment?._id });
        if (response) {
          showToast({ title: 'Xóa bình luận thành công!', severity: 'success' });
          setRender((pre) => !pre);
        }
      }
    });
  };

  return (
    <div className="my-6">
      <div id={comment?._id} className="flex gap-4">
        <div className="h-10 w-10">
          <div
            className="h-10 w-10 rounded-full bg-black bg-cover"
            style={{ backgroundImage: `url('${comment?.by?.avatar || '/images/avatar.jpg'}')` }}
          ></div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-1 p-2 bg-primary-100 rounded-md w-full">
            <span className="font-semibold">{comment?.by?.name}</span>
            <span>{comment?.content}</span>
            {comment?.file && (
              <Link to={comment.file} target="_blank" className="h-[160px]">
                {fileType === 'image' ? (
                  <img src={comment.file} className="h-[160px] rounded-md" />
                ) : fileType === 'video' ? (
                  <ReactPlayer url={comment.file} controls height="300" />
                ) : (
                  <span>{comment.file}</span>
                )}
              </Link>
            )}
          </div>
          <div className="flex gap-3 text-xs mt-1 text-primary font-medium">
            <span>{multiFormatDateString(comment.createdAt)}</span>
            {comment?.comments?.length > 0 && !moreComment && (
              <span className='cursor-pointer' onClick={() => setMoreComment(true)}>Xem tất cả {comment.comments.length} phản hồi</span>
            )}
            {moreComment && (
              <span className="cursor-pointer" onClick={() => setMoreComment(false)}>
                Ẩn bớt
              </span>
            )}
            <span
              className="cursor-pointer"
              onClick={() => {
                if (!userInfo?._id) onWarning();
                else {
                  if (!comment?.parentId) {
                    setMoreComment(true);
                    setFocused(`send_${comment?._id}`);
                  } else setFocused(`send_${comment.parentId}`);
                }
              }}
            >
              Trả lời
            </span>
            {(comment?.by === userInfo?._id || userInfo?.type === 'admin') && (
              <span className="cursor-pointer " onClick={onDelete}>
                Xóa
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="ml-6">
        {moreComment && (
          <div className="ml-4 mt-6">
            {comment?.comments.map((comment, index) => (
              <Comment
                key={index}
                objectId={objectId}
                comment={comment}
                setFocused={setFocused}
                type={type}
                onWarning={onWarning}
                userInfo={userInfo}
                setRender={setRender}
              />
            ))}
            <SendMessage
              id={comment?._id}
              userInfo={userInfo}
              objectId={objectId}
              parentId={comment?._id}
              type={type}
              onWarning={onWarning}
              setRender={setRender}
            />
          </div>
        )}
      </div>
    </div>
  );
};
