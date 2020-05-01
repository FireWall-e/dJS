import {env} from "../environment";
import React from "react";
import Hat from "../components/hat";
import Styles from "../components/styles";

export default class Iam extends React.PureComponent {
    state = {
        IhaveAccess: false,
        username: ''
    };

    componentDidMount() {
        this.checkAccess = async () => {
            const username = window.location.search.slice(2);
            const token = localStorage.getItem('token');
            console.log('token i s', token);

            if (!token || !username) return window.location.replace('/');

            const res = await fetch(`${env.usersApi}?username=${username}&token=${token}&action=profile-get-access`);
            const I = await res.json();

            if (!I.haveAccess) return window.location.replace('/');

            this.setState({username, IhaveAccess: I.haveAccess});
        };

        this.asyncCall = this.checkAccess();
    }

    // prevent mem leak
    componentWillUnmount() {
        if (this.asyncCall) this.asyncCall.cancel();
    }

    proceed() {
        const url = document.querySelector('#search-input').value;

        console.log('url is ', url);
        if (url) {
            document.querySelector('#create-panel').classList.remove('show');
            this.audio = new Audio(url);

            // this.audio.play();
            const essentials = document.querySelector('.create .essentials');
            const halfEl = document.querySelector('.create.half');
            halfEl.classList.add('v-stretch');
            const countdownEl = document.createElement('div');
            countdownEl.className = 'countdown';
            countdownEl.textContent = '3';
            countdownEl.style = `
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
                font-size: 60px;
                position: absolute;
                top: 0;
                left: 0;
            `;

            essentials.insertAdjacentElement('afterbegin', countdownEl);

            const countdownIn = setInterval(() => {
                let counter = parseInt(countdownEl.textContent);

                if (!--counter) {
                    countdownEl.remove();
                    document.querySelector('#pads').classList.add('show');

                    setTimeout(() => this.audio.play(), 500);
                    return clearInterval(countdownIn);
                }

                countdownEl.textContent = counter.toString();
            }, 1000);
        }
    }

    render() {
        if (this.state.IhaveAccess) {
            return (
                <>
                    <Hat title={'Me'} />

                    <main>
                        <nav className={'navbar'}>
                            <div className={''}>
                                <a href="/" className={'navbar-brand text-light'}>dJ</a>
                                <span>{this.state.username}</span>
                            </div>
                            <ul className={'navbar-nav flex-row'}>
                                <li className={'nav-item'}>
                                    <a href="#" className={'btn btn-outline-light'}>Log Out</a>
                                </li>
                            </ul>
                        </nav>
                        <div className={'content'}>
                            <div className={'content__item create half'}>
                                <h2 className={'half__item content-title'}>create</h2>
                                <div className={'half__item essentials'}>
                                    <div id={'create-panel'} className={'panel show'}>
                                        <input id={'search-input'} type="text" placeholder={'paste audio link here'} />
                                        <button type={'button'} className={'proceed-button'} onClick={() => this.proceed()}>proceed</button>
                                    </div>
                                    <div id={'pads'} className={'pads'}>
                                        <div className={'timer'}></div>
                                        <div className={'pads-actions'}>
                                            <button type={'button'}>restart</button>
                                            <button type={'button'}>quit</button>
                                        </div>
                                        <div className={'pads-list'}>
                                            <div id={'pad-0'} className={'pad'}>0</div>
                                            <div id={'pad-1'} className={'pad'}>1</div>
                                            <div id={'pad-2'} className={'pad'}>2</div>
                                            <div id={'pad-3'} className={'pad'}>3</div>
                                            <div id={'pad-4'} className={'pad'}>4</div>
                                            <div id={'pad-5'} className={'pad'}>5</div>
                                            <div id={'pad-6'} className={'pad'}>6</div>
                                            <div id={'pad-7'} className={'pad'}>7</div>
                                            <div id={'pad-8'} className={'pad'}>8</div>
                                            <div id={'pad-9'} className={'pad'}>9</div>
                                        </div>
                                        <div className={'pads-actions'}>
                                            <button type={'button'}>save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'content__item listen half'}>
                                <h2 className={'half__item content-title'}>listen</h2>
                                <div className={'half__item essentials'}>
                                    wdawd
                                </div>
                            </div>
                        </div>
                    </main>

                    <Styles/>

                    <style jsx>{`
                        main {
                            background-image: url("image/iam.jpg");
                            padding: 20px;
                        }
                        
                        .navbar-brand {
                            transform: scale(1.5);
                        }
                        
                        .content {
                            height: 100%;
                            margin-top: 15px;
                            
                            display: flex;
                            flex-wrap: wrap;
                        }
                        
                        .create .content-title {
                            border-left: 5px solid cyan;
                        }
                        
                        .listen .content-title {
                            border-left: 5px solid gold;
                        }
                        
                        .content-title {
                            padding: 20px;
                            margin-bottom: 3px;
                        }
                        
                        .content__item {
                            flex: 1;
                            min-width: 200px;
                            margin: 15px;
                        }
                        
                        .half {
                            display: flex;
                            flex-direction: column;
                            
                            min-height: 0;
                            transition: all 0.5s;
                        }
                        
                        .half__item {
                            background-color: rgba(255, 255, 255, .15);  
                            backdrop-filter: blur(5px);
                        }
                        
                        .content__item.create {
                            // min-height: 70%;
                        }
                        
                        .essentials {
                            flex: 1;
                            position: relative;
                            
                            padding: 25px;
                        }
                        
                        .half.v-stretch {
                            min-height: calc(100% - 25px);
                        }
                        
                        .panel {
                            display: flex;
                            
                            opacity: 0;
                            transition: opacity .3s;
                        }
                        
                        .proceed-button {
                            border-bottom: 1.5px solid lime;
                        }
                        
                        .pads {
                            position: absolute;
                            top: 0;
                            left: 0;
                            display: flex;
                            flex-direction: column;
                            
                            opacity: 0;
                            transition: opacity 0.5s;
                            pointer-events: none;
                        }
                        
                        .timer {
                            min-width: 100%;
                        }
                                                
                        .pads-actions {
                            min-width: 100%;
                        }
                        
                        .pads-list {
                            display: flex;
                            flex-direction: column;
                            flex-wrap: wrap;
                        }
                        
                        .pad {
                            min-width: 33%;
                        }
                    `}</style>
                </>
            );
        } else {
            return null;
        }
    }
};

// Iam.getInitialProps = async ctx => {
//
// }
