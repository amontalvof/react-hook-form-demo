import { useEffect } from 'react';
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;

type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
        facebook: string;
        twitter: string;
    };
    phoneNumbers: string[];
    phNumbers: {
        number: string;
    }[];
    age: number;
    dob: Date | string;
};

const YouTubeForm = () => {
    const date = new Date('1996-01-01');
    const dateInUTC = new Date(
        date.getTime() + date.getTimezoneOffset() * 60000
    );
    const formattedDate = dateInUTC.toLocaleDateString('en-CA');

    const form = useForm<FormValues>({
        defaultValues: {
            username: 'John Doe',
            email: 'john@mail.com',
            channel: 'john_doe',
            social: {
                facebook: 'john_doe_fb',
                twitter: 'john_doe_tw',
            },
            phoneNumbers: ['1234567890', '9876543210'],
            phNumbers: [{ number: '5555555555' }, { number: '9999999999' }],
            age: 25,
            dob: formattedDate,
        },
        mode: 'all',
    });
    const {
        register,
        control,
        handleSubmit,
        formState,
        watch,
        getValues,
        setValue,
        reset,
    } = form;
    const {
        errors,
        touchedFields,
        dirtyFields,
        isDirty,
        isValid,
        isSubmitting,
        isSubmitted,
        isSubmitSuccessful,
        submitCount,
    } = formState;

    console.log({
        touchedFields,
        dirtyFields,
        isDirty,
        isValid,
        isSubmitting,
        isSubmitted,
        isSubmitSuccessful,
        submitCount,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'phNumbers',
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    const onError = (errors: FieldErrors<FormValues>) => {
        console.log('Form errors:', errors);
    };

    const handleGetClick = () => {
        console.log('Get values:', getValues(['social.twitter', 'age']));
    };

    const handleSetClick = () => {
        setValue('username', '', {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            console.log({ value, name, type });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch]);

    // const watchUsername = watch(['username']);

    renderCount++;

    return (
        <div>
            <h1>YouTube Form ({renderCount / 2})</h1>
            {/* <h2>Watched value: {watchUsername}</h2> */}
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', {
                            required: {
                                value: true,
                                message: 'Username is required!',
                            },
                        })}
                    />
                    <p className="error">{errors.username?.message}</p>
                </div>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Email is required!',
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'Invalid email format!',
                            },
                            validate: {
                                notAdmin: (fieldValue) => {
                                    return (
                                        fieldValue !== 'admin@mail.com' ||
                                        'Email is banned!'
                                    );
                                },
                                notBlacklisted: (fieldValue) => {
                                    return (
                                        !fieldValue.endsWith('baddomain.com') ||
                                        'You are blacklisted!'
                                    );
                                },
                                emailAvailable: async (fieldValue) => {
                                    const response = await fetch(
                                        `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                                    );
                                    const data = await response.json();
                                    return (
                                        data.length === 0 ||
                                        'Email is already taken!'
                                    );
                                },
                            },
                        })}
                    />
                    <p className="error">{errors.email?.message}</p>
                </div>
                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input
                        type="text"
                        id="channel"
                        {...register('channel', {
                            required: {
                                value: true,
                                message: 'Channel is required!',
                            },
                        })}
                    />
                    <p className="error">{errors.channel?.message}</p>
                </div>
                <div className="form-control">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                        type="text"
                        id="twitter"
                        {...register('social.twitter', {
                            disabled: watch('channel') === '',
                            required: {
                                value: true,
                                message: 'Twitter is required!',
                            },
                        })}
                    />
                    <p className="error">{errors.social?.twitter?.message}</p>
                </div>
                <div className="form-control">
                    <label htmlFor="facebook">Facebook</label>
                    <input
                        type="text"
                        id="facebook"
                        {...register('social.facebook', {
                            required: {
                                value: true,
                                message: 'Facebook is required!',
                            },
                        })}
                    />
                    <p className="error">{errors.social?.facebook?.message}</p>
                </div>
                <div className="form-control">
                    <label htmlFor="primary-phone">Primary phone</label>
                    <input
                        type="text"
                        id="primary-phone"
                        {...register('phoneNumbers.0', {
                            required: {
                                value: true,
                                message: 'Primary phone is required!',
                            },
                        })}
                    />
                    <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
                </div>
                <div className="form-control">
                    <label htmlFor="secondary-phone">Secondary phone</label>
                    <input
                        type="text"
                        id="secondary-phone"
                        {...register('phoneNumbers.1', {
                            required: {
                                value: true,
                                message: 'Secondary phone is required!',
                            },
                        })}
                    />
                    <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
                </div>
                <div>
                    <label htmlFor="">List of phone numbers</label>
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.id} className="form-control">
                                <input
                                    type="text"
                                    {...register(`phNumbers.${index}.number`)}
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        style={{ margin: '10px' }}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ number: '' })}
                        >
                            Add phone number
                        </button>
                    </div>
                </div>
                <div className="form-control">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        {...register('age', {
                            valueAsNumber: true,
                            required: {
                                value: true,
                                message: 'Age is required!',
                            },
                        })}
                    />
                    <p className="error">{errors.age?.message}</p>
                </div>
                <div className="form-control">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        {...register('dob', {
                            valueAsDate: true,
                            required: {
                                value: true,
                                message: 'Date of Birth is required!',
                            },
                        })}
                    />
                    <p className="error">{errors.dob?.message}</p>
                </div>
                <br />
                <button style={{ marginRight: '3px' }}>Submit</button>
                <button
                    type="button"
                    onClick={handleGetClick}
                    style={{ marginRight: '3px' }}
                >
                    Get values
                </button>
                <button
                    type="button"
                    onClick={handleSetClick}
                    style={{ marginRight: '3px' }}
                >
                    Set values
                </button>
                <button
                    type="button"
                    onClick={() => reset()}
                    style={{ marginRight: '3px' }}
                >
                    Reset
                </button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default YouTubeForm;
