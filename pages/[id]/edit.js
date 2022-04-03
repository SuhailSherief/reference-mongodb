import { useState, useEffect } from 'react';
import { Form, Button, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const edit = ({ note }) => {
    const [form, setForm] = useState({ title: note.title, description: note.description});
    const [error, setError] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(submitting){
            if(Object.keys(error).length === 0)
            {
                updateNote();
            }
            else
            {
                setSubmitting(false);
            }
        }
    }, [error])

    const updateNote = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

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
        <h1>Update Note</h1>
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
                    value={form.title}
                    onChange={handleChange}
                    />
                    <Form.TextArea
                    fluid
                    error={error.description ? { content: "Please enter a description", pointing: 'below'} : null}
                    label="Description"
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    />
                    <Button type="submit">Update</Button>
                </Form>
            }
        </div>
    </div>
  )
}

edit.getInitialProps = async ({query: {id}}) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const { data } = await res.json();
    return { note: data }
}

export default edit;