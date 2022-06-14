import { API, graphqlOperation } from "aws-amplify"
import { listFeeds, listArticles, listBookmarks, getArticle } from "../graphql/queries"
import { useState, useEffect } from 'react'
import React from 'react';
//import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
//import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import Bookmark from '@material-ui/icons/Bookmark';
import {Paper,List,ListItem,ListItemText,IconButton, ListItemSecondaryAction } from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Auth} from "aws-amplify";
import { createBookmark as createBookmarkMutation, deleteBookmark as deleteBookmarkMutation } from '../graphql/mutations';
import { render } from "@testing-library/react";
//import Frame from 'react-frame-component'
//import { convertCompilerOptionsFromJson } from "typescript";


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
    (async () => {
        //const user = await onLoad();
        const user = await Auth.currentUserInfo(); 
        console.log('after getting user')
        const userId = user.attributes.sub;
        setUserID(userId)
        console.log("userID ", userId);
    })();
        return () =>{};
      }, [],);

async function onLoad() {
    try {
            console.log("in on load")
            const user = await Auth.currentUserInfo(); 
            console.log('after getting user')
            const userId = user.attributes.sub;
            //setUserID(userId);
            //console.log("userID ", userID);
            return userId
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
        //bookmarks.push(newBookmark.data.createBookmark);
        //console.log(bookmarks)
        //setBookmarks(bookmarks);
        //console.log(bookmarks)
        return(newBookmark.data.createBookmark)
    }
    catch(error){
        console.log('error on fetching feeds', error);
    }
  }

async function deleteBookmark(article) {
    try{
        const bookmarkToDelete = bookmarks.find(bookmark => bookmark.articleID === article.id);
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
        if (bookmarks[i].articleID === article.id){
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
    if(isBookmarked(article) === true){
        console.log('delete bookmark')
        deleteBookmark(article)}
    else{console.log('create bookmark')
        const abm = createBookmark(article,userID)
        //bookmarks.push(abm);
        console.log(bookmarks)
        setBookmarks(bookmarks);
        console.log(bookmarks)
        //setBookmarks(fetchBookmarks());
        console.log('in click',bookmarks)
    }
    //fetchArticles();
}

    useEffect(() => {
        fetchFeeds()
    }, []);

    async function fetchFeeds() {
        try {
            const feedData = await API.graphql(graphqlOperation(listFeeds));
            const feedList = feedData.data.listFeeds.items;
            console.log('fetch feed list', feedList, feedList.length);
            const tempFeed = feedList[feedList.length -1];
            feedList[feedList.length -1] = feedList[1];
            feedList[1] = tempFeed;
            setFeeds(feedList);
            if (activeFeed = []){
            setActiveFeed(feedList[0]);
            }
        } catch (error) {
            console.log('error on fetching feeds', error);
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [activeFeed]);

    async function fetchArticles() {
        try {
            console.log('in fetch articles');
            //const bookmarkData = await API.graphql(graphqlOperation(listBookmarks,{filter:{userID:{eq:userID}}}));
            //const bookmarkList = bookmarkData.data.listBookmarks.items;
            //setBookmarks(bookmarkList);
            //console.log('fetch bookmarks', bookmarks);
            if (activeFeed.id === 'bookmarks') {
                const articleList = [];
                for (var i = 0; i < bookmarks.length; i++) {
                    const articleData = await API.graphql(graphqlOperation(getArticle, { id: bookmarks[i].articleID }));
                    //const articleList = articleData.data.listArticles.items;
                    //console.log(articleData.data.getArticle);
                    articleList.push(articleData.data.getArticle);
                }
                //if (articleList !== []) {
                    setArticles(articleList);
                    setActiveArticle(articleList[0].name);
                    document.getElementById('mainframe').src = articleList[0].url;
                    console.log("set initial iframe " + articleList[0].url);
                //}
            }
            else {
                console.log('activeFeed.id', activeFeed.id)
                const articleData = await API.graphql(graphqlOperation(listArticles, { filter: { feedID: { eq: activeFeed.id } } }));
                const articleList = articleData.data.listArticles.items;
                console.log('fetch article list', articleList);
                setArticles(articleList);
                setActiveArticle(articleList[0].name);
                document.getElementById('mainframe').src = articleList[0].url;
                console.log("set initial iframe " + articleList[0].url);

            }
        } catch (error) {
            console.log('error on fetching articles', error);
        }
    }

    useEffect(() => {
        fetchBookmarks()
    }, [userID][feeds]);
    
    async function fetchBookmarks() {
        console.log(userID);
        try {
            console.log('in fetch bookmarks');
            if (userID === []) { console.log('no user to get bookmarks'); }
            else {
                const bookmarkData = await API.graphql(graphqlOperation(listBookmarks, { filter: { userID: { eq: userID } } }));
                const bookmarkList = bookmarkData.data.listBookmarks.items;
                setBookmarks(bookmarkList);
                console.log(bookmarks);
            }
        }
        catch (error) {
            console.log('error on fetching bookmarks', error);
        }
    }

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