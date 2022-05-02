import {Amplify} from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { listFeeds } from './graphql/queries';
import { createFeed as createFeedMutation, deleteFeed as deleteFeedMutation } from './graphql/mutations';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const initialFormState = { name: '', description: '' }


function App({signOut, user}) {
    const [feeds, setFeeds] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchFeeds();
  }, []);

  async function fetchFeeds() {
    const apiData = await API.graphql({ query: listFeeds });
    setFeeds(apiData.data.listFeeds.items);
  }

  async function createFeed() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createFeedMutation, variables: { input: formData } });
    setFeeds([ ...feeds, formData ]);
    setFormData(initialFormState);
  }

  async function deleteFeed({ id }) {
    const newFeedsArray = feeds.filter(feed => feed.id !== id);
    setFeeds(newFeedsArray);
    await API.graphql({ query: deleteFeedMutation, variables: { input: { id } }});
  }
   return (
    <div className="App">
      <h1>My Feeds App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Feed name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Feed description"
        value={formData.description}
      />
      <button onClick={createFeed}>Create Feed</button>
      <div style={{marginBottom: 30}}>
        {
          feeds.map(feed => (
            <div key={feed.id || feed.name}>
              <h2>{feed.name}</h2>
              <p>{feed.description}</p>
              <button onClick={() => deleteFeed(feed)}>Delete feed</button>
            </div>
          ))
        }
      </div>
      <button onClick={signOut}>Sign out</button>>
    </div>
  );
}

export default withAuthenticator(App);


