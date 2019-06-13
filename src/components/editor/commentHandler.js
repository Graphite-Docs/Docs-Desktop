import { getGlobal } from 'reactn';
const uuid = require('uuid/v4');
export function wrapComment(editor, comment) {
    editor.wrapInline({
      type: 'comment',
      data: { comment },
    });
    editor.moveToEnd()
}

export function unwrapComment(editor) {
    const { value } = editor;
    console.log(value.selection)
    editor.unwrapInline('comment')
}

export function hasComments() {
    const value = getGlobal().value;
    return value.inlines.some(inline => inline.type === 'comment')
}

export function onClickComment(event, editor) {
    event.preventDefault();
    console.log("Working")

    const { value } = editor;
    
    if (hasComments()) {
      console.log("has comments");
      //editor.command(unwrapComment);
      const comment = {
          id: uuid(),
          comment: document.getElementById('comment-input').value
      };
      if (comment === null || comment === "") {
        return
      } else {
        
        editor.command(wrapComment, comment);
        let dimmer = document.getElementsByClassName('dimmer');
        dimmer[0].style.display = "none";
        document.getElementById('comment-modal').style.display = "none";
        document.getElementById('comment-input').value = "";
      }
    } else if (value.selection.isExpanded) {
        const comment = {
            id: uuid(),
            comment: document.getElementById('comment-input').value
        };
      if (comment === null || comment === "") {
        return
      } else {
        editor.command(wrapComment, comment);
        let dimmer = document.getElementsByClassName('dimmer');
        dimmer[0].style.display = "none";
        document.getElementById('comment-modal').style.display = "none";
        document.getElementById('comment-input').value = "";
      }
    }
}