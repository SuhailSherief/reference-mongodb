import { Button, Card } from 'semantic-ui-react';
import Link from 'next/link';

import React from 'react'

const index = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map(note => {
          return(
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{ note.title }</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <Link href={`/${note._id}/view`}>
                      <Button primary>View</Button>
                    </Link>
                    <Link href={`/${note._id}/edit`}>
                      <Button primary>Edit</Button>
                    </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

index.getInitialProps = async() => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { data } = await res.json();
  return { notes : data }
}
export default index
