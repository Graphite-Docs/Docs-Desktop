import React, { setGlobal } from 'reactn';
import { imageAlign, imageSize } from './imagehandler';

export function renderMark(props, editor, next) {
    switch (props.mark.type) {
      case 'bold':
        return <strong {...props.attributes}>{props.children}</strong>
      case 'italic': 
        return <i {...props.attributes}>{props.children}</i>
      case 'underline': 
        return <u {...props.attributes}>{props.children}</u>
      case 'strikethrough': 
        return <del {...props.attributes}>{props.children}</del>
      case 'super': 
        return <sup {...props.attributes}>{props.children}</sup>
      case 'sub': 
        return <sub {...props.attributes}>{props.children}</sub>
      case 'code': 
        return <code {...props.attributes}>{props.children}</code>
      case 'font-family': 
        return <span style={{ fontFamily: props.mark.data.get('font') }}>
            {props.children}
        </span>
      case 'font-size': 
        return <span style={{ fontSize: `${props.mark.data.get('size')}px` }}>
            {props.children}
        </span>
      case 'font-color': 
        return <span style={{ color: `#${props.mark.data.get('color')}` }}>
            {props.children}
        </span>
      case 'highlight-color': 
        return <span style={{ background: `#${props.mark.data.get('highlight')}` }}>
            {props.children}
        </span>
      default:
        return next()
    }
}

export function renderBlock(props, editor, next) {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'block-quote':
        return <blockquote className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</blockquote>
      case 'unordered-list':
        setGlobal({nodeType: "unordered"});
        return <ul className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</ul>
      case 'h1':
        return <h1 className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</h1>
      case 'h2':
        return <h2 className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</h2>
      case 'h3':
        return <h3 className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</h3>
      case 'h4':
        return <h4 className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</h4>
      case 'h5':
        return <h5 className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</h5>
      case 'h5':
        return <span className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</span>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'ordered-list':
        setGlobal({nodeType: "ordered"});
        return <ol className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</ol>
      case 'paragraph':
        return <p className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</p>
      case 'image': {
          const src = node.data.get('src');
          const id = node.data.get('id');
          return (
            <div className="image-block" id={id} style={{width: "50%", float: "left"}} onClick={() => revealImageMenus(id)}>
              <img
                {...attributes}
                src={src}
                className="doc-image"
              />
              <div className="image-menu" id={`image-menu-${id}`}style={{display: "none"}}>
                <ul className="image-position">
                  <li onClick={() => imageAlign(id, "left")}><img src={`${__dirname}/assets/icons/align-left.svg`} alt="align left icon" /></li>
                  <li onClick={() => imageAlign(id, "center")}><img src={`${__dirname}/assets/icons/align-center.svg`} alt="align center icon" /></li>
                  <li onClick={() => imageAlign(id, "right")}><img src={`${__dirname}/assets/icons/align-right.svg`} alt="align right icon" /></li>
                  <li onClick={() => imageSize(id, 'half')}><img src={`${__dirname}/assets/icons/compress-arrows-alt.svg`} alt="half-width icon" /></li>
                  <li onClick={() => imageSize(id, 'full')}><img src={`${__dirname}/assets/icons/arrows-alt-h.svg`} alt="full-width icon" /></li>
                </ul>
              </div>
            </div>
            
          )
      }
      case 'alignment-div': 
        return <div className={node.data.get('class') ? node.data.get('class') : ""} {...attributes}>{children}</div>
      default:
        return next()
    }
}

export function revealImageMenus(id) {
  document.getElementById(`image-menu-${id}`).style.display = "block";
  document.getElementById(id).style.border = "0.5px solid rgb(26, 115, 232)"
  document.getElementById(id).style.padding = "3px"
}

export function renderInline(props, editor, next) {
  const { attributes, children, node } = props
  console.log(node.type);
  switch (node.type) {
    case 'link': {
      const { data } = node
      const href = data.get('href')
      return (
        <a {...attributes} href={href}>
          {children}
        </a>
      )
    }
    case 'comment': {
      const { data } = node;
      const comment = data.get('comment');
      return (
        <mark className="mark" style={{cursor: "pointer", textAlign: "center"}} {...attributes}>
          <span style={{display: "none"}} className="modal comment-modal" id={comment.id}>
            <span style={{marginBottom:"15px"}} className="comment-text">{comment.comment}</span><br/><br/>
            <button className="comment-save" onClick={() => resolveComment(editor, node.key)}>Resolve</button><button className="comment-cancel" onClick={() => handleCloseCommentModal(comment)}>Close</button>
          </span>
          <abbr title={comment} onClick={() => handleCommentModal(comment)}>{children}</abbr>
        </mark>
      )
    }
    default: {
      return next()
    }
  }
}

export function resolveComment(editor, key) {
  editor.unwrapInlineByKey(key);
  let dimmer = document.getElementsByClassName('dimmer')[0];
  dimmer.style.display = "none";
}

export function handleCommentModal(comment) {
  let dimmer = document.getElementsByClassName('dimmer')[0];
  document.getElementById(comment.id).style.display = "block";
  dimmer.style.display = "block";
}

export function handleCloseCommentModal(comment) {
  let dimmer = document.getElementsByClassName('dimmer')[0];
  document.getElementById(comment.id).style.display = "none";
  dimmer.style.display = "none";
}