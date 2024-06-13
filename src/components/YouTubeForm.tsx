import { useForm } from 'react-hook-form';

const YouTubeForm = () => {
    const form = useForm();
    const { register } = form;

    return (
        <div>
            <h1>YouTube Form</h1>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register('username')} />
                <br />
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" {...register('email')} />
                <br />
                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register('channel')} />
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default YouTubeForm;
