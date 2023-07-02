export const getComments = async () => {
  return [];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "3",
    username: "Fulano",
    createdAt: new Date().toISOString(),
  };
};

export const deleteComment = async () => {
  return {};
};