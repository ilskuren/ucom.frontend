export const UPVOTE_STATUS = 'upvote';
export const DOWNVOTE_STATUS = 'downvote';
export const NOVOTE_STATUS = 'no_vote';

export const POST_TYPE_POST_ID = 10;
export const POST_TYPE_REPOST_ID = 11;

export const POST_TYPES = [{
  id: 1,
  description: 'Story',
}];

export const getPostUrl = (postId) => {
  if (!postId) {
    return null;
  }

  return `/posts/${postId}`;
};

export const getPostEditUrl = (postId) => {
  if (!postId) {
    return null;
  }

  return `/posts/${postId}/edit`;
};

export const getPinnedPostUrl = (post) => {
  if (!post || !post.id || !post.entityIdFor || !post.entityNameFor) {
    return null;
  }

  if (post.entityNameFor.trim() === 'org') {
    return `/communities/${post.entityIdFor}/${post.id}`;
  }

  return `/user/${post.entityIdFor}/${post.id}`;
};

export const getRulesByPostTypeId = (postTypeId) => {
  switch (postTypeId) {
    case 2:
      return {
        title: 'required',
        leading_text: 'required',
        description: 'required',
        action_button_title: 'required',
        action_button_url: 'required|url',
        action_duration_in_days: 'required|numeric',
        main_image_filename: 'required',
      };
    default:
      return {
        title: 'required',
        leading_text: 'required',
        description: 'required',
      };
  }
};

export const getPostTypeById = (postTypeId) => {
  switch (postTypeId) {
    case POST_TYPE_POST_ID:
      return 'post';
    case 2:
      return 'offer';
    case 1:
      return 'story';
    case POST_TYPE_REPOST_ID:
      return 'repost';
    default:
      return null;
  }
};

export const postIsEditable = (createdAt) => {
  if (!createdAt) {
    return false;
  }

  return (new Date()).getTime() - (new Date(createdAt)).getTime() < 600000;
};
