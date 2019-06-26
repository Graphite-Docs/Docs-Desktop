import React, { setGlobal } from 'reactn';
import fontOptions from './fontOptions.json';
import headingOptions from './headingOptions.json';
import fontSizeOptions from './fontSizeOptions.json';
import colorOptions from './colorOptions.json';
const uuid = require('uuid/v4');

export default class Toolbar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          selectedFont: "Times New Roman",
          fontListOpen: false, 
          textType: "Set heading", 
          headingListOpen: false,
          selectedSize: "12",
          fontSizeListOpen: false,
          selectedColor: "#000",
          fontColorListOpen: false
      }
  }
  handleFont = (event, font) => {
      this.props.onClickBlock(event, `font:${font}`);
      this.setState({selectedFont: font});
      document.getElementById('font-drop').style.display = "none";
  }

  handleFontList = () => {
    const { fontListOpen } = this.state;
    if(fontListOpen) {
        document.getElementById('font-drop').style.display = "none";
        this.setState({ fontListOpen: false });
    } else {
        document.getElementById('font-drop').style.display = "inline-block";
        this.setState({ fontListOpen: true });
    }
  }

  handleHeadingList = () => {
    const { headingListOpen } = this.state;
    if(headingListOpen) {
        document.getElementById('heading-drop').style.display = "none";
        this.setState({ headingListOpen: false });
    } else {
        document.getElementById('heading-drop').style.display = "inline-block";
        this.setState({ headingListOpen: true });
    }
  }

  handleFontSize = (event, size) => {
    this.props.onClickBlock(event, `size:${size.px}`);
    this.setState({selectedSize: size.pt});
    document.getElementById('size-drop').style.display = "none";
  }

  handleSizeList = () => {
    const { fontSizeListOpen } = this.state;
    if(fontSizeListOpen) {
        document.getElementById('size-drop').style.display = "none";
        this.setState({ fontSizeListOpen: false });
    } else {
        document.getElementById('size-drop').style.display = "inline-block";
        this.setState({ fontSizeListOpen: true });
    }
  }

  handleFontColor = (event, color) => {
    this.props.onClickBlock(event, `color:${color}`);
    this.setState({selectedColor: color});
    document.getElementById('color-drop').style.display = "none";
  }

  handleFontColorList = () => {
    const { fontColorListOpen } = this.state;
    if(fontColorListOpen) {
        document.getElementById('color-drop').style.display = "none";
        this.setState({ fontColorListOpen: false });
    } else {
        document.getElementById('color-drop').style.display = "inline-block";
        this.setState({ fontColorListOpen: true });
    }
  }

  handleHighlight = (event, color) => {
    this.props.onClickBlock(event, `highlight:${color}`);
    this.setState({selectedHighlight: color});
    document.getElementById('highlight-drop').style.display = "none";
  }

  handleHighlightList = () => {
    const { highlightListOpen } = this.state;
    if(highlightListOpen) {
        document.getElementById('highlight-drop').style.display = "none";
        this.setState({ highlightListOpen: false });
    } else {
        document.getElementById('highlight-drop').style.display = "inline-block";
        this.setState({ highlightListOpen: true });
    }
  }

  handleOtherClick = () => {
      const { fontListOpen, headingListOpen, fontSizeListOpen, fontColorListOpen, highlightListOpen } = this.state;
      if(fontListOpen) {
          document.getElementById('font-drop').style.display = "none";
      }

      if(headingListOpen) {
        document.getElementById('heading-drop').style.display = "none";
      }

      if(fontSizeListOpen) {
        document.getElementById('size-drop').style.display = "none";
      }

      if(fontColorListOpen) {
        document.getElementById('color-drop').style.display = "none";
      }

      if(highlightListOpen) {
        document.getElementById('highlight-drop').style.display = "none";
      }
      if(document.getElementById('table-drop')) {
        document.getElementById('table-drop').style.display = "none";
      }
  }

  handleHeading = (event, type) => {
      this.props.onClickBlock(event, type.key);
      this.setState({ textType: type.name });
      document.getElementById('heading-drop').style.display = "none";
  }

  triggerFilePicker = (event) => {
    document.getElementById('file-input').click()
  }

  triggerLinkModal = () => {
      let dimmer = document.getElementsByClassName('dimmer');
      dimmer[0].style.display = "block";
      document.getElementById('link-modal').style.display = "block";
      document.getElementById('link-input').autofocus = true;
  }

  triggerCommentModal = (e) => {
    let dimmer = document.getElementsByClassName('dimmer');
    dimmer[0].style.display = "block";
    document.getElementById('comment-modal').style.display = "block";
    //document.getElementById('comment-input').autofocus = true;
  }

  closeModals = () => {
    let dimmer = document.getElementsByClassName('dimmer');
    dimmer[0].style.display = "none";
    document.getElementById('link-modal').style.display = "none";
    document.getElementById('link-input').value = "";
    document.getElementById('comment-modal').style.display = "none";
    document.getElementById('comment-input').value = "";
  }

  handleComment = (e) => {
        this.props.onClickBlock(e, 'comment');
  }

  render() {
    const node = document.getElementById("link-input");
    if(node) {
        node.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                this.props.onClickBlock(event, 'link');
            }
        });
    }
    const { currentColor, currentHighlight, currentFont, currentHeading, currentFontSize } = this.global;
    const { boldApplied, italicsApplied, underlineApplied, strikeApplied, alignment } = this.global;
    return (
    <div className="no-print" onClick={this.handleOtherClick}>
        <div className="toolbar">
            <ul>
                <li onClick={(event) => this.props.onClickBlock(event, 'undo')}><img src={`${__dirname}/assets/icons/undo.svg`} alt="undo icon" /></li>
                <li onClick={(event) => this.props.onClickBlock(event, 'redo')}><img src={`${__dirname}/assets/icons/redo.svg`} alt="redo icon" /></li>
                <li onClick={this.handleHeadingList}>
                    <span className="dropdown-selection">{currentHeading ? currentHeading : "Normal text"}</span>
                    <span style={{display: "none"}} id="heading-drop" className="dropdown">
                        <span className="dropdown-content">
                            {
                                headingOptions.map(opt => {
                                    return (
                                        <div key={opt.key} onClick={(event) => this.handleHeading(event, opt)}>{opt.name}</div>
                                    )
                                })
                            }
                        </span>
                    </span>
                    <span><img className="caret" src={`${__dirname}/assets/icons/caret-down.svg`} /></span>
                </li>
                <li onClick={this.handleFontList}>
                    <span className="dropdown-selection">{currentFont.data ? currentFont.data.font : "Times New Roman"}</span>
                    <span style={{display: "none"}} id='font-drop' className="dropdown">
                        <span className="dropdown-content">
                        {
                            fontOptions.sort().map(opt => {
                                return(
                                    <div onClick={(event) => this.handleFont(event, opt)} style={{fontFamily: opt}} key={opt}>{opt}</div>
                                )
                            })
                        }
                        </span>
                    </span>
                    <span><img className="caret" src={`${__dirname}/assets/icons/caret-down.svg`} /></span>
                </li>
                <li onClick={this.handleSizeList}>
                <span className="dropdown-selection">{currentFontSize.data ? fontSizeOptions.filter(a => a.px === currentFontSize.data.size)[0].pt :  "12"}</span>
                    <span style={{display: "none"}} id='size-drop' className="dropdown">
                        <span className="dropdown-content">
                        {
                            fontSizeOptions.map(opt => {
                                return(
                                    <div onClick={(event) => this.handleFontSize(event, opt)} key={opt.pt}>{opt.pt}</div>
                                )
                            })
                        }
                        </span>
                    </span>
                    <span><img className="caret" src={`${__dirname}/assets/icons/caret-down.svg`} /></span>
                </li>
                <li style={{borderBottom: boldApplied ? "5px solid #1a73e8" : "none"}} onClick={(event) => this.props.onClickBlock(event, 'bold')}><img src={`${__dirname}/assets/icons/bold.svg`} alt="bold icon" /></li>
                <li style={{borderBottom: italicsApplied ? "5px solid #1a73e8" : "none"}} onClick={(event) => this.props.onClickBlock(event, 'italic')}><img src={`${__dirname}/assets/icons/italic.svg`} alt="italic icon" /></li>
                <li style={{borderBottom: underlineApplied ? "5px solid #1a73e8" : "none"}} onClick={(event) => this.props.onClickBlock(event, 'underline')}><img src={`${__dirname}/assets/icons/underline.svg`} alt="underline icon" /></li>
                <li style={{borderBottom: strikeApplied ? "5px solid #1a73e8" : "none"}} onClick={(event) => this.props.onClickBlock(event, 'strike')}><img src={`${__dirname}/assets/icons/strikethrough.svg`} alt="strikethrough icon" /></li>
                <li style={{borderBottom: currentColor.data ? `solid 5px #${currentColor.data.color}` : "solid 5px #000"}} onClick={this.handleFontColorList}>
                    <img src={`${__dirname}/assets/icons/font-color.svg`} alt="font color icon" />
                    <div style={{display: "none"}} id='color-drop' className="dropdown">
                        <div className="dropdown-content">
                            <div className="flex-container">
                            {
                                colorOptions.map(opt => {
                                    return (
                                        <div onClick={(event) => this.handleFontColor(event, opt)} className="color-box" style={{background: `#${opt}`}} key={opt}></div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </li>
                <li style={{borderBottom: currentHighlight.data ? `solid 5px #${currentHighlight.data.highlight}` : "solid 5px #000"}} onClick={this.handleHighlightList}>
                    <img src={`${__dirname}/assets/icons/highlighter.svg`} alt="highlight color icon" />
                    <div style={{display: "none"}} id='highlight-drop' className="dropdown">
                        <div className="dropdown-content">
                            <div className="flex-container">
                            {
                                colorOptions.map(opt => {
                                    return (
                                        <div onClick={(event) => this.handleHighlight(event, opt)} className="color-box" style={{background: `#${opt}`}} key={opt}></div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </li>
                <li style={{borderBottom: alignment === 'left' ? "5px solid #1a73e8" : "none"}} onClick={(event) => this.props.onClickBlock(event, "align-left")}>
                    <img src={`${__dirname}/assets/icons/align-left.svg`} alt="align left icon" />
                </li>
                <li style={{borderBottom: alignment === 'center' ? "5px solid #1a73e8" : "none"}} onClick={(event) => this.props.onClickBlock(event, "align-center")}>
                    <img src={`${__dirname}/assets/icons/align-center.svg`} alt="align center icon" />
                </li>
                <li style={{borderBottom: alignment === 'right' ? "5px solid #1a73e8" : "none"}} onClick={(event) => this.props.onClickBlock(event, "align-right")}>
                    <img src={`${__dirname}/assets/icons/align-right.svg`} alt="align right icon" />
                </li>
                <li style={{borderBottom: alignment === 'justify' ? "5px solid #1a73e8" : "none"}} onClick={(event) => this.props.onClickBlock(event, "align-justify")}>
                    <img src={`${__dirname}/assets/icons/align-justify.svg`} alt="align justify icon" />
                </li>
                <li onClick={this.triggerFilePicker}>
                    <input onChange={this.props.onImageClick} style={{display: "none"}} type="file" id="file-input" accept=".png, .jpg, .jpeg, .gif" />
                    <img src={`${__dirname}/assets/icons/image.svg`} alt="image icon" />
                </li>
                <li onClick={this.triggerLinkModal}>
                    <img src={`${__dirname}/assets/icons/link.svg`} alt="image icon" />
                </li>
                <li onClick={this.triggerCommentModal}>
                    <img src={`${__dirname}/assets/icons/comment.svg`} alt="image icon" />
                </li>
                <li onClick={(event) => this.props.onClickBlock(event, 'unordered-list')}>
                    <img src={`${__dirname}/assets/icons/list-ul.svg`} alt="image icon" />
                </li>
                <li onClick={(event) => this.props.onClickBlock(event, 'ordered-list')}>
                    <img src={`${__dirname}/assets/icons/list-ol.svg`} alt="image icon" />
                </li>
                <li onClick={(event) => this.props.onClickBlock(event, 'clear-formatting')}>
                    <img src={`${__dirname}/assets/icons/remove-format.svg`} alt="image icon" />
                </li>
                <li onClick={(event) => this.props.onClickBlock(event, 'block-quote')}>
                    <img src={`${__dirname}/assets/icons/quote-left.svg`} alt="image icon" />
                </li>
            </ul>
        </div>
        <div className="modal" style={{display: "none"}} id='link-modal'>
            <div>
                <input id="link-input" type="text" placeholder="https://graphitedocs.com" />
            </div>
        </div>

        <div className="modal" style={{display: "none"}} id='comment-modal'>
            <div>
                <textarea id="comment-input" placeholder="Your comment"></textarea>
                <button onClick={this.handleComment} className="save-button">Add Comment</button><button onClick={this.closeModals} className="cancel-button">Cancel</button>
            </div>
        </div>
    </div>
    );
  }
}
