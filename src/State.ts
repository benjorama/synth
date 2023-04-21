// A state management system used to update parent components like Keyboard
// Perhaps use Redux if needed

interface State {
    keysClicked: string[]
}

let globalState: State = {
    keysClicked: []
}

export function getState() {
    return globalState
}

export function setState(state: State) {
    globalState = state
}