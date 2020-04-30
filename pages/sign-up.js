import Hat from "../components/hat";
import Styles from "../components/styles";

export default function SignUp() {
    return (
        <>
            <Hat title={'Sign Up'}/>

            <main>
                <form action="">
                    <h1>sign up</h1>
                    <div className={'content'}>
                        <input type="text" className={'field'} placeholder={'username'}/>
                        <input type="text" className={'field'} placeholder={'email'}/>
                        <input type="text" className={'field'} placeholder={'password'}/>
                    </div>
                    <div className={'actions'}>
                        <button type={'button'} className={'submit-action'}>submit</button>
                    </div>
                </form>
            </main>

            <Styles/>

            <style jsx>{`
            h1 {
                margin: 30px 0;
                font-size: 25px;
                padding-left: 20px;
                border-left: 5px solid darkorange;
            }
            
            main {
                height: 100vh;
                background: url("image/sign-up.jpg") no-repeat center;
                background-size: cover;
                
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            form {
                height: 80%;
                width: 35%;
                background-color: rgba(255, 255, 255, .15);  
                backdrop-filter: blur(15px);
                
                display: flex;
                flex-direction: column;
            }
            
            .content {      
                flex: 1;
                
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 30px 0;
            }
         
            
            .field:not(:last-child) {
                margin-bottom: 30px;
            }
            
            .actions {
                display: flex;
                padding: 30px 0;
                
                justify-content: flex-end;
            }
            
            .submit-action {
                padding-right: 20px;
                border-right: 5px solid lightgreen;
            }
            
            .submit-action:hover {
                font-style: italic;
            }
          `}</style>
        </>
    );
}
