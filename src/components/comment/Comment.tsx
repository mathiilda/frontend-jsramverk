import React, { useState } from "react";
import tinymce from "tinymce/tinymce";

import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/lists";
import "tinymce/plugins/charmap";
import "tinymce/plugins/hr";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/help";

import { create, getSpecific } from "../../data/comments";

type Props = {
  modeCreate: boolean;
  commentId: string;
  click: boolean;
};

export function Comment({ commentId, modeCreate, click }: Props) {
  const [commentText, setCommentText] = useState("");
  const [commentedText, setCommentedText] = useState("");

  const createComment = async () => {
    let id = await create(commentText);
    setCommentText("");

    tinymce.activeEditor.execCommand(
      "mceInsertContent",
      false,
      " <span id=" + id + ">💬</span> "
    );
  };

  const getComment = async () => {
    click = false;
    let text = await getSpecific(commentId);
    // setCommentText(text);
    setCommentedText(text);
    setCommentText("");
  };

  if (click && commentId) {
    getComment();
  }

  if (modeCreate) {
    return (
      <div className="shadow bg-gray-100 w-4/6 h-40 rounded-lg ml-4 text-gray-700">
        <div className="p-4">
          <h3 className="mb-2 font-bold">Add a comment</h3>
          <input
            type="text"
            value={commentText}
            onChange={(event) => setCommentText(event?.target.value)}
            placeholder="Comment"
            className="mb-4 p-1 mt-1 bg-gray-100 border-2 border-gray-200 w-full rounded"
          />
          <button
            onClick={() => createComment()}
            className="bg-yellow-500 p-1 shadow float-right text-gray-700 rounded-lg w-full"
          >
            <p>Submit</p>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="shadow bg-gray-100 w-4/6 h-48 rounded-lg ml-4 text-gray-700">
        <div className="p-4">
          <h3 className="mb-2 font-bold">Comment</h3>
          <p>{commentedText}</p>
        </div>
      </div>
    );
  }
}
