import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => { 
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <div>
      <form className = "flex mb-4" onSubmit={onSubmit}>
        <textarea
          className="w-3/4 resize-none border rounded-l-lg p-2 w-full h-12"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          disabled={isTextareaDisabled}
          className="w-1/4 bg-[#ff7a00] text-white font-bold py-2 px-4 rounded-r-lg disabled:bg-gray-400 disabled:cursor-not-allowed h-12 focus:outline-none hover:bg-yellow-600"> 
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded ml-2"
            onClick={handleCancel}
          >
          Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
