import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete = (currentUserId === '1' && replies.length === 0 && !timePassed) || (currentUserId === comment.userId && replies.length === 0 && !timePassed); // el currentUserID === 1 quiere decir el vendedor
  const canReply = currentUserId === '1' && replies.length === 0 && !timePassed; // el currentUserID === 1 quiere decir el vendedor
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <img
          src=""
          alt="User profile picture"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="text-lg font-medium">{comment.username}</div>
          <div className="text-sm text-gray-500">{createdAt}</div>
        </div>
        {!isEditing && <div className="mt-2 text-gray-700">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Editar"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}

        <div className="mt-2 flex space-x-4">
          {canReply && (
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </button>
          )}
          {canDelete && (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteComment(comment.id)}
            >
              Eliminar
            </button>
          )}
        </div>

        {isReplying && (
          <CommentForm
            submitLabel="Responder"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}

        {replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;