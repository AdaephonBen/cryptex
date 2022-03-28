import React, { useEffect, useState } from "react";
import { Flex, Image } from '@chakra-ui/react';
import "./tarot.css";

export default function LevelTarot() {
    const [mylist, setlist] = useState([]);
    useEffect(()=>{
        for (let i = 1; i<=22; i++)
        {
            document.getElementById('c' + i).onclick = function myfunc(){
                document.getElementById('c' + i).classList.add("shadow");
                setlist(mylist.concat(i));
            }
        }
    })
    useEffect(()=>{
        if(mylist.length === 5)
        {
            // comment here
            //make api call
            alert("Heyyo! You selected 5! You have selected cards: " + mylist.toString());
            window.location.reload();
        }
    }, [mylist])
    return (
        <Flex
        flex= '1'
        flexDirection='column'
        justifyContent='space-around'
        >
            <Flex 
            flexDirection='row'
            justifyContent='space-evenly'
            >
                <Image className='card' id="c1" src='https://deckofcardsapi.com/static/img/AS.png' />            
                <Image className="card" id="c2" src='https://deckofcardsapi.com/static/img/2S.png' />            
                <Image className="card" id="c3" src='https://deckofcardsapi.com/static/img/3S.png' />            
                <Image className='card' id="c4" src='https://deckofcardsapi.com/static/img/4S.png' />            
                <Image className='card' id="c5" src='https://deckofcardsapi.com/static/img/5S.png' />            
                <Image className='card' id="c6" src='https://deckofcardsapi.com/static/img/6S.png' />            
            </Flex>
            <Flex 
            flexDirection='row'
            justifyContent='space-evenly'
            >
                <Image className='card' id="c7" src='https://deckofcardsapi.com/static/img/7D.png' />            
                <Image className='card' id="c8" src='https://deckofcardsapi.com/static/img/8D.png' />            
                <Image className='card' id="c9" src='https://deckofcardsapi.com/static/img/9D.png' />            
                <Image className='card' id="c10" src='https://deckofcardsapi.com/static/img/0D.png' />            
                <Image className='card' id="c11" src='https://deckofcardsapi.com/static/img/JD.png' />            
            </Flex>
            <Flex 
            display='flex'
            flexDirection='row'
            justifyContent='space-evenly'
            >
                <Image className='card' id="c12" src='https://deckofcardsapi.com/static/img/AC.png' />            
                <Image className='card' id="c13" src='https://deckofcardsapi.com/static/img/2C.png' />            
                <Image className='card' id="c14" src='https://deckofcardsapi.com/static/img/3C.png' />            
                <Image className='card' id="c15" src='https://deckofcardsapi.com/static/img/4C.png' />            
                <Image className='card' id="c16" src='https://deckofcardsapi.com/static/img/5C.png' />            
                <Image className='card' id="c17" src='https://deckofcardsapi.com/static/img/6C.png' />            
            </Flex>
            <Flex 
            display='flex'
            flexDirection='row'
            justifyContent='space-evenly'
            >
                <Image className='card' id="c18" src='https://deckofcardsapi.com/static/img/7H.png' />            
                <Image className='card' id="c19" src='https://deckofcardsapi.com/static/img/8H.png' />            
                <Image className='card' id="c20" src='https://deckofcardsapi.com/static/img/9H.png' />            
                <Image className='card' id="c21" src='https://deckofcardsapi.com/static/img/0H.png' />            
                <Image className='card' id="c22" src='https://deckofcardsapi.com/static/img/JH.png' />            
            </Flex>
        </Flex>
    );
}