import { API, graphqlOperation } from "aws-amplify"
import { listFeeds, listArticles } from "../graphql/queries"
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





const Main = () => {
    const [feeds, setFeeds] = useState([]);
    const [articles, setArticles] = useState([]);
    const classes = useStyles();

let activeFeed;
let activeArticle;

    function feedClick(feed){
        activeFeed = feed;
        console.log("click feed "+ feed)
    }
    
    function articleClick(article){
        activeArticle = article;
        console.log("click article "+ article)
    }

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
            console.log('error on fetching feeds', error);
        }
    };

    useEffect(() => {
        fetchArticles()
    }, []);

    const fetchArticles = async () => {
        try {
            const articleData = await API.graphql(graphqlOperation(listArticles));
            const articleList = articleData.data.listArticles.items;
            console.log('article list', articleList);
            setArticles(articleList);
        } catch (error) {
            console.log('error on fetching articles', error);
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
        <List className = "innertube">
            { articles.map(article => {
                return (
                    <Paper  variant="outlined" elevation={2}>
                        <ListItem
                         button
                         onClick={() => articleClick(article.name)}
                         className = {article.name == activeArticle ? classes.active:null}  
                         key = {article.id}
                        >
                        <ListItemText
                             className="articleTitle"
                             primary={article.name} />
                        </ListItem>
                    </Paper>
                )
            })}
        </List>
        </div>
        <iframe className = "articleView" src="https://app.usepanda.com/#/"></iframe>
    </div>
    )
}

export default Main