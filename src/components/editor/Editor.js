import React from 'reactn';
import { Editor } from 'slate-react';
import { Value, Block } from 'slate';
import { onChange, onKeyDown, clickBlock } from './editorHandler';
import { renderMark, renderBlock, renderInline } from './renderers';
import Toolbar from './Toolbar';
import TableModal from './TableModal';
import { handleDragOver, handleImageDrop, handleImageUpload } from './imagehandler';
import { onClickLink } from './linkHandler';
import { onClickComment } from './commentHandler';
import { onClickList } from './listHandler';
import MenuBar from './MenuBar';
import Tables from 'slate-tables';

const plugins = [
  Tables({ /* options object here; see below */ }),
];

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
      let editor = document.getElementById('editor-section');
      let thisDoc = this.global.document;
      if(thisDoc.marginRight) {
        editor.style.paddingRight = `${(thisDoc.marginRight * 60 * 1.65)}px`;
        editor.style.paddingLeft = `${(thisDoc.marginLeft * 60 * 1.65)}px`;
        editor.style.paddingTop = `${(thisDoc.marginTop * 60 * 1.65)}px`;
        editor.style.paddingBottom = `${(thisDoc.marginBottom * 60 * 1.65)}px`;
      }
      editor.style.lineHeight = this.global.spacing;
  }

  ref = (editor) => {
    this.editor = editor
  }
  
onClickUndo = event => {
  
}

setTable = (size) => {
  event.preventDefault();
  const col = size.split('x')[0];
  const rows = size.split('x')[1];
  this.editor.insertTable(col,rows);
  document.getElementById('table-drop').style.display = "none";
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
    if(document.getElementById('insert-drop')) {
      document.getElementById('insert-drop').style.display = "none";
    } 
    const { editor } = this;
    handleImageUpload(event, editor);
}

handleMenus = (event) => {
    document.getElementById('font-drop').style.display = "none";
    document.getElementById('heading-drop').style.display = "none";
    document.getElementById('size-drop').style.display = "none";
    document.getElementById('color-drop').style.display = "none";
    document.getElementById('highlight-drop').style.display = "none";
    let menus = document.getElementsByClassName('menu-drops');
      for (const menu of menus) {
          menu.style.display = "none";
      }
      if(document.getElementById('table-drop')) {
        document.getElementById('table-drop').style.display = "none";
      }
}

  render() {
    const { value } = this.global;
    return (
    <div>
        <TableModal 
          setTable={this.setTable}
        />
        <MenuBar 
          onClickUndo={this.onClickUndo}
          onImageClick={this.onImageClick}
        />
        <Toolbar
          editor={this.ref}
          onClickBlock={this.onClickBlock}
          currentColor={this.currentColor}
          currentHightlight={this.currentHighlight}
          onImageClick={this.onImageClick}
        /> 
        <div id="doc-background" onClick={this.handleMenus}>
          <div className="page-view">
            <Editor 
                className="main-editor" 
                id="editor-section"
                schema={schema}
                plugins={plugins}
                onClickUndo={this.onClickUndo}
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
    </div>
    );
  }
}
