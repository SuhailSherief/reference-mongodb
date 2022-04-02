import Link from "next/link";
import { useState, useEffect } from 'react';
import { Form, Button, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const newNote = () => {
    const [form, setForm] = useState({ title: '', description: ''});
    const [error, setError] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(submitting){
            if(Object.keys(error).length === 0)
            {
                alert('Success');
            }
            else
            {
                setSubmitting(false);
            }
        }
    }, [error])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = validate();
        setError(errors);
        setSubmitting(true);
    }

    const validate = () => {
        let err = {};

        if(!form.title){
            err.title = "Title is required";
        }
        if(!form.description){
            err.description = "Description is required";
        }
        return err;
    }

  return (
    <div className="form-container">
        <h1>Create Note</h1>
        <div>
            {
                submitting ? <Loader active inline="centered" /> :
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                    fluid
                    error={error.title ? { content: "Please enter a title", pointing: 'below' }: null}
                    label="Title"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    />
                    <Form.TextArea
                    fluid
                    error={error.description ? { content: "Please enter a description", pointing: 'below'} : null}
                    label="Description"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    />
                    <Button type="submit">Create</Button>
                </Form>
            }
        </div>
    </div>
  )
}

export default newNote