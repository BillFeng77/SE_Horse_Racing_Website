function loginpage(){
    return (
        <>
        <form action="/api/login" method="post">
            <label for="first">First name:</label>
            <input type="text" id="first" name="first" />
            <label for="last">Last name:</label>
            <input type="text" id="last" name="last" />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default loginpage