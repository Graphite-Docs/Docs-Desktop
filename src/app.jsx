import React from 'react';
import SlateEditor from './components/editor/Editor';
export default class App extends React.Component {
  closeModal = () => {
    let dimmer = document.getElementsByClassName('dimmer');
    dimmer[0].style.display = "none";
    document.getElementById('link-modal').style.display = "none";
    document.getElementById('link-input').value = "";
    document.getElementById('comment-modal').style.display = "none";
    document.getElementById('comment-input').value = "";
    let commentModals = document.getElementsByClassName('comment-modal');
    for(const modal of commentModals) {
      modal.style.display = "none";
    }
  }
  render() {
    return (
    <div>
        <div onClick={this.closeModal} style={{display: "none"}} className="dimmer" />
        <SlateEditor />
    </div>
    );
  }
}
