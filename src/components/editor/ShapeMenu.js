import React from 'reactn';
import { clickBlock } from './editorHandler';

export default class ShapeMenu extends React.Component {

    render() {
        return(
            <div style={{display: "none"}} id="shape-menu">
                <ul>
                    <li onClick={(e) => this.props.onClickBlock(e, 'shape:circle')}>Circle</li>
                    <li onClick={(e) => this.props.onClickBlock(e, 'shape:square')}>Square</li>
                    <li onClick={(e) => this.props.onClickBlock(e, 'shape:rectangle')}>Rectangle</li>
                    <li onClick={(e) => this.props.onClickBlock(e, 'shape:vertical-line')}>Vertical Line</li>
                    <li onClick={(e) => this.props.onClickBlock(e, 'shape:horizontal-line')}>Horizontal Line</li>
                </ul>
            </div>
        )
    }
}