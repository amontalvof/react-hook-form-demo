const YouTubeForm = () => {
    return (
        <div>
            <h1>YouTube Form</h1>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <br />
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" />
                <br />
                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" name="channel" />
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default YouTubeForm;
