import React from 'react'


function submitLogin() { //keep editing
    // props.handleSubmit(person);
    // setPerson({name: '', job: ''});
}

function loginButton(props) {

    function submitLogin() {
        props.handleSubmitLogin();     
    }
    return (
        //value = "button"
    <button className="loginButton" type="button" onClick={submitLogin}>
    </button>
    );
}
export default loginButton;