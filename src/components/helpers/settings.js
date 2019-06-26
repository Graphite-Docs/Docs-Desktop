import { getGlobal, setGlobal } from 'reactn';

export async function savePageSettings() {
    const thisDoc = {
        marginTop: getGlobal().marginTop,
        marginRight: getGlobal().marginRight,
        marginBottom: getGlobal().marginBottom,
        marginLeft: getGlobal().marginLeft,
        orientation: getGlobal().orientation
    }
    setGlobal({ document: thisDoc });
    document.getElementById('page-settings').style.display = "none";
    document.getElementById('dimmer').style.display = "none";
    let editor = document.getElementById('editor-section');
    editor.style.paddingRight = `${(thisDoc.marginRight * 60 * 1.65)}px`;
    editor.style.paddingLeft = `${(thisDoc.marginLeft * 60 * 1.65)}px`;
    editor.style.paddingTop = `${(thisDoc.marginTop * 60 * 1.65)}px`;
    editor.style.paddingBottom = `${(thisDoc.marginBottom * 60 * 1.65)}px`;
    let pages = document.getElementsByClassName('page-view');
    for(const page of pages) {
        if(thisDoc.orientation === 'landscape') {
            page.style.width = "1089px";
            page.style.height = "841.5px";
        } else {
            page.style.width = "841.5px";
            page.style.height = "1089px";
        }
    }
}

export async function handlePageSettings() {
    document.getElementById('file-drop').style.display = "none";
    document.getElementById('page-settings').style.display = "block";
    document.getElementById('dimmer').style.display = "block";
  }