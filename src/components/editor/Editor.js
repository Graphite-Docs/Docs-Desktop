import React from 'reactn';
import { Editor } from 'slate-react';
import { Value, Block } from 'slate';
import { onChange, onKeyDown, clickBlock } from './editorHandler';
import { renderMark, renderBlock, renderInline } from './renderers';
import Toolbar from './Toolbar';
import { handleDragOver, handleImageDrop, handleImageUpload } from './imagehandler';
import { onClickLink } from './linkHandler';
import { onClickComment } from './commentHandler';
import { onClickList } from './listHandler';
const schema = {
    document: {
      last: { type: 'paragraph' },
      normalize: (editor, { code, node, child }) => {
        switch (code) {
          case 'last_child_type_invalid': {
            const paragraph = Block.create('paragraph')
            return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
          }
        }
      },
    },
    blocks: {
      image: {
        isVoid: true,
      },
    },
  }


export default class SlateEditor extends React.Component {

  componentDidMount() {
      document.getElementById('editor-section').style.lineHeight = this.global.spacing;
  }

  ref = (editor) => {
    this.editor = editor
  }
  
onClickBlock = (event, type) => {
    event.preventDefault();
    const { editor } = this;
    if(type === 'undo') {
        editor.undo();
    } else if(type === 'redo') {
        editor.redo();
    } else if(type === "link") {
        onClickLink(event, editor);
    } else if(type === 'comment') {
        onClickComment(event, editor);
    } else if(type === "unordered-list" || type === "ordered-list") {
        onClickList(event, editor, type);
    } else {
        clickBlock(editor, type);
    }
}

onImageClick = (event) => {
    const { editor } = this;
    handleImageUpload(event, editor);
}

handleMenus = (event) => {
    document.getElementById('font-drop').style.display = "none";
    document.getElementById('heading-drop').style.display = "none";
    document.getElementById('size-drop').style.display = "none";
    document.getElementById('color-drop').style.display = "none";
    document.getElementById('highlight-drop').style.display = "none";
}

  render() {
    const { value, comments } = this.global;
    console.log(comments);

    return (
    <div>
        <Toolbar
            editor={this.ref}
            onClickBlock={this.onClickBlock}
            onClickUndo={this.onClickUndo}
            currentColor={this.currentColor}
            currentHightlight={this.currentHighlight}
            onImageClick={this.onImageClick}
        />
        <div id="doc-background" onClick={this.handleMenus}>
            <Editor 
                className="main-editor" 
                id="editor-section"
                schema={schema}
                onDrop={handleImageDrop} 
                onDragOver={handleDragOver} 
                value={value} 
                onChange={onChange} 
                onKeyDown={onKeyDown}
                renderMark={renderMark}
                renderBlock={renderBlock}
                renderInline={renderInline}
                spellCheck
                autoFocus
                ref={this.ref}
            />
        </div>
    </div>
    );
  }
}
