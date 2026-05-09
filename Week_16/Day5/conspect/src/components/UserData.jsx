const UserData = (props) => {
    let { handleSubmit } = props
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                />
                <label htmlFor="age">Age</label>
                <input
                    id="age"
                    type="number"
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                />
                <button type="submit">Submit</button>
            </form>
        </>

    )
}

export default UserData;