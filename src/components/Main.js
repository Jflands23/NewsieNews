import { API, graphqlOperation } from "aws-amplify"
import { listFeeds } from "../graphql/queries"
import React, { useState, useEffect } from 'react';
import { IconButton, Paper } from "@material-ui/core";


const Main = () => {
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        fetchFeeds()
    }, []);

    const fetchFeeds = async () => {
        try {
            const feedData = await API.graphql(graphqlOperation(listFeeds));
            const feedList = feedData.data.listFeeds.items;
            console.log('feed list', feedList);
            setFeeds(feedList);
        } catch (error) {
            console.log('error on fetching songs', error);
        }
    };
    
    return (
    <div className = "BigDiv">
        <div className = "feedList">
            { feeds.map(feed => {
                return (
                    <Paper  variant="outlined" elevation={2}>
                        <div className = "feedCard">
                        <IconButton aria-label="COCKA">
                        
                        </IconButton>
                        <div>
                            <div className="feedTitle">{feed.name}</div>
                            <div className="feedDesc">{feed.description}</div>
                        </div>
                        </div>              

                    </Paper>
                )
            })}
        </div>
        <div>
            <aside className = "innertube">
                <h3>Left Column</h3>
            </aside>
        </div>
    </div>
    )
}

export default Main