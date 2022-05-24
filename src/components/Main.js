import { API, graphqlOperation } from "aws-amplify"
import { listFeeds, listArticles } from "../graphql/queries"
import { useState, useEffect } from 'react';
import React from 'react';
import {Paper,List,ListItem,ListItemText } from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    active:{
        background:'#001D3D',
    },
    feedCard:{
        background: '#003566',
        borderColor: '#003566',
        borderRadius:9,
        '&:hover':{background:'#001D3D',},
    },
    feedPaper:{
        borderColor: '#FFC300',
        background: '#003566',
    },
});

const Main = () => {
    const [feeds, setFeeds] = useState([]);
    const [activeArticle, setActiveArticle] = useState([]);
    const [activeFeed, setActiveFeed] = useState([]);
    const [articles, setArticles] = useState([]);
    const classes = useStyles();

let iframeSrc;

function feedClick(feed){
        setActiveFeed(feed.name);
        console.log("click feed "+ feed);
}

function articleClick(article){
        setActiveArticle(article.name);
        iframeSrc = article.description;
        document.getElementById('mainframe').src=article.description
        console.log("click article "+ article)
        console.log("click iframe " + iframeSrc)
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
            setActiveFeed(feedList[0].name)
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
            setActiveArticle(articleList[0].name)
            document.getElementById('mainframe').src=articleList[0].description;
            console.log("set initial iframe " + articleList[0].description);
        } catch (error) {
            console.log('error on fetching articles', error);
        }
    };
    
    return (
    <div className = "BigDiv">
        <List className = "feedList">
            { feeds.map(feed => {
                return (
                    <Paper variant = 'outlined' elevation={0}
                    className = {classes.feedPaper}>
                        <ListItem
                         button
                         onClick={() => feedClick(feed)}
                         className = {feed.name === activeFeed ? classes.active:classes.feedCard}                           key = {feed.id}
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
                    <Paper  variant="outlined" elevation={2}
                    className = {classes.feedPaper}>
                        <ListItem
                         button
                         onClick={() => articleClick(article)}
                         className = {article.name === activeArticle ? classes.active:classes.feedCard} 
                         key = {article.id}
                        >
                        <ListItemText
                             className="feedTitle"
                             primary={article.name} />
                        </ListItem>
                    </Paper>
                )
            })}
        </List>
        </div>
        <iframe id = 'mainframe' className = "articleView" src={iframeSrc}></iframe>
    </div>
    )
}

export default Main