import { useState, useEffect } from "react";
import { Confirm, Button, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const view = ({ note }) => {
    const [confirm, setConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(deleting)
        {
            deleteNote();
        }
    }, [deleting]);

    const deleteNote = async () =>{
        try {
            const res = fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
            method: 'DELETE'
        });
        router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const open = () => {
        setConfirm(true);
    }

    const close = () => {
        setConfirm(false);
    }

    const handleDelete = () => {
        setDeleting(true);
        close();
    }

  return (
    <div className="note-container">
        {deleting ?
        <Loader active />
        :
        <>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <Button color='red' onClick={open}>Delete</Button>
        </>
        }
        <Confirm 
        open={confirm}
        onCancel={close}
        onConfirm={handleDelete}
        />
    </div>
  )
}

view.getInitialProps = async ({query: { id }}) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const { data } = await res.json();
    return { note: data }
}

export default view