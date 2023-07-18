const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

exports.createPost = async (req,res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.Postimages, {
      folder: "Post",
    });

    const createPostData = {
      caption: req.body.caption,
      Postimages: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    const newPost = await Post.create(createPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(newPost._id);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Post Created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createTweet = async (req, res) => {
  try {
    const createTweetData = {
      tweet: req.body.tweet,
      image: {
        public_id: "req.body.public_id",
        url: "req.body.url",
      },
      owner: req.user._id,
    };

    const newTweet = await Post.create(createTweetData);

    const user = await User.findById(req.user._id);

    user.tweets.push(newTweet._id);

    await user.save();

    res.status(201).json({
      success: true,
      newTweet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not accessible",
      });
    }

    await cloudinary.v2.uploader.destroy(post.Postimages.public_id);

    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);

    user.posts.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTweet = async (req, res) => {
  try {
    const tweet = await Post.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (tweet.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not accessible",
      });
    }

    await tweet.remove();

    const user = await User.findById(req.user._id);

    const index = user.tweets.indexOf(req.params.id);

    user.tweets.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Tweet deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostOfUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner saved"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner saved"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(200).json({
        success: false,
        message: "post not found",
      });
    }

    // if user has already liked the post
    // unlike Post
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "post unliked",
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "post liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostOfFollowedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user saved");

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDiscoverPosts = async (req, res) => {
  try {
    const newArr = [...req.user.following, req.user._id];

    const num = req.query.num || 9;

    const posts = await Post.aggregate([
      { $match: { owner: { $nin: newArr } } },
      { $sample: { size: Number(num) } },
    ]);

    return res.status(200).json({
      success: true,
      message: "Success",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if (!post) {
      return res.status(200).json({
        success: false,
        message: "post not found",
      });
    }

    if (
      post.saved.includes(req.user._id) &&
      user.savedPost.includes(post._id)
    ) {
      const index = post.saved.indexOf(req.user._id);
      const indexOf = user.savedPost.indexOf(post._id);

      post.saved.splice(index, 1);
      await post.save();

      user.savedPost.splice(indexOf, 1);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Post unSaved",
      });
    } else {
      post.saved.push(req.user._id);
      await post.save();

      user.savedPost.push(post);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "post Saved",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSavedPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const savedPost = [];

    for (let i = 0; i < user.savedPost.length; i++) {
      const post = await Post.findById(user.savedPost[i]).populate(
        "likes comments.user owner saved"
      );
      savedPost.push(post);
    }

    res.status(200).json({
      success: true,
      savedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    post.caption = req.body.caption;

    await post.save();

    return res.status(401).json({
      success: true,
      message: "Post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTweet = async (req, res) => {
  try {
    const tweet = await Post.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (tweet.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    tweet.tweet = req.body.tweet;
    await tweet.save();

    return res.status(401).json({
      success: true,
      message: "Tweet updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    //for single comment

    // let commentIndex = -1;

    // post.comments.forEach((item, index) => {
    //   if (item.user.toString() === req.user._id.toString()) {
    //     commentIndex = index;
    //   }
    // });

    // check if user has already commented on the post

    // if (commentIndex !== -1) {
    //   post.comments[commentIndex].comment = req.body.comment;
    //   await post.save();
    //   return res.status(200).json({
    //     success: true,
    //     message: "Comment Added",
    //   });
    // } else {
    //   post.comments.push({
    //     user: req.user._id,
    //     comment: req.body.comment,
    //   });

    //   await post.save();
    //   res.status(200).json({
    //     success: true,
    //     message: "Comment added",
    //   });
    // }

    // for multiple comments

    post.comments.push({
      user: req.user._id,
      comment: req.body.comment,
    });

    await post.save();
    res.status(200).json({
      success: true,
      message: "Comment Added",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId == undefined) {
        return res.status(401).json({
          success: false,
          message: "CommentId not found please provide commentId",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Owner has deleted Comment",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      res.status(200).json({
        success: true,
        message: "Comment deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
