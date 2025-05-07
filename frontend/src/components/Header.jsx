
function Header({onLoginClick}) {
    return (
        <header 
        style={{
            display:"flex",
            justifyContent:"flex-end",
            padding:"3rem",
            }}>
            <button onClick={onLoginClick} style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                cursor: "pointer"
            }}>로그인</button>
        </header>
    )
}

export default Header;