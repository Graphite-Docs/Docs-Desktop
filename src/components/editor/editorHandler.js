import { setGlobal, getGlobal } from 'reactn';
import isHotkey from 'is-hotkey'

const saveKey = isHotkey('mod+s');
const boldKey = isHotkey('mod+b');
const italicsKey = isHotkey('mod+i');
const underlineKey = isHotkey('mod+u');
const strikeKey = isHotkey('shift+mod+s');
const superScript = isHotkey('mod+.');
const subScript = isHotkey('mod+,');
const codeLine = isHotkey('shift+mod+c');
const headerOne = isHotkey('shift+mod+1');
const headerTwo = isHotkey('shift+mod+2');
const headerThree = isHotkey('shift+mod+3');
const headerFour = isHotkey('shift+mod+4');
const headerFive = isHotkey('shift+mod+5');
const shiftTab = isHotkey('shift+tab');
const DEFAULT_NODE = 'paragraph'
let enterPress = 0;

export function onChange(editor) {
  const { value } = editor;
  setGlobal({ 
    value  
  });
  
  const boldApplied = value.marks.filter(mark => mark.type === "bold").size === 1 ? true : false;
  const italicsApplied = value.marks.filter(mark => mark.type === "italic").size === 1 ? true : false;
  const underlineApplied = value.marks.filter(mark => mark.type === "underline").size === 1 ? true : false;
  const strikeApplied = value.marks.filter(mark => mark.type === "strikethrough").size === 1 ? true : false;
  const fontColorApplied = value.marks.filter(mark => mark.type === "font-color").size === 1 ? true : false;
  const highlightApplied = value.marks.filter(mark => mark.type === "highlight-color").size === 1 ? true : false;
  const fontSizeApplied = value.marks.filter(mark => mark.type === "font-size").size === 1 ? true : false;
  const fontFamilyApplied = value.marks.filter(mark => mark.type === "font-family").size === 1 ? true : false;
  const blockApplied = value.blocks.filter(block => block.toJSON()).size === 1 ? true : false;
  console.log(value.blocks.map(block => {console.log(block.toJSON())}))
  value.blocks.map(block => {
    if(block.toJSON().type === "image") {
      //Do nothing here
    } else {
      const images = document.getElementsByClassName('image-block');
      for (const image of images) {
          console.log(image);
          image.style.border = "none";
          image.style.padding = "0px";
      }

      const menus = document.getElementsByClassName('image-menu');
      for (const menu of menus) {
          menu.style.display = "none";
      }
    }
  });
  if(blockApplied) {
      value.blocks
        .filter(block => block.type.includes('h'))
        .forEach(block => {
            const thisBlock = block.toJSON();
            if(thisBlock.data) {
                if(thisBlock.data.class) {
                    setGlobal({ alignment: thisBlock.data.class });
                } else {
                    setGlobal({ alignment: 'left'});
                }
            } else {
                setGlobal({ alignment: 'left'});
            }
            if(thisBlock.type === 'h1') {
                setGlobal({currentHeading: "Heading 1"});
            } else if(thisBlock.type === 'h2') {
                setGlobal({currentHeading: "Heading 2"});
            } else if(thisBlock.type === 'h3') {
                setGlobal({currentHeading: "Heading 3"});
            } else if(thisBlock.type === 'h4') {
                setGlobal({currentHeading: "Heading 4"});
            } else if(thisBlock.type === 'h5') {
                setGlobal({currentHeading: "Heading 5"});
            } else {
                setGlobal({ currentHeading: "" });
            }
        });
  }

  if(boldApplied) {
      setGlobal({boldApplied})
  } else {
      setGlobal({boldApplied: false})
  }

  if(italicsApplied) {
    setGlobal({italicsApplied})
  } else {
    setGlobal({italicsApplied: false})
  }

  if(underlineApplied) {
    setGlobal({underlineApplied})
   } else {
    setGlobal({underlineApplied: false})
   }

   if(strikeApplied) {
    setGlobal({strikeApplied})
   } else {
    setGlobal({strikeApplied: false});
   }

  if(fontSizeApplied) {
    value.marks
    .filter(mark => mark.type === "font-size")
    .forEach(mark => {
      setGlobal({ currentFontSize: mark.toJSON()});
    }) 
  } else {
      setGlobal({ currentFontSize: {} });
  }

  if(fontColorApplied) {
    value.marks
          .filter(mark => mark.type === "font-color")
          .forEach(mark => {
            setGlobal({ currentColor: mark.toJSON()});
          })
  } else {
      setGlobal({ currentColor: {}})
  }

  if(highlightApplied) {
    value.marks
    .filter(mark => mark.type === "highlight-color")
    .forEach(mark => {
      setGlobal({ currentHighlight: mark.toJSON()});
    })
  } else {
      setGlobal({ currentHighlight: {} });
  }

  if(fontFamilyApplied) {
    value.marks
    .filter(mark => mark.type === "font-family")
    .forEach(mark => {
      setGlobal({ currentFont: mark.toJSON()});
    })
  } else {
    setGlobal({ currentFont: {} })
  }
}

export function onKeyDown(event, editor, next) {
    if(shiftTab(event)) {
      if(hasBlock('list-item')) {
        if(getGlobal().nodeType === "unordered") {
          event.preventDefault();
          editor.unwrapBlock('list-item');
          editor.unwrapBlock('unordered-list');
          editor.setBlocks('list-item').unwrapBlock('unordered-list');
        } else if(getGlobal().nodeType === "ordered") {
          event.preventDefault();
          editor.unwrapBlock('list-item');
          editor.unwrapBlock('ordered-list');
          editor.setBlocks('list-item').unwrapBlock('ordered-list');
        }
      }
    }
    if(event.key === "Tab") {
      if(hasBlock('list-item')) {
        if(getGlobal().nodeType === "unordered") {
          editor.setBlocks('list-item').wrapBlock('unordered-list').focus();
        } else if(getGlobal().nodeType === "ordered") {
          editor.setBlocks('list-item').wrapBlock('ordered-list').focus();
        }
      }
    }

    if(event.key === "Enter") {
      enterPress++
      if(hasBlock('list-item') && enterPress > 1) {
        enterPress = 0;
        //Here we are setting the node back to a paragraph node no matter how deeply nested a list might be.
        //This solution needs to be better
        editor.unwrapBlock('ordered-list');
        editor.unwrapBlock('unordered-list');
        editor.unwrapBlock('ordered-list');
        editor.unwrapBlock('unordered-list');
        editor.unwrapBlock('ordered-list');
        editor.unwrapBlock('unordered-list');
        editor.unwrapBlock('ordered-list');
        editor.unwrapBlock('unordered-list');
        editor.unwrapBlock('ordered-list');
        editor.unwrapBlock('unordered-list');
        editor.unwrapBlock('ordered-list');
        editor.unwrapBlock('unordered-list');
        editor.setBlocks(DEFAULT_NODE);
        editor.setBlocks(DEFAULT_NODE);
      }
    } else {
      enterPress = 0;
    }
    
    if(boldKey(event)) {
        event.preventDefault();
        editor.toggleMark('bold');
    } else if(italicsKey(event)) {
        event.preventDefault();
        editor.toggleMark('italic');
    } else if(underlineKey(event)) {
        event.preventDefault();
        editor.toggleMark('underline');
    } else if(strikeKey(event)) {
        event.preventDefault();
        editor.toggleMark('strikethrough');
    } else if(superScript(event)) {
        event.preventDefault();
        editor.toggleMark('super');
    } else if(subScript(event)) {
        event.preventDefault();
        editor.toggleMark('sub');
    } else if(codeLine(event)) {
        event.preventDefault();
        editor.toggleMark('code');  
    } else if(headerOne(event)) {
        event.preventDefault();
        editor.setBlocks(hasBlock('h1') ? DEFAULT_NODE : 'h1');
    } else if(headerTwo(event)) {
        event.preventDefault();
        editor.setBlocks(hasBlock('h2') ? DEFAULT_NODE : 'h2');
    } else if(headerThree(event)) {
        event.preventDefault();
        editor.setBlocks(hasBlock('h3') ? DEFAULT_NODE : 'h3');
    } else if(headerFour(event)) {
        event.preventDefault();
        console.log("heyo")
        editor.setBlocks(hasBlock('h4') ? DEFAULT_NODE : 'h4');
    } else if(headerFive(event)) {
        event.preventDefault();
        editor.setBlocks(hasBlock('h5') ? DEFAULT_NODE : 'h5');
    } else {
        return next()
    }
}

export function hasBlock(type) {
    const value = getGlobal().value;
    return value.blocks.some(node => node.type === type)
}

export function hasMark(type) {
    const value = getGlobal().value;
    return value.marks.some(mark => mark.type === type);
}

export function clickBlock(editor, type) {
    const { value } = editor;
    if(type === 'clear-formatting') {
      value.marks
          .filter(mark => mark.type !== 3)
          .forEach(mark => {
            console.log(mark.toJSON())
            let type = mark.toJSON().type;
            if(type === 'highlight-color' || type === "font-color" || type === "font-size" || type === "font-family") {
              editor.removeMark(mark);
            } else {
              editor.toggleMark(mark.toJSON().type);
            }
          })
      editor.unwrapBlock();
      editor.setBlocks(DEFAULT_NODE);
    } else if(type === "h1") {
        editor.setBlocks(hasBlock('h1') ? DEFAULT_NODE : 'h1');
    } else if(type === 'h2') {
        editor.setBlocks(hasBlock('h2') ? DEFAULT_NODE : 'h2');
    } else if(type === 'h3') {
        editor.setBlocks(hasBlock('h3') ? DEFAULT_NODE : 'h3');
    } else if(type === 'h4') {
        editor.setBlocks(hasBlock('h4') ? DEFAULT_NODE : 'h4');
    } else if(type === 'h5') {
        editor.setBlocks(hasBlock('h5') ? DEFAULT_NODE : 'h5');
    } else if(type === 'p') {
        editor.setBlocks(hasBlock('p') ? DEFAULT_NODE : 'p');
    } else if(type.includes('font')) {
        const fontName = type.split(':')[1];
        console.log(hasMark('font-family'));
        if(hasMark('font-family')) {
            if (value.selection.isExpanded) {
                value.marks
                  .filter(mark => mark.type === "font-family")
                  .forEach(mark => {
                    editor
                      .removeMark(mark)
                      .focus()
                      .addMark({
                        type: "font-family",
                        data: { 
                            font: fontName 
                        }
                      })
                      .focus();
                  });
        }
        } else {
            editor.addMark({
                type: "font-family",
                data: { 
                    font: fontName 
                  }
              })
              .focus();
        }        
    } else if(type.includes('size')) {
        const fontSize = type.split(':')[1];
        if(hasMark('font-size')) {
            if (value.selection.isExpanded) {
                value.marks
                  .filter(mark => mark.type === "font-size")
                  .forEach(mark => {
                    editor
                      .removeMark(mark)
                      .focus()
                      .addMark({
                        type: "font-size",
                        data: { 
                            size: fontSize 
                        }
                      })
                      .focus();
                  });
        }
        } else {
            editor.addMark({
                type: "font-size",
                data: { 
                    size: fontSize 
                  }
              })
              .focus();
        } 
    } else if(type.includes('color')) {
        const color = type.split(':')[1];
        if(hasMark('font-color')) {
            if (value.selection.isExpanded) {
                value.marks
                  .filter(mark => mark.type === "font-color")
                  .forEach(mark => {
                    editor
                      .removeMark(mark)
                      .focus()
                      .addMark({
                        type: "font-color",
                        data: { 
                            color: color 
                        }
                      })
                      .focus();
                  });
        }
        } else {
            editor.addMark({
                type: "font-color",
                data: { 
                    color: color 
                  }
              })
              .focus();
        } 
    } else if(type.includes('highlight')) {
        const color = type.split(':')[1];
        if(hasMark('highlight-color')) {
            if (value.selection.isExpanded) {
                value.marks
                  .filter(mark => mark.type === "highlight-color")
                  .forEach(mark => {
                    editor
                      .removeMark(mark)
                      .focus()
                      .addMark({
                        type: "highlight-color",
                        data: { 
                            highlight: color 
                        }
                      })
                      .focus();
                  });
        }
        } else {
            editor.addMark({
                type: "highlight-color",
                data: { 
                    highlight: color 
                  }
              })
              .focus();
        } 
    } else if(type === 'align-left') {
        if (hasBlock('image')) {
          editor
          .wrapBlock({
            type: 'alignment-div',
            data: { class: 'left' }
          })
          .focus();
        } else if (hasBlock('align-left')) {
            editor
              .setBlocks({
                type: value.blocks.first().type,
                data: { class: null }
              })
              .focus();
          } else {
            editor
              .setBlocks({
                type: value.blocks.first().type,
                data: { class: 'left' }
              })
              .focus();
      }
    } else if(type === 'align-right') {
        if (hasBlock('image')) {
          editor
              .wrapBlock({
                type: 'alignment-div',
                data: { class: 'right' }
              })
              .focus();
        } else if (hasBlock('align-right')) {
            editor
              .setBlocks({
                type: value.blocks.first().type,
                data: { class: null }
              })
              .focus();
          } else {
            editor
              .setBlocks({
                type: value.blocks.first().type,
                data: { class: 'right' }
              })
              .focus();
      }
    } else if(type === 'align-center') {
        if(hasBlock('image')) {
          editor
          .wrapBlock({
            type: 'alignment-div',
            data: { class: 'center' }
          })
          .focus();
        } else if (hasBlock('align-center')) {
            editor
              .setBlocks({
                type: value.blocks.first().type,
                data: { class: null }
              })
              .focus();
          } else {
            editor
              .setBlocks({
                type: value.blocks.first().type,
                data: { class: 'center' }
              })
              .focus();
      }
    } else if(type === 'align-justify') {
        if(hasBlock('image')) {
          editor
          .wrapBlock({
            type: 'alignment-div',
            data: { class: 'justify' }
          })
          .focus();
        } else if (hasBlock('align-justify')) {
            editor
              .setBlocks({
                type: value.blocks.first().type,
                data: { class: null }
              })
              .focus();
          } else {
            editor
              .setBlocks({
                type: value.blocks.first().type,
                data: { class: 'justify' }
              })
              .focus();
      }
    } else if(type == 'bold') {
        event.preventDefault();
        editor.toggleMark('bold').focus();
    } else if(type === 'italic') {
        event.preventDefault();
        editor.toggleMark('italic').focus();
    } else if(type === 'underline') {
        event.preventDefault();
        editor.toggleMark('underline').focus();
    } else if(type === 'strike') {
        event.preventDefault();
        editor.toggleMark('strikethrough').focus();
    } else if(type === 'comment') {
      event.preventDefault();
      editor.toggleMark('comment').focus();
    }
}

