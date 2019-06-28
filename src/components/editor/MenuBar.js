import React from 'reactn';
import { exportAsWord, exportAsRTF, exportAsTXT, exportAsPDF } from '../helpers/exportHelpers';
import { handlePageSettings } from '../helpers/settings';

export default class MenuBar extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          menuSelection: "file"
      }
  }

  handleSelection = async (menuSelection) => {
    let menus = document.getElementsByClassName('menu-drops');
      for (const menu of menus) {
          menu.style.display = "none";
      }
      if(menuSelection === "file") {
        await this.setState({ menuSelection })
        document.getElementById('file-drop').style.display = "inline-block";
      } else if(menuSelection === "edit") {
        await this.setState({ menuSelection })
        document.getElementById('edit-drop').style.display = "inline-block";
      } else if(menuSelection === "insert") {
        await this.setState({ menuSelection })
        document.getElementById('insert-drop').style.display = "inline-block";
      } else if(menuSelection === "format") {
        await this.setState({ menuSelection })
        document.getElementById('format-drop').style.display = "inline-block";
      } else if(menuSelection === "tools") {
        await this.setState({ menuSelection })
        document.getElementById('tools-drop').style.display = "inline-block";
      }
      if(document.getElementById('table-drop')) {
        document.getElementById('table-drop').style.display = "none";
      }
      if(document.getElementById('shape-menu')) {
        document.getElementById('shape-menu').style.display = "none";
      }

  }

  triggerFilePicker = (event) => {
    document.getElementById('file-input-menu').click()
  }

  handleTableModal = () => {
     document.getElementById('insert-drop').style.display = "none";
     document.getElementById('table-drop').style.display = "inline-block";
  }

  handleShapeList = () => {
      document.getElementById('insert-drop').style.display = "none";
      document.getElementById('shape-menu').style.display = "block";
  }

  render() {
      const { menuSelection } = this.state;
    return (
    <div className="menu-bar no-print" >
        <ul>
            <li><span onClick={() => this.handleSelection('file')}>File</span>
                {
                    menuSelection === "file" ? 
                    <div style={{display: "none"}} id="file-drop" className="dropdown menu-drops">
                        <ul className="dropdown-menu-content">
                            <li onClick={exportAsWord}>Export to DOCX</li>
                            <li onClick={exportAsRTF}>Export to RTF</li>
                            <li onClick={exportAsTXT}>Export to TXT</li>
                            <li className="divider"></li>
                            <li onClick={handlePageSettings}>Page Settings</li>
                            <li onClick={() => window.print()}>Print</li>
                        </ul>
                    </div> : 
                    <div className="hide" />
                }
            </li>
            <li><span onClick={() => this.handleSelection('edit')}>Edit</span>
                {
                    menuSelection === "edit" ? 
                    <div style={{display: "none"}} id="edit-drop" className="dropdown menu-drops">
                        <ul className="dropdown-menu-content">
                            <li onClick={(e) => this.props.onClickUndo(e)}>Undo</li>
                            <li>Redo</li>
                        </ul>
                    </div> : 
                    <div className="hide" />
                }
            </li>
            <li><span onClick={() => this.handleSelection('insert')}>Insert</span>
                {
                    menuSelection === "insert" ? 
                    <div style={{display: "none"}} id="insert-drop" className="dropdown menu-drops">
                        <ul className="dropdown-menu-content">
                            <li onClick={this.triggerFilePicker}>Image
                                <input onChange={this.props.onImageClick} style={{display: "none"}} type="file" id="file-input-menu" accept=".png, .jpg, .jpeg, .gif" />
                            </li>
                            <li onClick={this.handleTableModal}>Table</li>
                            {/*<li onClick={this.handleShapeList}>Shape</li>*/}
                            <li onClick={(e) => this.props.onClickBlock(e,'hr')}>Horizontal Line</li>
                            <li className="divider"></li>
                            <li onClick={(e) => this.props.onClickBlock(e, 'header')}>Header</li>
                            <li>Footer</li>
                            <li>Page Numbers</li>
                            <li>Table of Contents</li>
                        </ul>
                    </div> : 
                    <div className="hide" />
                }
            </li>
            <li><span onClick={() => this.handleSelection('format')}>Format</span>
                {
                    menuSelection === "format" ? 
                    <div style={{display: "none"}} id="format-drop" className="dropdown menu-drops">
                        <ul className="dropdown-menu-content">
                            <li>Heyo</li>
                            <li>Boom</li>
                        </ul>
                    </div> : 
                    <div className="hide" />
                }
            </li>
            <li><span onClick={() => this.handleSelection('tools')}>Tools</span>
                {
                    menuSelection === "tools" ? 
                    <div style={{display: "none"}} id="tools-drop" className="dropdown menu-drops">
                        <ul className="dropdown-menu-content">
                            <li>Heyo</li>
                            <li>Boom</li>
                        </ul>
                    </div> : 
                    <div className="hide" />
                }
            </li>
        </ul>
    </div>
    );
  }
}
