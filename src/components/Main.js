import { API, graphqlOperation } from "aws-amplify"
import { listFeeds, listArticles, listBookmarks, getArticle } from "../graphql/queries"
import { useState, useEffect } from 'react'
import React from 'react';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import Bookmark from '@material-ui/icons/Bookmark';
import {Paper,List,ListItem,ListItemText,IconButton, ListItemSecondaryAction } from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Auth} from "aws-amplify";
import { createBookmark as createBookmarkMutation, deleteBookmark as deleteBookmarkMutation } from '../graphql/mutations';
import Frame from 'react-frame-component'
import { convertCompilerOptionsFromJson } from "typescript";


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
    bookmarkActive:{
        borderColor: '#FFC300',
        color: '#FFC300',
    },
    bookmarkInActive:{
        borderColor: '#FFC300',
        color:'#454544',
    },
});

const Main = () => {
    const [feeds, setFeeds] = useState([]);
    const [activeArticle, setActiveArticle] = useState([]);
    const [activeFeed, setActiveFeed] = useState([]);
    const [articles, setArticles] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [userID, setUserID] = useState([]);
    const classes = useStyles();

useEffect(() => {
        onLoad();
      }, [],);

async function onLoad() {
    try {
            console.log("in on load")
            const user = await Auth.currentUserInfo(); 
            const userId = user.attributes.sub;
            setUserID(userId);
            console.log("userID ", userID);
          }
    catch(e) {
    if (e !== 'No current user') {
          alert(e);
        }
      }
    }

async function createBookmark(articleToBookmark,currentuserID) {
    try{
        const newBookmark = await API.graphql({ query: createBookmarkMutation, variables: { input: 
        {
            userID: currentuserID,
            articleID: articleToBookmark.id,
            //article: articleToBookmark,
        }} });
        bookmarks.push(newBookmark.data.createBookmark);
    }
    catch(error){
        console.log('error on fetching feeds', error);
    }
  }

async function deleteBookmark(article) {
    try{
        const bookmarkToDelete = bookmarks.find(bookmark => bookmark.articleID == article.id);
        const id = bookmarkToDelete.id;
        const newBookmarksArray = bookmarks.filter(bookmark => bookmark.id !== bookmarkToDelete.id);
        console.log(bookmarkToDelete.id)
        await API.graphql({ query: deleteBookmarkMutation, variables: { input: { id:id } }});
        setBookmarks(newBookmarksArray);
        console.log('new bookmarks', bookmarks)
    }
    catch(error){
        console.log('error on fetching feeds', error);
    }
  }

let iframeSrc;

function feedClick(feed){
        setActiveFeed(feed);
        console.log("click feed "+ feed);
}

function isBookmarked(article){
    console.log('is bookmarked?')
    for (var i=0;i<bookmarks.length;i++){
        if (bookmarks[i].articleID == article.id){
            return true
        }
    }
    return false
}

function articleClick(article){
        setActiveArticle(article.name);
        iframeSrc = article.url;
        document.getElementById('mainframe').src=article.url
        console.log("click article "+ article)
        console.log("iframe " + iframeSrc)
}

function bookmarkClick(article){
    console.log("click bookmark ", userID, article)
    if(isBookmarked(article) ==true){
        console.log('delete bookmark')
        deleteBookmark(article)}
    else{console.log('create bookmark')
        createBookmark(article,userID)
    }
    fetchArticles();
}

    useEffect(() => {
        fetchFeeds()
    }, []);

    const fetchFeeds = async () => {
        try {
            const feedData = await API.graphql(graphqlOperation(listFeeds));
            const feedList = feedData.data.listFeeds.items;
            console.log('fetch feed list', feedList);
            const tempFeed = feedList[0];
            feedList [0] = feedList[1];
            feedList[1] = tempFeed
            setFeeds(feedList);
            setActiveFeed(feedList[0])
        } catch (error) {
            console.log('error on fetching feeds', error);
        }
    };

    useEffect(() => {
        fetchArticles()
    }, [activeFeed]);

    const fetchArticles = async () => {
        try {
            console.log('fetch articles')
            const bookmarkData = await API.graphql(graphqlOperation(listBookmarks,{filter:{userID:{eq:userID}}}));
            const bookmarkList = bookmarkData.data.listBookmarks.items;
            setBookmarks(bookmarkList);
            console.log('fetch bookmarks', bookmarks);
            const articleList = [];
            if(activeFeed.id == 'bookmarks'){
                for (var i=0;i<bookmarks.length;i++){
                    const articleData = await API.graphql(graphqlOperation(getArticle,{id:bookmarks[i].articleID}));
                    //const articleList = articleData.data.listArticles.items;
                    //console.log(articleData.data.getArticle);
                    articleList.push(articleData.data.getArticle);
                }
                setArticles(articleList);
                setActiveArticle(articleList[0].name)
                document.getElementById('mainframe').src=articleList[0].url;
                console.log("set initial iframe " + articleList[0].url);
            }
            else{
                const articleData = await API.graphql(graphqlOperation(listArticles,{filter:{feedID:{eq:activeFeed.id}}}));
                const articleList = articleData.data.listArticles.items;
                console.log('fetch article list', articleList);
                setArticles(articleList);
                setActiveArticle(articleList[0].name)
                document.getElementById('mainframe').src=articleList[0].url;
                console.log("set initial iframe " + articleList[0].url);
                
            }
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
                         className = {feed.name === activeFeed.name ? classes.active:classes.feedCard}                           key = {feed.id}
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
                        <ListItemSecondaryAction>
                        <IconButton id = 'ICB'
                        className = {isBookmarked(article) === true ? classes.bookmarkActive:classes.bookmarkInActive} 
                        onClick={() => bookmarkClick(article)}>
                        <Bookmark 
                        />
                        </IconButton> 
                        </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                )
            })}
        </List>
        </div>
        <iframe id = 'mainframe' className = "articleView" src={iframeSrc} sandbox='allow-scripts allow-same-origin'></iframe>
    </div>
    )
}

export default Main