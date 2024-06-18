import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type FormValues = {
    username: string;
    email: string;
    channel: string;
};

const YouTubeForm = () => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit } = form;

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    renderCount++;
    return (
        <div>
            <h1>YouTube Form ({renderCount / 2})</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            <DevTool control={control} />
        </div>
    );
};

export default YouTubeForm;
