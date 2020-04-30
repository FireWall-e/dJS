import Hat from "../components/hat";

export default function SignIn() {
    return (
        <>
            <Hat title={'Homepage'}/>

            <main/>

            <style jsx>{`
            main {
                height: 100vh;
                background-image: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(122,13,114,1) 50%);
            }
          `}</style>
        </>
    );
}
