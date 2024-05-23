import { useEffect, useState } from 'react';
import { SendMessage } from './SendMessage';
import { Comment } from './Comment';
import { useNavigate } from 'react-router-dom';
import { useConfirmState, useUserState } from '@store';

const Comments = ({ title, maxHeight, comments = [], type = 1, setRender, objectId }) => {
  const navigate = useNavigate();
  const { showConfirm } = useConfirmState();
  const { userInfo } = useUserState();
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (focused || focused === 0) {
      const input = document.getElementById(focused);
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        setFocused(null);
      }
    }
  }, [focused]);

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để có thể bình luận!',
      action: () => navigate('/auth/signin')
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center my-2">
        <h2 className="uppercase font-semibold">{title}</h2>
        <span
          onClick={() => {
            if (!userInfo?._id) onWarning();
            else setFocused('send_messageId');
          }}
          className='cursor-pointer text-primary font-medium'
        >
          Viết bình luận
        </span>
      </div>
      <div className={`card text-sm ${maxHeight ? `overflow-scroll` : ''}`} style={{ maxHeight }}>
        {comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              objectId={objectId}
              setFocused={setFocused}
              comment={comment}
              type={type}
              userInfo={userInfo}
              onWarning={onWarning}
              setRender={setRender}
            />
          );
        })}
        <div className="mt-4">
          <SendMessage id="messageId" objectId={objectId} type={type} userInfo={userInfo} onWarning={onWarning} setRender={setRender} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
