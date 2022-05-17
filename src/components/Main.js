import { API, graphqlOperation } from "aws-amplify"
import { listFeeds } from "../graphql/queries"
import React, { useState, useEffect } from 'react';
import { IconButton, Paper,List,ListItem,ListItemText } from "@material-ui/core";
import { syncClasses } from "@aws-amplify/datastore/lib-esm/datastore/datastore";
import { CallMissedSharp } from "@material-ui/icons";
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles({
    active:{
        background:'#C8C8C8',
    }
})

let activeFeed;

function feedClick(feed){
    activeFeed = feed;
    console.log("click feed "+ feed)
}

const Main = () => {
    const [feeds, setFeeds] = useState([]);
    const classes = useStyles();

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
        <List className = "feedList">
            { feeds.map(feed => {
                return (
                    <Paper  variant="outlined" elevation={2}>
                        <ListItem
                         button
                         onClick={() => feedClick(feed.name)}
                         className = {feed.name == activeFeed ? classes.active:null}  
                         key = {feed.id}
                        >
                        <ListItemText
                             className="feedTitle"
                             primary={feed.name} />
                        </ListItem>
                    </Paper>
                )
            })}
       
        </List>
        <div>
            <aside className = "innertube">
                <h3>Left Column</h3>
            </aside>
        </div>
    </div>
    )
}

export default Main