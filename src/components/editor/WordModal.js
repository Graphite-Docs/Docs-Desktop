import React from 'reactn'
import Countable from 'countable';

export default class WordModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: 0,
            charactersNoSpaces: 0,
            charactersSpaces: 0, 
            paragraphs: 0, 
            sentences: 0
        }
    }

    componentDidMount() {
        if(document.getElementById('editor-section')) {
            Countable.count(document.getElementById('editor-section'), (counter) => this.setState({ words: counter.words, paragraphs: counter.paragraphs, sentences: counter.sentences, charactersNoSpaces: counter.characters, charactersSpaces: counter.all }), {
                hardReturns: false,
                stripTags: true,
                ignore: []
            })
        }
    }

    handleClose = () => {
        document.getElementById('dimmer').style.display = "none";
        document.getElementById('word-modal').style.display = "none";
    }
    render() {
        const { words, charactersSpaces, charactersNoSpaces, paragraphs, sentences } = this.state;
        const { pages } = this.global;
        return( 
            <div style={{display:"none"}} id="word-modal" className="modal">
                <h2 onClick={this.handleClose}>X</h2>
                <h3>Document Info</h3>
                <ul>
                    <li>Pages: {pages}</li>
                    <li className="divider"></li>
                    <li>Paragraphs: {paragraphs}</li>
                    <li className="divider"></li>
                    <li>Sentences: {sentences}</li>
                    <li className="divider"></li>
                    <li>Words: {words}</li>
                    <li className="divider"></li>
                    <li>Characters (excluding spaces): {charactersNoSpaces}</li>
                    <li className="divider"></li>
                    <li>Characters (including spaces): {charactersSpaces}</li>
                </ul>
            </div>
        )
    }
}